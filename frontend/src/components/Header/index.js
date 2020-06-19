/* eslint-disable no-nested-ternary */
import React from 'react';
import Headroom from 'react-headroom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { unsignedHeader, signedHeader, adminHeader } from '~/assets/links';
import logo from '~/assets/LogoCEAR100.png';

import { Container, Content, Profile } from './styles';

function Header() {
  const { profile } = useSelector((state) => state.user);
  const { signed } = useSelector((state) => state.auth);

  return (
    <Headroom
      style={{
        boxShadow: '1px 1px 1px rgba(0,0,0,0.25)',
        WebkitTransition: 'all .5s ease-in-out',
        MozTransition: 'all .5s ease-in-out',
        OTransition: 'all .5s ease-in-out',
        transition: 'all .5s ease-in-out',
      }}
    >
      <Container>
        <Content>
          <nav>
            <img src={logo} alt="ProCear" />
            {signed
              ? profile.admin
                ? adminHeader.map((link) => (
                    <Link key={link.name} to={link.route}>
                      {link.name}
                    </Link>
                  ))
                : signedHeader.map((link) => (
                    <Link key={link.name} to={link.route}>
                      {link.name}
                    </Link>
                  ))
              : unsignedHeader.map((link) => (
                  <Link key={link.name} to={link.route}>
                    {link.name}
                  </Link>
                ))}
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
