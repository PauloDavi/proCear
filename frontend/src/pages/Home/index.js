import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, Post, PageSelector } from './styles';

function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get('/posts', { params: { page } });
        setTotalPages(response.data.count);
        setPosts(response.data.rows);
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

export default Home;
