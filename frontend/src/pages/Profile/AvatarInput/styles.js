import styled from 'styled-components';

export const Content = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;

  p {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    margin: 5px auto;
    color: #7fb800;
  }
`;

export const Container = styled.div`
  height: 128px;
  width: 128px;
  background: #eee;
  border-radius: 50%;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid rgba(127, 184, 0, 0.5);
  }
`;
