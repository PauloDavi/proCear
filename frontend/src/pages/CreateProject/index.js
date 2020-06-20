import React, { useState } from 'react';
import { Ring } from 'react-spinners-css';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import { isBefore, formatISO } from 'date-fns';
import * as Yup from 'yup';

import InputMask from '~/components/InputMask';
import PhotoInput from '~/components/PhotoInput';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  date: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](20)\d{2}/,
      'Data invalida'
    )
    .required('A data é obrigatória'),
  description: Yup.string().required('A descrição é obrigatória'),
});

function CreatePost() {
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      const { title, description, date } = data;
      setLoading(true);

      const formData = new FormData();

      const day = date.substr(0, 2);
      const mouth = date.substr(3, 2);
      const year = date.substr(6, 4);

      const date_finish = new Date(year, mouth - 1, day, 23, 59, 59, 0);

      if (isBefore(date_finish, new Date())) {
        toast.error('Essa data já passou');
        setLoading(false);
        return;
      }

      formData.append('title', title);
      formData.append('description', description);
      formData.append('date_finish', formatISO(date_finish));

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await api.post('/projects', formData);

      setLoading(false);

      toast.success('Projeto criado com sucesso');

      history.push('/projetos');
    } catch (error) {
      toast.error('Error ao criar projeto');
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>Criar um Projeto</h1>

      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
          <PhotoInput
            onFileUploaded={setSelectedFile}
            onchangeUrl={setImageUrl}
            imageUrl={imageUrl}
          />

          <Input name="title" placeholder="Titulo do post" />
          <InputMask
            name="date"
            mask="99/99/9999"
            maskChar="_"
            alwaysShowMask={false}
            formatChars={{ '9': '[0-9]' }}
            permanents={[2, 5]}
            placeholder="Data para finalização do projeto"
          />
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
