import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(135deg, #06a1e3, #203570);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;

  ul {
    display: flex;
    flex-direction: column;
    margin: 15px 10px;
  }
`;

export const Post = styled.li`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: background 0.2s;

  &:hover {
    background: rgba(245, 245, 245, 0.95);
  }

  & + li {
    margin-top: 16px;
  }

  button {
    display: flex;
    flex-direction: column;
    background: transparent;
    border: 0;
    max-width: 600px;
    margin: 0 auto;

    h2 {
      font-size: 32px;
      color: #333;
      margin-bottom: 5px;
    }

    > div {
      display: flex;
      flex-direction: column;
      width: 100%;

      img {
        background: #aaa;
        border-radius: 4px;
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      > p {
        display: -webkit-box;
        margin-top: 5px;

        font-size: 16px;
        color: #999;
        font-weight: bold;

        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        line-height: 20px;
        max-height: 80px;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

export const Suggestions = styled.div`
  width: calc(250px + 40%);
  min-width: 300px;
  max-width: 600px;
  margin: 10px 0;
  align-items: center;
  justify-content: center;

  h1 {
    margin-top: 20px;
    color: #ffb400;
    font-size: 32px;
  }

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
