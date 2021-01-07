import get from 'lodash.get';
import { iif, of } from 'rxjs';
import { ofType } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
  tap,
  filter,
  ignoreElements,
} from 'rxjs/operators';

import requester from '../misc/requester';
import likeManager from '../misc/likeManager';
import { download, share, copyText } from '../misc/util';

const colorql = `query($cate: ColorCategory!) {
  color(category: $cate) {
    id
    like
    color
    userid
    username
    createdate
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
      mergeMap(() =>
        requester({
          query: colorql,
          variables: { cate: 'PUBLIC' },
        }).pipe(
          map((action2) => {
            const colors = get(action2, 'response.data.color', null);
            return colors
              ? {
                  type: 'color/get/success',
                  payload: colors,
                }
              : { type: 'color/get/fail' };
          }),
          catchError(() =>
            of({ type: 'color/get/fail' }, { type: 'modal/color/get/fail' })
          )
        )
      )
    ),

  (action$) =>
    action$.pipe(
      ofType('color/toggleLike'),
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
      mergeMap((action0) => {
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
          }),
          ignoreElements()
        );
      })
    ),

  (action$) =>
    action$.pipe(
      ofType('color/download'),
      tap(({ payload }) => {
        download(`colorpk_${payload.id}.png`, payload.color);
      }),
      ignoreElements()
    ),

  (action$) =>
    action$.pipe(
      ofType('color/share'),
      tap(({ payload }) => {
        share(payload);
      }),
      ignoreElements()
    ),

  (action$) =>
    action$.pipe(
      ofType('color/addNew'),
      mergeMap(({ payload }) =>
        requester({
          query: createql,
          variables: {
            val: payload,
          },
        }).pipe(
          mergeMap((action2) => {
            const isGood =
              !get(action2, 'response.errors') &&
              get(action2, 'response.data.createColor.status', 1) === 0;
            const id = get(action2, 'response.data.createColor.data', null);
            const { color } = payload;
            const successPayload = id && {
              id: id.toString(),
              color,
              name: '',
              like: 0,
            };
            return iif(
              () => isGood,
              of(
                {
                  type: 'color/addNew/success',
                  payload: successPayload,
                },
                {
                  type: 'modal/color/addNew/success',
                }
              ),
              of(
                {
                  type: 'color/addNew/fail',
                  payload: get(action2, 'response.errors[0].message'),
                },
                {
                  type: 'modal/color/addNew/fail',
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
      ignoreElements()
    ),
];
