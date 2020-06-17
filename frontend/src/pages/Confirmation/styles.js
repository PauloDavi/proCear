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
    text-align: center;

    div {
      width: 20vw;
      height: 20vw;
      min-width: 200px;
      min-height: 200px;
    }

    h1 {
      margin-top: 20px;
      padding: 10px 15px;
      color: #06a1e3;
      font-size: 32px;

      a {
        color: #3178b8;

        &:hover {
          color: ${lighten(0.15, '#3178b8')};
        }
      }
    }
  }
`;
