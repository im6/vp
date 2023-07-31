import get from 'lodash.get';
import { ofType } from 'redux-observable';
import { of, map, switchMap, filter, catchError } from 'rxjs';
import requester from '../misc/requester';

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

const adjudicateql = `mutation($val: LikeColorInputType!) {
  adjudicateColor(input: $val) {
    status
  }
}`;

export default [
  (action$) =>
    action$.pipe(
      ofType('admin/getList'),
      switchMap(() =>
        requester({
          query: colorql,
          variables: { cate: 'ANONYMOUS' },
        }).pipe(
          map((res) => ({
            type: 'admin/getList/success',
            payload: get(res, 'response.data.color', null),
          })),
          catchError(() =>
            of(
              {
                type: 'admin/getList/fail',
              },
              {
                type: 'modal',
                payload: ['danger', 'Admin data error'],
              }
            )
          )
        )
      )
    ),

  (action$) =>
    action$.pipe(
      ofType('admin/decideColor'),
      switchMap((action1) =>
        requester({
          query: adjudicateql,
          variables: {
            val: action1.payload,
          },
        }).pipe(
          filter(
            (res) => get(res, 'response.data.adjudicateColor.status', 1) === 0
          ),
          map(() => ({
            type: 'modal',
            payload: ['success', 'Adjudicate successfully'],
          })),
          catchError(() =>
            of({
              type: 'modal',
              payload: ['danger', 'Adjudicate failed'],
            })
          )
        )
      )
    ),
];
