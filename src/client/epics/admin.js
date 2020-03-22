import get from 'lodash.get';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap, filter, catchError, tap } from 'rxjs/operators';
import requester from '../misc/requester';

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

const adjudicateql = `mutation($val: LikeColorInputType!) {
  adjudicateColor(input: $val) {
    status
  }
}`;

export default [
  (action$) =>
    action$.pipe(
      ofType('admin/getList'),
      mergeMap(() =>
        requester({
          query: colorql,
          variables: { cate: 'ANONYMOUS' },
        }).pipe(
          map((ajaxRes) => ({
            type: 'admin/getList/success',
            payload: get(ajaxRes, 'response.data.color', null),
          })),
          catchError(() => {
            return of({
              type: 'admin/getList/fail',
            }).pipe(
              tap(() => {
                // eslint-disable-next-line no-console
                console.error('admin error');
                // window.location.replace('/');
              })
            );
          })
        )
      )
    ),

  (action$) =>
    action$.pipe(
      ofType('admin/decideColor'),
      mergeMap((action1) =>
        requester({
          query: adjudicateql,
          variables: {
            val: action1.payload,
          },
        }).pipe(
          filter(
            (ajaxRes) =>
              get(ajaxRes, 'response.data.adjudicateColor.status', 1) === 0
          ),
          map(() => ({
            type: 'admin/decideColor/success',
            payload: action1.payload.id,
          })),
          catchError(() => {
            // eslint-disable-next-line no-console
            console.error('admin change error');
          })
        )
      )
    ),
];
