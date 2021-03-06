import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.3);
`;

export const Company = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a78c2;

  span {
    font-size: 14px;
    color: #aaa;

    a {
      color: #fff;
      transition: color 0.2s;

      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
`;

export const Content = styled.div`
  background: #2196f3;
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;

export const Title = styled.div`
  margin: 0 10% 0 30px;
  max-width: 600px;

  h2 {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
  }

  p {
    font-size: 16px;
    color: #fff;
  }

  @media screen and (max-width: 600px) {
    margin: 0 20px 0 10px;

    h2 {
      font-size: 28px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const Links = styled.div`
  padding: 0 30px;
  min-width: 150px;

  & + div {
    border-left: 1px solid #eee;
  }

  h3 {
    font-size: 26px;
    font-weight: bold;
    color: #fff;
  }

  ul {
    li {
      margin-top: 5px;

      a {
        font-size: 16px;
        color: #fff;
        transition: color 0.2s;

        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    padding: 0 0 0 10px;
    min-width: 100px;

    & + div {
      margin-right: 10px;
    }

    h3 {
      font-size: 20px;
    }

    ul {
      li {
        a {
          font-size: 12px;
        }
      }
    }
  }
`;
