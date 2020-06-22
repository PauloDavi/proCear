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

export const Project = styled.li`
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
        border-radius: 8px;
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

export const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  p {
    font-size: 14px;
    color: #333;
  }
`;
