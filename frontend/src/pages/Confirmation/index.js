import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import lottie from 'lottie-web';
import Proptypes from 'prop-types';

import animationData from '~/assets/autentication-error.json';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

function Confirmation({ match }) {
  const animationContainer = useRef(null);
  const [loading, setLoading] = useState(false);
  const { token } = match.params;

  useEffect(() => {
    async function confirmeToken() {
      try {
        await api.put('/confirmation', { token });
        await toast.info('Seu email esta autenticado');

        setLoading(false);

        history.push('/login');
      } catch (error) {
        const message = error.message.error;

        if (message === 'Validation fails') {
          toast.error(
            'link invalido por favor verifique seu email e procure pelo email mais atual'
          );
        } else if (message === 'Token invalid') {
          toast.error(
            'Esse link não é valido, caso ele tenha espirado por favor solicite outro'
          );
        } else {
          toast.error('Erro na autenticação');
        }
        setLoading(false);
      }
    }
    confirmeToken();
  }, [token]);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });
  }, []);

  return (
    <Container>
      {!loading && (
        <div>
          <div ref={animationContainer} />
          <h1>
            Ocorreu um erro na autenticação da conta, por favor entre em contato
            com o <a href="http://cear.ufpb.br/">CEAR</a>
          </h1>
        </div>
      )}
    </Container>
  );
}

Confirmation.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      token: Proptypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Confirmation;
