/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

import Proptypes from 'prop-types';

import { Container, Content } from './styles';

function Dropzone({ onFileUploaded, onchangeUrl }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const { image_url } = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (image_url) {
      setSelectedFileUrl(image_url);
      onchangeUrl(image_url);
    }
  }, [image_url, onchangeUrl]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onchangeUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded, onchangeUrl]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <Content>
      <Container {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />

        {selectedFileUrl && <img src={selectedFileUrl} alt="foto do perfil" />}
      </Container>
      <p>Click ou araste e solte para mudar</p>
    </Content>
  );
}

Dropzone.propTypes = {
  onFileUploaded: Proptypes.func.isRequired,
  onchangeUrl: Proptypes.func.isRequired,
};

export default Dropzone;
