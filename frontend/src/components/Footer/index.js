import React from 'react';
import { Link } from 'react-router-dom';
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

import { Container, Content, Title, Links, Company } from './styles';

const FooterPage = () => {
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projetos">Projetos</Link>
            </li>
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
