import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import About from '~/pages/About';
import Confirmation from '~/pages/Confirmation';
import CreatePost from '~/pages/CreatePost';
import CreateProject from '~/pages/CreateProject';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';
import Projects from '~/pages/Projects';
import SendEmailConfirmation from '~/pages/SendEmailConfirmation';
import SingIn from '~/pages/SingIn';
import SingUp from '~/pages/SingUp';
import Suggestions from '~/pages/Suggestions';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} title="Home" />
      <Route path="/login" noSigned component={SingIn} title="Login" />
      <Route path="/cadastro" noSigned component={SingUp} title="Cadastro" />
      <Route path="/sobre" component={About} title="Sobre nós" />
      <Route
        path="/emailconfirmation/:token"
        component={Confirmation}
        title="Confirmação de email"
      />
      <Route
        path="/enviodeemail/:email"
        component={SendEmailConfirmation}
        title="Envio de email"
      />
      <Route
        path="/sugestoes"
        isPrivate
        component={Suggestions}
        title="Sugestoes"
      />
      <Route path="/perfil" isPrivate component={Profile} title="Perfil" />
      <Route
        path="/crearprojetos"
        isPrivate
        Admin
        component={CreateProject}
        title="Cadastro de projetos"
      />
      <Route
        path="/crearposts"
        isPrivate
        Admin
        component={CreatePost}
        title="Cadastro de posts"
      />
      <Route path="/projetos" isPrivate component={Projects} title="Projeto" />
      <Route path="/404" component={NotFound} title="Não encontrado" />
      <Route path="*" component={() => <Redirect to="/404" />} />
    </Switch>
  );
}
