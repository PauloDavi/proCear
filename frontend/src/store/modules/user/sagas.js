import { toast } from 'react-toastify';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const response = yield call(api.put, 'users', payload.data);

    toast.success('Perfil atualizado com sucesso');

    console.tron.log(response.data);

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    console.tron.log(error.message);
    const message = error.response.data.error;
    if (message === 'Validation fails') {
      toast.error('Dados inválidos');
    } else if (message === 'Phone number already exists.') {
      toast.error('Esse numero já esta cadastrado');
    } else if (message === 'Password does not match.') {
      toast.error('Senha invalida, esqueceu sua senha ?');
    } else {
      toast.error('Erro ao atualizar o cadastro');
    }

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
