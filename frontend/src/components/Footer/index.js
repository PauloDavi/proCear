/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { unsignedHeader, signedHeader, adminHeader } from '~/assets/links';

import { Container, Content, Title, Links, Company } from './styles';

const FooterPage = () => {
  const { admin } = useSelector((state) =>
    state.user.profile ? state.user.profile : false
  );
  const { signed } = useSelector((state) => state.auth);

  return (
    <Container>
      <Content>
        <Title>
          <h2>ProCear</h2>
          <p>
            O ProCear é um aplicativo desenvolvido para que toda a comunidade
            acadêmica tenha um contato direto com a coordenação do curso de
            engenharia elétrica tornando o curso melhor para todos
          </p>
        </Title>
        <Links>
          <h3>Links</h3>
          <ul>
            {signed
              ? admin
                ? adminHeader.map((link) => (
                    <li key={link.name}>
                      <Link to={link.route}>{link.name}</Link>
                    </li>
                  ))
                : signedHeader.map((link) => (
                    <li key={link.name}>
                      <Link to={link.route}>{link.name}</Link>
                    </li>
                  ))
              : unsignedHeader.map((link) => (
                  <li key={link.name}>
                    <Link to={link.route}>{link.name}</Link>
                  </li>
                ))}
          </ul>
        </Links>
        <Links>
          <h3>Contatos</h3>
          <ul>
            <li>
              <a href="http://cear.ufpb.br">CEAR</a>
            </li>
          </ul>
        </Links>
      </Content>
      <Company>
        <span>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="http://localhost:3000/"> procear.com </a>
        </span>
      </Company>
    </Container>
  );
};

export default FooterPage;
