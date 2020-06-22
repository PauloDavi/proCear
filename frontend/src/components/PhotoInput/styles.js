import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  background: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 30px;
  outline: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  p {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed #7fb800;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #7fb800;
    font-size: 14px;
    font-weight: bold;

    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }
`;
