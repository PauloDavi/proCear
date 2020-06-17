import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import lottie from 'lottie-web';
import Proptypes from 'prop-types';

import animationData from '~/assets/send-email.json';
import api from '~/services/api';

import { Container } from './styles';

function EmailConfirmation({ match }) {
  const animationContainer = useRef(null);

  const { email } = match.params;

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData,
    });
  }, []);

  async function handleClick() {
    try {
      await api.post('/confirmation', { email });
      toast.info('Email reenviado!!! Verifique sua caixa de entrada');
    } catch (error) {
      const message = error.message.error;
      if (message === 'Email not exist') {
        toast.error('Esse email não esta cadastrado');
      } else if (message === 'User already authenticated') {
        toast.error('Esse usuário ja está autenticado');
      } else {
        toast.error('Error ao reenviar o email');
      }
    }
  }

  return (
    <Container>
      <div>
        <div ref={animationContainer} />
        <h1>
          Enviamos um email de confirmação para <strong>{email}</strong>, caso
          não tenha recebido click{' '}
          <button type="button" onClick={handleClick}>
            AQUI
          </button>
        </h1>
      </div>
    </Container>
  );
}

EmailConfirmation.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      email: Proptypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EmailConfirmation;
