import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 40px;
  grid-template-rows: 40px;

  grid-template-areas: 'ID NC IE';

  strong {
    grid-column: 2 / 3;
    color: #fff;
    font-size: 24px;
    text-align: center;
  }
`;

export const Left = styled.button`
  grid-area: 'ID';
  background: none;
  border: 0;

  border: 0;

  ${(props) =>
    props.page === 1 &&
    css`
      display: none;
    `}
`;

export const Right = styled.button`
  grid-area: 'IE';
  background: none;
  border: 0;

  ${(props) =>
    props.totalPages / 10 < props.page &&
    css`
      display: none;
    `}
`;
