import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const userState = {
  isAuthenticated: false,
  hasFbAuth: false,
  status: 'idle',
  data: {},
  fbData: {},
};

export default {
  user: createReducer(userState, {
    [ActionTypes.USER_LOGIN_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
      });
    },
    [ActionTypes.USER_LOGIN_SUCCESS](state, { payload }) {
      return immutable(state, {
        isAuthenticated: { $set: true },
        status: { $set: 'idle' },
        data: { $set: payload.user },
        'feathers-jwt': { $set: payload.accessToken },
      });
    },
    [ActionTypes.USER_LOGIN_FAILURE](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
    [ActionTypes.USER_LOGOUT_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
        data: { $set: {} },
      });
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
    [ActionTypes.USER_FB_LOGIN_REQUEST](state) {
      return immutable(state, {
        hasFbAuth: { $set: 'running' },
      });
    },
    [ActionTypes.USER_FB_LOGIN_SUCCESS](state, { payload }) {
      return immutable(state, {
        hasFbAuth: { $set: true },
        status: { $set: 'idle' },
        fbData: { $set: payload.fbData },
        data: { $set: payload.user },
      });
    },
    [ActionTypes.USER_FB_LOGIN_FAILURE](state) {
      return immutable(state, {
        hasFbAuth: { $set: false },
        status: { $set: 'idle' },
      });
    },
    [ActionTypes.USER_FB_LOGOUT_REQUEST](state) {
      return immutable(state, {
        hasFbAuth: { $set: 'running' },
      });
    },
    [ActionTypes.USER_FB_LOGOUT_SUCCESS](state) {
      return immutable(state, {
        hasFbAuth: { $set: false },
        status: { $set: 'idle' },
        fbData: { $set: {} },
      });
    },
    [ActionTypes.USER_FB_LOGOUT_FAILURE](state) {
      return immutable(state, {
        hasFbAuth: { $set: false },
        status: { $set: 'idle' },
        fbData: { $set: {} },
      });
    },
  }),
};
