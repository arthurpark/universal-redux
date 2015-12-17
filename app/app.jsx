import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { routes } from './routes'


render(
  <Router routes={routes} history={createBrowserHistory()} />,
  document.getElementById('app')
);
