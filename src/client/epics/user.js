import get from 'lodash.get';

import { ajax } from 'rxjs/ajax';
import { iif, of, map, switchMap, catchError, merge, throwError } from 'rxjs';
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

const userAuthEpic$ = (action$) =>
  action$.pipe(
    ofType('user/auth'),
    switchMap(() =>
      requester({
        query,
      }).pipe(
        switchMap((action2) => {
          if (get(action2, 'response.errors')) {
            return throwError();
          }
          return iif(
            () => get(action2, 'response.data.user', false),
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
                type: 'modal',
                payload: [
                  'success',
                  `Welcome back, ${get(action2, 'response.data.user.name')}`,
                ],
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
              type: 'modal',
              payload: ['danger', 'Log in failed'],
            }
          )
        )
      )
    )
  );

const userLogOffEpic$ = (action$) =>
  action$.pipe(
    ofType('user/logoff'),
    switchMap(() =>
      merge(
        of({
          type: 'color/set/likes',
          payload: likeManager.initLikes || [],
        }),
        of({
          type: 'modal',
          payload: ['info', 'Logout successfully.'],
        }),
        ajax.getJSON('/auth/logout').pipe(
          map((res) => ({
            type: 'user/logoff/success',
            payload: res,
          }))
        )
      )
    )
  );

export default [userAuthEpic$, userLogOffEpic$];
