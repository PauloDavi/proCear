import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: #fefefe;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      height: 46px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #06a1e3;
    }
  }

  aside {
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #eee;
    min-height: 32px;

    a {
      font-size: 16px;
      font-weight: bold;
      color: ${lighten(0.2, '#003F91')};

      &:hover {
        color: #003f91;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border: 2px solid #7fb800;
    border-radius: 50%;
  }
`;
