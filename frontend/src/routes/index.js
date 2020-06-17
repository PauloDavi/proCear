import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Confirmation from '~/pages/Confirmation';
import CreatePost from '~/pages/CreatePost';
import CreateProject from '~/pages/CreateProject';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';
import Project from '~/pages/Project';
import SendEmailConfirmation from '~/pages/SendEmailConfirmation';
import SingIn from '~/pages/SingIn';
import SingUp from '~/pages/SingUp';
import Suggestions from '~/pages/Suggestions';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={SingIn} />
      <Route path="/cadastro" component={SingUp} />
      <Route path="/emailconfirmation/:token" component={Confirmation} />
      <Route path="/enviodeemail/:email" component={SendEmailConfirmation} />
      <Route path="/sugestoes" isPrivate component={Suggestions} />
      <Route path="/perfil" isPrivate component={Profile} />
      <Route path="/crearprojetos" isPrivate Admin component={CreateProject} />
      <Route path="/crearposts" isPrivate Admin component={CreatePost} />
      <Route path="/projeto" isPrivate component={Project} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={() => <Redirect to="/404" />} />
    </Switch>
  );
}
