import styled from 'styled-components';

export const Container = styled.div`
  min-height: 700px;
  background: linear-gradient(135deg, #06a1e3, #203570);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Content = styled.div`
  width: 40%;
  min-width: 400px;
  max-width: 450px;
  margin: 15px 0;
  text-align: center;
  background: #fefefe;
  border-radius: 8px;

  h1 {
    color: #ffb400;
    font-size: 32px;
  }

  p {
    margin: 5px;
    font-size: 16px;
    color: #333;
    text-align: left;
  }
`;
