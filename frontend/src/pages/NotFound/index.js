import React, { useEffect, useRef } from 'react';

import lottie from 'lottie-web';

import animationData from '~/assets/404-animation.json';

import { Container } from './styles';

function NotFound() {
  const animationContainer = useRef(null);

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
      <div>
        <h1>Pagina não encontrada</h1>
        <div ref={animationContainer} />
      </div>
    </Container>
  );
}

export default NotFound;
