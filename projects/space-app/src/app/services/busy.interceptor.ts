import { HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject, map, debounce, timer, of, finalize } from 'rxjs';

const activeRequestCount = new BehaviorSubject<number>(0);

export const isBusy = activeRequestCount.pipe(
  map((count) => count > 0),

  debounce((busy) => (busy ? timer(100) : of(0))),
);

export const busyInterceptor: HttpInterceptorFn = (req, next) => {
  activeRequestCount.next(activeRequestCount.getValue() + 1);

  return next(req).pipe(
    finalize(() => activeRequestCount.next(activeRequestCount.getValue() - 1)),
  );
};
