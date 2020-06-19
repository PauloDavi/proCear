import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Post, PageSelector } from './styles';

function Home() {
  const [page, setPage] = useState(1);

  function handleAddPage() {
    setPage(page + 1);
  }

  function handleDecPage() {
    setPage(page - 1);
  }

  return (
    <Container>
      <ul>
        <Post>
          <button type="button">
            <h2>Padaria</h2>
            <div>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.27ojYz7WMk5-GdiOb6V6jgHaE8%26pid%3DApi&f=1"
                alt="Padaria"
              />
              <p>
                esse poste é um teste e é muito legal esse poste é um teste e é
                muito legal esse poste é um teste e é muito legal esse poste é
                um teste e é muito legal esse poste é um teste e é muito legal
                esse poste é um teste e é muito legal esse poste é um teste e é
                muito legal é um teste e é muito legal esse poste é um teste e é
                muito é um teste e é muito legal esse poste é um teste e é muito
              </p>
            </div>
          </button>
        </Post>
        <Post>
          <button type="button">
            <h2>Reitoria</h2>
            <div>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fYUTTA8bX_tlk9gm01fmxQHaEp%26pid%3DApi&f=1"
                alt="Reitoria"
              />
              <p>
                esse poste é um teste e é muito legal esse poste é um teste e é
                muito legal esse poste é um teste e é muito legal esse poste é
                um teste e é muito legal esse poste é um teste e é muito legal
              </p>
            </div>
          </button>
        </Post>
        <Post>
          <button type="button">
            <h2>Mapa</h2>
            <div>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IsshG_p7aD0tM_BTlMW4SAHaFJ%26pid%3DApi&f=1"
                alt="Mapa"
              />
              <p>
                esse poste é um teste e é muito legal esse poste é um teste e é
                muito legal esse poste é um teste e é muito legal esse poste é
              </p>
            </div>
          </button>
        </Post>
        <Post>
          <button type="button">
            <h2>title</h2>
            <div>
              <p>
                esse poste é um teste e é muito legal esse poste é um teste e é
                muito legal esse poste é um teste e é muito legal esse poste é
                um teste e é muito legal esse poste é um teste e é muito legal
                esse poste é um teste e é muito legal esse poste é um teste e é
                muito legal é um teste e é muito legal esse poste é um teste e é
                muito é um teste e é muito legal esse poste é um teste e é muito
              </p>
            </div>
          </button>
        </Post>
      </ul>

      <PageSelector>
        {page !== 1 && (
          <button type="button" onClick={handleDecPage}>
            <MdChevronLeft size={36} color="#fff" />
          </button>
        )}
        <strong>{page}</strong>
        <button type="button" onClick={handleAddPage}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </PageSelector>
    </Container>
  );
}

export default Home;
