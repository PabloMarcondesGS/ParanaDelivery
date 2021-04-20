/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
import React, { useCallback, useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Typography, Grid, DialogActions, Button } from '@material-ui/core';
import JoditEditor from 'jodit-react';

import api from '~/services/api';
import { useAuth } from '~/hooks/Auth';
import { useToast } from '~/hooks/Toast';
import LoadingPage from '~/components/Loader';
import history from '~/services/history';

import {
  TextFieldStyled,
  ErrorMessageText,
  ImageStyled,
  Container,
  PaperStyled,
} from './styles';

const Dashboard = () => {
  const joditRef = useRef(null);
  const { addToast } = useToast();
  const { language } = useAuth();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [imageLoadingThumb, setImageLoadingThumb] = useState();
  const [selectedFileThumb, setSelectedFileThumb] = useState();

  const config = {
    readonly: false,
  };

  const schema = Yup.object().shape({
    description: Yup.string().required(
      language ? 'Enter the description.' : 'Informe uma deescrição'
    ),
  });

  const getItens = useCallback(async () => {
    try {
      const response = await api.get(`settings`);
      if (response.data && response.data.length) {
        setItem(response.data[0]);
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: language ? 'An error has occurred.' : 'Ocorreu um erro.',
      });
    }
  }, [addToast, language]);

  const uploadImage = useCallback(async file => {
    const teste = await api
      .post('upload', file, {
        // onUploadProgress: progressEvent => {}
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
    return teste;
  }, []);

  const handleSaveClasse = useCallback(
    async data => {
      setLoading(true);
      let image = '';
      if (selectedFileThumb) {
        const fd = new FormData();
        fd.append('file', selectedFileThumb, selectedFileThumb.name);
        image = await uploadImage(fd);
      } else {
        image = `${item.url_thumb}`;
      }
      if (item && item.id) {
        api
          .put(`settings/${item.id}`, {
            ...data,
            url_thumb: image || null,
          })
          .then(() => {
            addToast({
              type: 'success',
              title: language ? 'Registered successfully' : 'Salvo com sucesso',
            });
            getItens();
            setLoading(false);
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: language ? 'An error has occurred.' : 'Ocorreu um erro.',
            });
            setLoading(false);
          });
      } else {
        api
          .post(`settings`, {
            ...data,
            url_thumb: image,
          })
          .then(() => {
            addToast({
              type: 'success',
              title: language ? 'Registered successfully' : 'Salvo com sucesso',
            });
            getItens();
            setLoading(false);
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: language ? 'An error has occurred.' : 'Ocorreu um erro.',
            });
            setLoading(false);
          });
      }
    },
    [addToast, getItens, item, language, selectedFileThumb, uploadImage]
  );

  const fileSelectedHandler2 = useCallback(event => {
    const reader = new FileReader();
    if (event && event.target && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFileThumb(event.target.files[0]);

      reader.onload = e => {
        setImageLoadingThumb(e.target.result);
      };
    }
  }, []);

  useEffect(() => {
    getItens();
  }, [getItens]);

  return (
    <Container>
      <PaperStyled>
        {loading ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LoadingPage size={30} loading={loading} type="ThreeDots" />
          </div>
        ) : (
          <Formik
            enableReinitialize
            validationSchema={schema}
            initialValues={{
              description: item && item.description ? item.description : '',
              url_video: item && item.url_video ? item.url_video : '',
            }}
            onSubmit={handleSaveClasse}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              errors,
              touched,
              setFieldValue,
            }) => (
              <Form>
                <Grid container>
                  {!imageLoadingThumb && item && item.url_thumb ? (
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography>
                        {language ? 'Featured banner' : 'Banner de destaque'}
                      </Typography>
                      <div style={{ marginTop: 8 }}>
                        <ImageStyled alt="thumb" src={item.url_thumb} />
                      </div>
                    </Grid>
                  ) : null}
                  {imageLoadingThumb ? (
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography>
                        {language ? 'Featured banner' : 'Banner de destaque'}
                      </Typography>
                      <div style={{ marginTop: 8 }}>
                        <ImageStyled alt="thumb" src={imageLoadingThumb} />
                      </div>
                    </Grid>
                  ) : null}
                  <Grid item xs={12} sm={12} md={12}>
                    <TextFieldStyled
                      fullWidth
                      id="url_thumb"
                      name="url_thumb"
                      type="file"
                      required
                      onChange={fileSelectedHandler2}
                      label={
                        language ? 'Featured banner' : 'Banner de destaque'
                      }
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {errors.url_thumb && touched.url_thumb ? (
                      <ErrorMessageText>{errors.url_thumb}</ErrorMessageText>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextFieldStyled
                      fullWidth
                      id="url_video"
                      name="url_video"
                      required
                      value={values.url_video}
                      onChange={handleChange}
                      label={
                        language ? 'Video URL' : 'URL do vídeo de destaque'
                      }
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {errors.url_video && touched.url_video ? (
                      <ErrorMessageText>{errors.url_video}</ErrorMessageText>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  spacing={16}
                  style={{ padding: 8 }}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography style={{ fontWeight: 600 }}>
                      {language ? 'Description' : 'Informe uma descrição'}
                    </Typography>

                    <JoditEditor
                      ref={joditRef}
                      value={values.description}
                      config={config}
                      onChange={val => {
                        setFieldValue('description', val);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid container justify="flex-end">
                      <DialogActions>
                        <Button
                          onClick={() => handleSubmit()}
                          color="primary"
                          variant="contained"
                          disabled={loading}
                        >
                          {language ? 'Save' : 'Salvar'}
                        </Button>
                      </DialogActions>
                      <DialogActions>
                        <Button
                          variant="outlined"
                          onClick={() => history.goBack()}
                          color="primary"
                          disabled={loading}
                        >
                          {language ? 'Cancel' : 'Cancelar'}
                        </Button>
                      </DialogActions>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </PaperStyled>
    </Container>
  );
};

export default Dashboard;
