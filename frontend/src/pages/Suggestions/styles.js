import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(135deg, #203570, #91f9e5);
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: column;
  height: 80%;

  h1 {
    margin-top: 20px;
    color: #ffb400;
    font-size: 32px;
  }
`;

export const Content = styled.div`
  width: calc(250px + 40%);
  min-width: 300px;
  max-width: 600px;
  margin: 10px 0;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin: 15px 30px;

    textarea,
    input {
      background: rgba(0, 0, 0, 0.5);
      border: 0;
      border-radius: 8px;
      height: 44px;
      box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
      padding: 0 15px;
      color: #fff;

      & + input {
        margin: 10px 0 0;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      height: 150px;
      padding: 10px 15px;
      margin-top: 10px;

      &::placeholder {
        font-size: 14px;
      }
    }

    span {
      color: #f34344;
      align-self: flex-start;
      margin: 3px 0 10px;
      font-weight: bold;
    }

    button {
      margin-top: 30px;
      height: 44px;
      background: #7fb800;
      font-weight: bold;
      color: #fff;
      border: 0;
      box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7fb800')};
      }
    }
  }
`;
