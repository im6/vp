import get from 'lodash.get';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap, filter, catchError } from 'rxjs/operators';
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
      mergeMap(() =>
        requester({
          query: colorql,
          variables: { cate: 'ANONYMOUS' },
        }).pipe(
          map((ajaxRes) => ({
            type: 'admin/getList/success',
            payload: get(ajaxRes, 'response.data.color', null),
          })),
          catchError(() =>
            of(
              {
                type: 'admin/getList/fail',
              },
              {
                type: 'modal/admin/getList/fail',
              }
            )
          )
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
            type: 'modal/admin/decideColor/success',
            payload: action1.payload.id,
          })),
          catchError(() =>
            of({
              type: 'modal/admin/decideColor/fail',
            })
          )
        )
      )
    ),
];
