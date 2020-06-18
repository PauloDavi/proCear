/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';

import { store } from '~/store';

export default function RoterWrapper({
  component: Component,
  isPrivate,
  Admin,
  title,
  ...rest
}) {
  useEffect(() => {
    document.title = `ProCear | ${title}`;
  }, [title]);

  const { signed } = store.getState().auth;
  const { admin } = store.getState().user.profile
    ? store.getState().user.profile
    : false;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (!admin && Admin) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
}

RoterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  Admin: PropTypes.bool,
  title: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RoterWrapper.defaultProps = {
  title: 'ProCear',
  isPrivate: false,
  Admin: false,
};
