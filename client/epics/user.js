import get from 'lodash.get';
import { ofType } from 'redux-observable';
import { iif, of, concat } from 'rxjs';
import Cookies from 'js-cookie';
import { map, mergeMap, catchError, tap, ignoreElements } from 'rxjs/operators';
import requester from '../services/requester';

import likeManager from '../services/likeManager';

const query = `query {
  auth {
    ... on User {
      id
      name
      img
      isadmin
      likes
    }
    ... on AuthFailResponse {
      url
      error
    }
  }
}`;

const logoffQl = `mutation {
  logoff {
    url
  }
}`;

export default [
  action$ =>
    action$.pipe(
      ofType('user/auth'),
      mergeMap(() =>
        requester({
          query,
        }).pipe(
          mergeMap(action2 => {
            return iif(
              () => get(action2, 'response.data.auth.id', null),
              of(
                {
                  type: 'user/auth/success',
                  payload: get(action2, 'response.data.auth'),
                },
                {
                  type: 'color/set/likes',
                  payload: get(action2, 'response.data.auth.likes', []),
                }
              ),
              of(
                {
                  type: 'user/auth/fail',
                  payload: get(action2, 'response.data.auth.url'),
                },
                {
                  type: 'color/set/likes',
                  payload: likeManager.initLikes || [],
                }
              )
            );
          }),
          catchError(error => {
            return of({
              type: 'user/auth/fail',
              payload: null,
            }).pipe(
              tap(() =>
                // eslint-disable-next-line no-console
                console.error('error', get(error, 'response.errors[0].message'))
              )
            );
          })
        )
      )
    ),

  action$ =>
    action$.pipe(
      ofType('user/logoff'),
      mergeMap(() => {
        return concat(
          of({
            type: 'color/set/likes',
            payload: likeManager.initLikes || [],
          }),
          requester({
            query: logoffQl,
          }).pipe(
            map(action2 => {
              return {
                type: 'user/auth/fail',
                payload: get(action2, 'response.data.logoff.url', null),
              };
            })
          )
        );
      })
    ),

  action$ =>
    action$.pipe(
      ofType('user/onOAuth'),
      tap(action1 => window.location.replace(action1.payload)),
      ignoreElements()
    ),

  action$ =>
    action$.pipe(
      ofType('user/setLanguage'),
      tap(action1 => {
        Cookies.set('lang', action1.payload, { expires: 180 });
      }),
      ignoreElements()
    ),
];
