import { of, switchMap, delay, concat } from 'rxjs';
import { ofType } from 'redux-observable';

const actionDelay = 50; // give some space between each redux action
const modalDisplayTimeout = 2500;
const transitionTime = 350; // same as Modal style transition time value

export default [
  (action$) =>
    action$.pipe(
      ofType('modal'),
      switchMap((v) =>
        concat(
          of({
            type: 'modal/reset',
          }),
          of({
            type: 'modal/set',
            payload: v.payload,
          }).pipe(delay(actionDelay)),
          of({
            type: 'modal/show',
          }).pipe(delay(actionDelay)),
          of({
            type: 'modal/hide',
          }).pipe(delay(modalDisplayTimeout)),
          of({
            type: 'modal/reset',
          }).pipe(delay(transitionTime + 1))
        )
      )
    ),
];
