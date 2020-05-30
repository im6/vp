import get from 'lodash.get';
import Cookies from 'js-cookie';

import { ajax } from 'rxjs/ajax';
import { iif, of, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, mergeMap, catchError, tap, ignoreElements } from 'rxjs/operators';

import requester from '../misc/requester';
import likeManager from '../misc/likeManager';
import { langSelectionKey } from '../../constant';

const query = `query {
  user {
    name
    img
    isadmin
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
          catchError((error) => {
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

  (action$) =>
    action$.pipe(
      ofType('user/logoff'),
      mergeMap(() => {
        return concat(
          of({
            type: 'color/set/likes',
            payload: likeManager.initLikes || [],
          }),
          ajax.getJSON('/auth/logout').pipe(
            map(({ url }) => {
              return {
                type: 'user/logoff/success',
                payload: url,
              };
            })
          )
        );
      })
    ),

  (action$) =>
    action$.pipe(
      ofType('user/setLanguage'),
      tap((action1) => {
        Cookies.set(langSelectionKey, action1.payload, { expires: 180 });
      }),
      ignoreElements()
    ),
];
