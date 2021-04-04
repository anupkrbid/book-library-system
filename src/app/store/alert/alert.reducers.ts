import * as AlertActions from './alert.actions';

export interface AlertState {
  message: string;
  show: boolean;
  type: string;
}

const initialState: AlertState = {
  message: '',
  show: false,
  type:''
};

export function alertReducer (state = initialState, actions:AlertActions.AlertActions) {
  switch (actions.type) {
    case AlertActions.ALERT_SHOW:
      return {
        ...state,
        show: true,
        type: actions.payload.type,
        message: actions.payload.message
      };
    case AlertActions.ALERT_HIDE:
      return {
        ...state,
        show: false,
        type: '',
        message: ''
      };
    default:
      return state;
  }
}