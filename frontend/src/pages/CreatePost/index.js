import React, { useState } from 'react';
import { Ring } from 'react-spinners-css';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import PhotoInput from '~/components/PhotoInput';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  description: Yup.string().required('O descrição é obrigatória'),
});

function CreatePost() {
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      const { title, description } = data;
      setLoading(true);

      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      console.tron.log(formData);

      await api.post('/posts', formData);
      setLoading(false);

      toast.success('Post criado com sucesso');

      history.push('/');
    } catch (error) {
      toast.error('Error ao criar post');
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>Criar um Post</h1>

      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
          <PhotoInput
            onFileUploaded={setSelectedFile}
            onchangeUrl={setImageUrl}
            imageUrl={imageUrl}
          />

          <Input name="title" placeholder="Titulo do post" />
          <Input name="description" multiline placeholder="Descrição do post" />

          <button type="submit">
            {loading ? <Ring color="#fff" size={32} /> : 'Criar post'}
          </button>
        </Form>
      </Content>
    </Container>
  );
}

export default CreatePost;
