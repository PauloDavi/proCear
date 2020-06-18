import React from 'react';
import Headroom from 'react-headroom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/LogoCEAR100.png';

import { Container, Content, Profile } from './styles';

function Header() {
  const profile = useSelector((state) => state.user.profile);
  const { signed } = useSelector((state) => state.auth);

  return (
    <Headroom
      style={{
        boxShadow: '1px 1px 1px rgba(0,0,0,0.25)',
        webkitTransition: 'all .5s ease-in-out',
        mozTransition: 'all .5s ease-in-out',
        oTransition: 'all .5s ease-in-out',
        transition: 'all .5s ease-in-out',
      }}
    >
      <Container>
        <Content>
          <nav>
            <img src={logo} alt="ProCear" />
            <Link to="/">HOME</Link>
          </nav>

          <aside>
            {signed ? (
              <Profile>
                <div>
                  <strong>{profile.name}</strong>
                  <Link to="/perfil">Meu Perfil</Link>
                </div>
                <img src={profile.image_url} alt={profile.name} />
              </Profile>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </aside>
        </Content>
      </Container>
    </Headroom>
  );
}

export default Header;
