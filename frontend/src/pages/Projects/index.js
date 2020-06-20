import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';

import { formatDistanceToNow, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import { Container, Project, PageSelector, Infos } from './styles';

function Projects() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get('/projects', { params: { page } });
        setTotalPages(response.data.count);
        setProjects(response.data.rows);
      } catch (error) {
        toast.error('Error ao carregar posts');
      }
    }

    loadPosts();
  }, [page]);

  function handleAddPage() {
    setPage(page + 1);
  }

  function handleDecPage() {
    setPage(page - 1);
  }

  return (
    <Container>
      <ul>
        {projects &&
          projects.map((project) => (
            <Project key={project.id}>
              <button type="button">
                <h2>{project.title}</h2>
                <div>
                  <img src={project.image_url} alt={project.title} />
                  <p>{project.description}</p>
                  <Infos>
                    <p>{project.votes} votos</p>
                    <p>
                      Finaliza{' '}
                      {formatDistanceToNow(parseISO(project.date_finish), {
                        addSuffix: true,
                        locale: pt,
                      })}
                    </p>
                  </Infos>
                </div>
              </button>
            </Project>
          ))}
      </ul>

      <PageSelector>
        {page !== 1 && (
          <button type="button" onClick={handleDecPage}>
            <MdChevronLeft size={36} color="#fff" />
          </button>
        )}
        <strong>{page}</strong>
        {totalPages / 10 > page && (
          <button type="button" onClick={handleAddPage}>
            <MdChevronRight size={36} color="#fff" />
          </button>
        )}
      </PageSelector>
    </Container>
  );
}

export default Projects;
