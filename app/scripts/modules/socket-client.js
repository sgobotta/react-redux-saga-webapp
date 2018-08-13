import feathers from '@feathersjs/client';
import auth from '@feathersjs/client/authentication';
import reduxifyServices from 'feathers-redux';

import { call } from 'redux-saga/effects';

const io = require('socket.io-client');

const authOptions = { jwtStrategy: 'jwt', storage: window.localStorage };

const url = process.env.REACT_APP_API_URL;
const socket = io(url, {
  transports: ['websocket'],
  forceNew: true,
});

const feathersClient = feathers();
feathersClient
  .configure(feathers.socketio(socket))
  .configure(auth(authOptions));

const services = reduxifyServices(
  feathersClient,
  ['authentication', 'users', 'messages', 'votes', 'orders'],
);

export { services };
export function* request({ service, action, query, dispatch }) {
  if (service === 'authentication') {
    query.strategy = 'local';
  }
  const response = services[service][action](query);
  if (action === 'onRemoved') {
    dispatch(services[service][action](query));
    return response;
  }
  const { promise } = response.payload;
  const result = yield call(() => Promise.resolve(promise));
  return result;
}
