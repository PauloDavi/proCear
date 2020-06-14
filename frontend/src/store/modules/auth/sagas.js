import { toast } from 'react-toastify';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signUpSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    if (response.data.error) {
      toast.error(response.data.error);
      return;
    }

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/');
  } catch (error) {
    const signInError = error.response.data.error;

    if (signInError === 'Validation fails') {
      toast.error('Campos incorretos');
    } else if (signInError === 'User not exist') {
      toast.error('Usuário não existe, por favor se cadastre');
    } else if (signInError === 'User not authenticated') {
      toast.error(
        'Seu email não esta autenticado nos lhe enviamos uma mensagem por favor verifique sua caixa de mensagens'
      );
    } else {
      toast.error('Falha na autenticação, usuário ou senha inválidos');
    }
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, phone, password, confirmPassword } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      phone,
      password,
      confirmPassword,
    });

    yield put(signUpSuccess());
  } catch (error) {
    const signInError = error.response.data.error;

    if (signInError === 'Validation fails') {
      toast.error('Campos incorretos');
    } else if (signInError === 'User already exists.') {
      toast.error('Esse email já esta cadastrado');
    } else if (signInError === 'Phone number already exists.') {
      toast.error('Esse numero já foi cadastrado');
    } else {
      toast.error('Falha no cadastro, por favor tente novamente');
    }
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
