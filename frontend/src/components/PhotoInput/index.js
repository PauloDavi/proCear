/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import Proptypes from 'prop-types';

import { Container } from './styles';

function Dropzone({ onFileUploaded, onchangeUrl, imageUrl }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const image_url = imageUrl;

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
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Imagem do post" />
      ) : (
        <p>Click ou araste e solte para mudar</p>
      )}
    </Container>
  );
}

Dropzone.propTypes = {
  onFileUploaded: Proptypes.func.isRequired,
  onchangeUrl: Proptypes.func.isRequired,
  imageUrl: Proptypes.string.isRequired,
};

export default Dropzone;
