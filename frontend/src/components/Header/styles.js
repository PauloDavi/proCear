import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: #fefefe;
  padding: 5px 30px 5px 20px;
  height: auto;

  @media screen and (max-width: 600px) {
    padding: 0 15px 0 5px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    /* height: auto; */
    /* align-items: flex-start; */
  }

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
      display: block;
      text-transform: uppercase;
      font-weight: bold;
      color: #06a1e3;
      transition: opacity 0.2s;

      & + a {
        margin-left: 20px;
      }

      &:hover {
        opacity: 0.6;
      }
    }

    @media screen and (max-width: 600px) {
      align-items: center;
      justify-content: center;

      img {
        display: none;
      }

      a {
        font-size: 12px;

        & + a {
          margin-left: 10px;
        }
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-left: 1px solid #eee;
    min-height: 32px;
    margin-left: 5px;

    @media screen and (max-width: 600px) {
      min-height: 0;
      margin-left: 0;
      padding-left: 10px;
      margin: 10px 0 10px 5px;

      a {
        font-size: 12px;
      }
    }

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

  div {
    text-align: right;

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
    margin-left: 5px;
    height: 32px;
    width: 32px;
    border: 2px solid #7fb800;
    border-radius: 50%;
  }

  @media screen and (max-width: 800px) and (min-width: 600px) {
    flex-direction: column-reverse;
    margin: 0;

    div {
      text-align: center;

      strong {
        display: none;
      }

      a {
        font-size: 10px;
      }
    }

    img {
      height: 32px;
      width: 32px;
      margin: 5px auto 5px auto;
    }
  }

  @media screen and (max-width: 600px) {
    div {
      display: none;
    }

    img {
      height: 24px;
      width: 24px;
      margin: 0 auto;
    }
  }
`;
