import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #06a1e3, #203570);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin: 30px;

    input {
      background: rgba(0, 0, 0, 0.5);
      border: 0;
      border-radius: 8px;
      height: 44px;
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

    button {
      margin: 20px 0 0;
      height: 44px;
      background: #69b249;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 8px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#69B249')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      transition: opacity 0.1s;

      &:hover {
        opacity: 1;
      }
    }
  }
`;