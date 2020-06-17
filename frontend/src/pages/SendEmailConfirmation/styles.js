import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #003f91, #78bed6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
      color: #000;
      margin-top: 30px;
      font-weight: bold;
      padding: 0 20px;
      font-size: calc(16px + 0.5vw);

      strong {
        color: #06a1e3;
        font-weight: bold;
      }

      button {
        border: none;
        background: none;
        font-weight: bold;
        font-size: calc(16px + 0.5vw);
        color: #06a1e3;
        transition: 1s color;

        &:hover {
          color: ${lighten(0.15, '#06a1e3')};
        }
      }
    }

    div {
      height: 70%;
    }
  }
`;
