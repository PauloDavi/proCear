import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #203570, #78bed6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 58px;
    height: 600px;
    width: 50%;

    h1 {
      color: #06a1e3;
      text-shadow: 3px 3px #ddd;
      margin-top: 30px;
      font-weight: bold;
      font-size: 4vw;
    }

    div {
      height: 80%;
    }
  }
`;
