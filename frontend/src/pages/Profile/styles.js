import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(135deg, #203570, #91f9e5);
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 40%;
  min-width: 400px;
  max-width: 600px;
  margin-top: 50px;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin: 30px;

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

    span {
      color: #f34344;
      align-self: flex-start;
      margin: 3px 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.4);
      margin: 30px 0 30px;
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

  > button {
    width: calc(100% - 60px);
    margin: 0 30px 30px 30px;
    height: 44px;
    background: #f65c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.06, '#f65c75')};
    }
  }
`;
