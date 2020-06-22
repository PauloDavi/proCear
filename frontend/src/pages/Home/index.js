import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Roller, Ring } from 'react-spinners-css';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import PageSelector from '~/components/PageSelector';
import api from '~/services/api';

import { Container, Post, Suggestions } from './styles';

const schema = Yup.object().shape({
  subject: Yup.string().required('O assunto é obrigatório'),
  description: Yup.string().required('A sugestão é obrigatória'),
});

function Home() {
  const [loadingSugestion, setLoadingSugestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState(null);

  const { signed } = useSelector((state) => state.auth);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const response = await api.get('/posts', { params: { page } });
        setTotalPages(response.data.count);
        setPosts(response.data.rows);
        setLoading(false);
      } catch (error) {
        toast.error('Error ao carregar posts');
        setLoading(false);
      }
    }

    loadPosts();
  }, [page]);

  async function handleSubmit(data) {
    try {
      setLoadingSugestion(true);

      await api.post('/suggestions', data);

      setLoadingSugestion(false);

      toast.success(
        'Nós recebemos a sua sugestão e entraremos em contato pelo email'
      );
    } catch (error) {
      toast.error(error.message);
      setLoadingSugestion(false);
    }
  }

  return (
    <Container>
      {loading ? (
        <Roller color="#fff" />
      ) : (
        <>
          <ul>
            {posts &&
              posts.map((post) => (
                <Post key={post.id}>
                  <button type="button">
                    <h2>{post.title}</h2>
                    <div>
                      <img src={post.image_url} alt={post.title} />
                      <p>{post.description}</p>
                    </div>
                  </button>
                </Post>
              ))}
          </ul>

          <PageSelector page={page} setPage={setPage} totalPages={totalPages} />
        </>
      )}
      {!signed && (
        <Suggestions>
          <h1>Sugestão</h1>

          <Form onSubmit={handleSubmit} schema={schema}>
            <Input name="subject" placeholder="Assunto" />
            <Input
              name="description"
              multiline
              placeholder="Digite aqui a sua sugestão de projeto"
            />

            <button type="submit">
              {loadingSugestion ? (
                <Ring color="#fff" size={32} />
              ) : (
                'Enviar sugestão'
              )}
            </button>
          </Form>
        </Suggestions>
      )}
    </Container>
  );
}

export default Home;
