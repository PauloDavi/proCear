/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';

export default function RoterWrapper({
  component: Component,
  isPrivate,
  Admin,
  ...rest
}) {
  const signed = false;
  const adminAccess = false;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (!adminAccess && Admin) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
}

RoterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  Admin: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RoterWrapper.defaultProps = {
  isPrivate: false,
  Admin: false,
};
