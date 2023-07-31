import get from 'lodash.get';
import {
  of,
  iif,
  map,
  tap,
  filter,
  switchMap,
  catchError,
  throttleTime,
} from 'rxjs';
import { ofType } from 'redux-observable';

import requester from '../misc/requester';
import likeManager from '../misc/likeManager';
import { download, copyText } from '../misc/util';

const colorql = `query($cate: ColorCategory!) {
  color(category: $cate) {
    id
    star
    color
    userId
    username
    createdDate
  }
}`;

const likeql = `mutation($val: LikeColorInputType!) {
    likeColor(input: $val) {
      status
    }
  }
`;

const createql = `mutation($val: CreateColorInputType!) {
    createColor(input: $val) {
      data
      status
    }
  }
`;

export default [
  (action$) =>
    action$.pipe(
      ofType('color/get'),
      switchMap(() =>
        requester({
          query: colorql,
          variables: { cate: 'PUBLIC' },
        }).pipe(
          map((res) => {
            const colors = get(res, 'response.data.color', null);
            return colors
              ? {
                  type: 'color/get/success',
                  payload: colors,
                }
              : { type: 'color/get/fail' };
          }),
          catchError(() =>
            of(
              { type: 'color/get/fail' },
              {
                type: 'modal',
                payload: ['danger', 'Get color data error.'],
              }
            )
          )
        )
      )
    ),

  (action$) =>
    action$.pipe(
      ofType('color/toggleLike'),
      throttleTime(2000),
      tap((action0) => {
        const { willLike, id, isAuth } = action0.payload;
        if (!isAuth) {
          if (willLike) {
            likeManager.addLike(id);
          } else {
            likeManager.removeLike(id);
          }
        }
      }),
      switchMap((action0) => {
        const { willLike, id } = action0.payload;
        return requester({
          query: likeql,
          variables: {
            val: {
              id,
              willLike,
            },
          },
        }).pipe(
          filter(
            (ajaxRes) => get(ajaxRes, 'response.data.likeColor.status', 1) !== 0
          ),
          map((ajaxRes) => get(ajaxRes, 'response.errors[0].message', true)),
          catchError((err) => of(get(err, 'response.errors[0].message', true))),
          tap((err) => {
            console.error('toggle like error: ', err); // eslint-disable-line no-console
          })
        );
      })
    ),

  (action$) =>
    action$.pipe(
      ofType('color/download'),
      throttleTime(5000),
      tap(({ payload }) => {
        download(`colorpk_${payload.id}.png`, payload.color);
      }),
      map(() => ({
        type: 'modal',
        payload: ['link', 'Downloading ...'],
      }))
    ),

  (action$) =>
    action$.pipe(
      ofType('color/addNew'),
      throttleTime(5000),
      switchMap(({ payload }) =>
        requester({
          query: createql,
          variables: {
            val: payload,
          },
        }).pipe(
          switchMap((res) => {
            const isGood =
              !get(res, 'response.errors') &&
              get(res, 'response.data.createColor.status', 1) === 0;
            const id = get(res, 'response.data.createColor.data', null);
            const { color } = payload;
            const successPayload = id && {
              id: id.toString(),
              color,
              name: '',
              star: 0,
            };
            return iif(
              () => isGood,
              of(
                {
                  type: 'color/addNew/success',
                  payload: successPayload,
                },
                {
                  type: 'modal',
                  payload: ['success', 'Create color successfully, thanks.'],
                }
              ),
              of(
                {
                  type: 'color/addNew/fail',
                  payload: get(res, 'response.errors[0].message'),
                },
                {
                  type: 'modal',
                  payload: ['danger', 'Create color failed.'],
                }
              )
            );
          })
        )
      )
    ),
  (action$) =>
    action$.pipe(
      ofType('color/copy'),
      tap(({ payload }) => {
        copyText(payload.substring(1));
      }),
      map(() => ({
        type: 'modal',
        payload: ['success', 'Copy to clipboard successfully'],
      }))
    ),
];
