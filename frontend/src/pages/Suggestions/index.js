import React, { useState } from 'react';
import { Ring } from 'react-spinners-css';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  subject: Yup.string().required('O assunto é obrigatório'),
  description: Yup.string().required('A sugestão é obrigatória'),
});

function CreatePost() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      setLoading(true);

      await api.post('/suggestions', data);

      setLoading(false);

      toast.success(
        'Nós recebemos a sua sugestão e entraremos em contato pelo email'
      );
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>Sugestão</h1>

      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
          <Input name="subject" placeholder="Assunto" />
          <Input
            name="description"
            multiline
            placeholder="Digite aqui a sua sugestão de projeto"
          />

          <button type="submit">
            {loading ? <Ring color="#fff" size={32} /> : 'Enviar sugestão'}
          </button>
        </Form>
      </Content>
    </Container>
  );
}

export default CreatePost;
