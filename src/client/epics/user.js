import get from 'lodash.get';

import { ajax } from 'rxjs/ajax';
import { iif, of, map, mergeMap, catchError, concat, throwError } from 'rxjs';
import { ofType } from 'redux-observable';

import requester from '../misc/requester';
import likeManager from '../misc/likeManager';

const query = `query {
  user {
    name
    img
    isAdmin
    likes
    owns
  }
}`;

export default [
  (action$) =>
    action$.pipe(
      ofType('user/auth'),
      mergeMap(() =>
        requester({
          query,
        }).pipe(
          mergeMap((action2) => {
            if (get(action2, 'response.errors', null)) {
              return throwError();
            }
            return iif(
              () => get(action2, 'response.data.user', null),
              of(
                {
                  type: 'user/auth/success',
                  payload: get(action2, 'response.data.user'),
                },
                {
                  type: 'color/set/likes',
                  payload: get(action2, 'response.data.user.likes', []),
                },
                {
                  type: 'color/set/owns',
                  payload: get(action2, 'response.data.user.owns', []),
                },
                {
                  type: 'modal/user/greet',
                  payload: get(action2, 'response.data.user.name'),
                }
              ),
              of(
                {
                  type: 'user/auth/fail',
                },
                {
                  type: 'color/set/likes',
                  payload: likeManager.initLikes || [],
                },
                {
                  type: 'color/set/owns',
                  payload: [],
                }
              )
            );
          }),
          catchError(() =>
            of(
              {
                type: 'user/auth/fail',
              },
              {
                type: 'user/logoff',
              },
              {
                type: 'modal/user/auth/fail',
              }
            )
          )
        )
      )
    ),

  (action$) =>
    action$.pipe(
      ofType('user/logoff'),
      mergeMap(() =>
        concat(
          of({
            type: 'color/set/likes',
            payload: likeManager.initLikes || [],
          }),
          ajax.getJSON('/auth/logout').pipe(
            map((res) => ({
              type: 'user/logoff/success',
              payload: res,
            }))
          )
        )
      )
    ),
];
