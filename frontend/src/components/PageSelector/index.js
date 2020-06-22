import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import Proptypes from 'prop-types';

import { Container, Left, Right } from './styles';

function PageSelector({ page, setPage, totalPages }) {
  function handleAddPage() {
    setPage(page + 1);
  }

  function handleDecPage() {
    setPage(page - 1);
  }

  return (
    <Container>
      <Left
        type="button"
        page={page}
        totalPages={totalPages}
        onClick={handleDecPage}
      >
        <MdChevronLeft size={36} color="#fff" />
      </Left>
      <strong>{page}</strong>
      <Right
        type="button"
        page={page}
        totalPages={totalPages}
        onClick={handleAddPage}
      >
        <MdChevronRight size={36} color="#fff" />
      </Right>
    </Container>
  );
}

PageSelector.propTypes = {
  page: Proptypes.number.isRequired,
  setPage: Proptypes.func.isRequired,
  totalPages: Proptypes.number.isRequired,
};

export default PageSelector;
