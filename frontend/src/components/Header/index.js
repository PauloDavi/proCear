import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/LogoCEAR100.png';

import { Container, Content, Profile } from './styles';

function Header() {
  const profile = useSelector((state) => state.user.profile);
  const { signed } = useSelector((state) => state.auth);

  return (
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
  );
}

export default Header;
