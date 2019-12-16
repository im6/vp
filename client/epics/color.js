import get from 'lodash.get';
import { ofType } from 'redux-observable';
import { iif, of, concat, empty, interval } from 'rxjs';
import {
  map,
  mergeMap,
  concatMap,
  catchError,
  mapTo,
  tap,
  delay,
  filter,
  ignoreElements,
} from 'rxjs/operators';

import likeManager from '../services/likeManager';
import { requester1 } from '../services/requester';
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

export const getInitColorsEpic = action$ =>
  action$.pipe(
    ofType('color/get'),
    mergeMap(() => {
      return requester1({
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
            tap(() => console.error(get(error, 'response.errors[0].message')))
          );
        })
      );
    })
  );

export const toggleLikeEpic = action$ =>
  action$.pipe(
    ofType('color/toggleLike'),
    tap(action0 => {
      const { willLike, id, isAuth } = action0.payload;
      if (!isAuth) {
        if (willLike) {
          likeManager.addLike(parseInt(id, 10));
        } else {
          likeManager.removeLike(parseInt(id, 10));
        }
      }
    }),
    mergeMap(action0 => {
      const { willLike, id } = action0.payload;
      return requester1({
        query: likeql,
        variables: {
          val: {
            id,
            willLike,
          },
        },
      }).pipe(
        filter(ajaxRes => {
          return get(ajaxRes, 'response.data.likeColor.status', 1) !== 0;
        }),
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
  );

export const colorDownloadEpic = action$ =>
  action$.pipe(
    ofType('color/download'),
    tap(({ payload }) => {
      download(`colorpk_${payload.id}.png`, payload.color);
    }),
    ignoreElements()
  );

export const colorShareEpic = action$ =>
  action$.pipe(
    ofType('color/share'),
    tap(({ payload }) => {
      share(payload);
    }),
    ignoreElements()
  );

export const getUserColorsEpic = action$ =>
  action$.pipe(
    ofType('color/getUserColor'),
    mergeMap(({ payload }) => {
      const cate = payload === 'myPortfolio' ? 'PROFILE' : 'LIKES';
      return requester1({
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
          } else {
            return {
              type: 'color/getUserColor/fail',
              payload: {
                name: payload,
              },
            };
          }
        }),
        catchError(error => {
          return of({ type: 'color/getUserColor/fail' }).pipe(
            tap(() => console.error(get(error, 'response.errors[0].message'))),
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
  );
