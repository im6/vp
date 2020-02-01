import get from 'lodash.get';
import { ofType } from 'redux-observable';
import { iif, of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  tap,
  filter,
  ignoreElements,
} from 'rxjs/operators';

import likeManager from '../misc/likeManager';
import requester from '../misc/requester';
import { download, share } from '../misc/util.js';

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
  action$ =>
    action$.pipe(
      ofType('color/get'),
      mergeMap(() => {
        return requester({
          query: colorql,
          variables: { cate: 'PUBLIC' },
        }).pipe(
          map(action2 => {
            const colors = get(action2, 'response.data.color', null);
            return colors
              ? {
                  type: 'color/get/success',
                  payload: colors,
                }
              : { type: 'color/get/fail' };
          }),
          catchError(error => {
            return of({ type: 'color/get/fail' }).pipe(
              // eslint-disable-next-line no-console
              tap(() => console.error(get(error, 'response.errors[0].message')))
            );
          })
        );
      })
    ),

  action$ =>
    action$.pipe(
      ofType('color/toggleLike'),
      tap(action0 => {
        const { willLike, id, isAuth } = action0.payload;
        if (!isAuth) {
          if (willLike) {
            likeManager.addLike(id);
          } else {
            likeManager.removeLike(id);
          }
        }
      }),
      mergeMap(action0 => {
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
            ajaxRes => get(ajaxRes, 'response.data.likeColor.status', 1) !== 0
          ),
          map(ajaxRes => get(ajaxRes, 'response.errors[0].message', true)),
          catchError(err => {
            return of(get(err, 'response.errors[0].message', true));
          }),
          tap(err => {
            console.error('toggle like error: ', err); // eslint-disable-line no-console
          }),
          ignoreElements()
        );
      })
    ),

  action$ =>
    action$.pipe(
      ofType('color/download'),
      tap(({ payload }) => {
        download(`colorpk_${payload.id}.png`, payload.color);
      }),
      ignoreElements()
    ),

  action$ =>
    action$.pipe(
      ofType('color/share'),
      tap(({ payload }) => {
        share(payload);
      }),
      ignoreElements()
    ),

  action$ =>
    action$.pipe(
      ofType('color/getUserColor'),
      mergeMap(({ payload }) => {
        const cate = payload === 'myPortfolio' ? 'PROFILE' : 'LIKES';
        return requester({
          query: colorql,
          variables: { cate },
        }).pipe(
          map(action2 => {
            const data = get(action2, 'response.data.color', null);
            if (data) {
              return {
                type: 'color/getUserColor/success',
                payload: {
                  name: payload === 'myPortfolio' ? 'myPortfolio' : 'myLiked',
                  data,
                },
              };
            }
            return {
              type: 'color/getUserColor/fail',
              payload: {
                name: payload,
              },
            };
          }),
          catchError(error => {
            return of({ type: 'color/getUserColor/fail' }).pipe(
              tap(() =>
                // eslint-disable-next-line no-console
                console.error(get(error, 'response.errors[0].message'))
              ),
              map(() => {
                return {
                  type: 'color/getUserColor/fail',
                  payload: {
                    name: payload,
                  },
                };
              })
            );
          })
        );
      })
    ),

  action$ =>
    action$.pipe(
      ofType('color/addNew'),
      mergeMap(({ payload }) => {
        return requester({
          query: createql,
          variables: {
            val: payload,
          },
        }).pipe(
          mergeMap(action2 => {
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
              of({
                type: 'color/addNew/success',
                payload: successPayload,
              }),
              of({
                type: 'color/addNew/fail',
                payload: get(action2, 'response.errors[0].message'),
              })
            );
          }),
          tap(({ type }) => {
            if (type === 'color/addNew/fail') {
              // eslint-disable-next-line no-alert
              alert('Error on creating color');
            } else {
              // eslint-disable-next-line no-alert
              alert('Thank you for new colors');
            }
          })
        );
      })
    ),
];
