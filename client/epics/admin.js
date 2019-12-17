import get from 'lodash.get';
import { ofType } from 'redux-observable';
import { iif, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import requester from '../services/requester';

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

const adminAnonymousColorEpic = action$ =>
  action$.pipe(
    ofType('admin/getList'),
    mergeMap(() =>
      requester({
        query: colorql,
        variables: { cate: 'ANONYMOUS' },
      }).pipe(
        map(ajaxRes => ({
          type: 'admin/getList/success',
          payload: get(ajaxRes, 'response.data.color', null),
        })),
        catchError(() => {
          window.location.replace('/');
        })
      )
    )
  );

const adminAdjudicateEpic = action$ =>
  action$.pipe(
    ofType('admin/decideColor'),
    mergeMap(action1 =>
      requester({
        query: adjudicateql,
        variables: {
          val: action1.payload,
        },
      }).pipe(
        mergeMap(action2 =>
          iif(
            () => get(action2, 'response.data.adjudicateColor.status', 1) !== 0,
            of({
              type: 'admin/decideColor/fail',
              payload: get(action2, 'response.data.adjudicateColor.data', ''),
            }),
            of({
              type: 'admin/decideColor/success',
              payload: action1.payload.id,
            })
          )
        ),
        catchError(ajaxRes =>
          of({
            type: 'admin/decideColor/fail',
            payload: get(ajaxRes, 'response.errors[0].message', ''),
          })
        )
      )
    )
  );

export default [adminAnonymousColorEpic, adminAdjudicateEpic];
