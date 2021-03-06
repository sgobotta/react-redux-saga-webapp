// @flow
/**
 * @module Actions/UI
 * @desc UI Actions
 */
import { ActionTypes } from 'constants/index';

// export { go, goBack, push, replace };


export function toggleDrawer(options: Object): Object {
  return {
    type: ActionTypes.TOGGLE_DRAWER,
    payload: options || {},
  };
}

export function goToOrderTab(tabName: number): Object {
  return {
    type: ActionTypes.SWAP_ORDERS_TABS,
    payload: tabName,
  };
}

export function openModal(options: Object): Object {
  return {
    type: ActionTypes.OPEN_MODAL,
    payload: options,
  };
}

export function closeModal(): Object {
  return {
    type: ActionTypes.CLOSE_MODAL,
  };
}
