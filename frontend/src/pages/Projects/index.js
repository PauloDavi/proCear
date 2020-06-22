import React, { useState, useEffect } from 'react';
import { Roller } from 'react-spinners-css';
import { toast } from 'react-toastify';

import { formatDistanceToNow, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import PageSelector from '~/components/PageSelector';
import api from '~/services/api';

import { Container, Project, Infos } from './styles';

function Projects() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const response = await api.get('/projects', { params: { page } });
        setTotalPages(response.data.count);
        setProjects(response.data.rows);
        setLoading(false);
      } catch (error) {
        toast.error('Error ao carregar posts');
        setLoading(false);
      }
    }

    loadPosts();
  }, [page]);

  return (
    <Container>
      {loading ? (
        <Roller color="#fff" />
      ) : (
        <>
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

          <PageSelector page={page} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </Container>
  );
}

export default Projects;
