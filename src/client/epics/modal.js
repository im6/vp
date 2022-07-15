import { of, throttleTime, switchMap, filter, delay, concat } from 'rxjs';

const modalDisplayTimeout = 2500;
const transitionTime = 350; // same as Modal style value

export default [
  (action$) =>
    action$.pipe(
      filter((v) => /^modal/.test(v.type)),
      filter((v) => !/^modal\/cycle/.test(v.type)),
      throttleTime(2000),
      switchMap(() =>
        concat(
          of({
            type: 'modal/cycle/show',
          }).pipe(delay(1)),
          of({
            type: 'modal/cycle/hide',
          }).pipe(delay(modalDisplayTimeout)),
          of({
            type: 'modal/cycle/reset',
          }).pipe(delay(transitionTime + 1))
        )
      )
    ),
];
