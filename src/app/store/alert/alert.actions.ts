import { Action } from '@ngrx/store';

export const ALERT_SHOW = 'ALERT_SHOW';
export const ALERT_HIDE = 'ALERT_HIDE';

export class AlertShow implements Action {
  readonly type = ALERT_SHOW;
  constructor(public payload: { message: string, type: string }) {}
}

export class AlertHide implements Action {
  readonly type = ALERT_HIDE;
}

export type AlertActions = AlertShow | AlertHide;