/**
 * Root
 * @flow
 */
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { routes } from './routes';

const Root = () => (
  <Router routes={routes} history={browserHistory} />
);

export default Root;
