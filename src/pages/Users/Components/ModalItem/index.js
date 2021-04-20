/* eslint-disable react/jsx-boolean-value */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import InputMask from 'react-input-mask';
import {
  Typography,
  Grid,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from '@material-ui/core';

import api from '~/services/api';
import { useAuth } from '~/hooks/Auth';
import { useToast } from '~/hooks/Toast';
import LoadingPage from '~/components/Loader';

import { TextFieldStyled, ErrorMessageText } from './styles';

const ModalItem = ({ handleCloseModal, open, item = null, getItens }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { language } = useAuth();

  const schema = Yup.object().shape({
    name: Yup.string().required(
      language ? 'Enter the name of the user.' : 'Informe o nome da Matriz'
    ),
    email: Yup.string().required(
      language ? 'Enter the name of the user.' : 'Informe o email do Usuário'
    ),
    level: Yup.string().required(
      language
        ? 'Enter the permission of the user.'
        : 'Informe a permissão do Usuário'
    ),
  });

  const levels = [
    {
      value: 'admin',
      label: language ? 'Adm' : 'Admin',
    },
    {
      value: 'motoboy',
      label: 'Motoboy',
    },
  ];

  const handleSaveClasse = useCallback(
    async data => {
      setLoading(true);
      if (item && item.id) {
        api
          .put(`users/${item.id}`, {
            ...data,
          })
          .then(() => {
            addToast({
              type: 'success',
              title: language ? 'Registered successfully' : 'Salvo com sucesso',
            });
            handleCloseModal();
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
          .post(`users`, {
            ...data,
          })
          .then(() => {
            addToast({
              type: 'success',
              title: language ? 'Registered successfully' : 'Salvo com sucesso',
            });
            handleCloseModal();
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
    [addToast, getItens, handleCloseModal, item, language]
  );

  return (
    <Dialog
      // onClose={this.props.handleModalItem}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle onClose={() => handleCloseModal()}>
        <div>
          <Typography variant="h6">{language ? 'User' : 'Usuário'} </Typography>
        </div>
      </DialogTitle>
      <DialogContent style={{ overflowX: 'hidden' }}>
        <Formik
          enableReinitialize
          validationSchema={schema}
          initialValues={{
            name: item && item.name ? item.name : '',
            phone: item && item.phone ? item.phone : '',
            email: item && item.email ? item.email : '',
            password: '',
            status: item ? item.status : true,
            level: item && item.level ? item.level : '',
          }}
          onSubmit={handleSaveClasse}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <Form>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.name}
                    fullWidth
                    id="name"
                    name="name"
                    required
                    onChange={handleChange}
                    label={language ? 'Name' : 'Nome'}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.name && touched.name ? (
                    <ErrorMessageText>{errors.name}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.email}
                    fullWidth
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    label="E-mail"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.email && touched.email ? (
                    <ErrorMessageText>{errors.email}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.password}
                    type="password"
                    fullWidth
                    id="password"
                    name="password"
                    onChange={handleChange}
                    label={language ? 'Password' : 'Senha'}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.password && touched.password ? (
                    <ErrorMessageText>{errors.password}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <InputMask
                    mask="(99) 99999-9999"
                    fullWidth
                    value={values.phone}
                    name="phone"
                    label={language ? 'Phone' : 'Telefone'}
                    onChange={handleChange}
                  >
                    {inputProps => (
                      <TextFieldStyled
                        {...inputProps}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  </InputMask>
                  {errors.phone && touched.phone ? (
                    <ErrorMessageText>{errors.phone}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.level}
                    fullWidth
                    id="level"
                    name="level"
                    required
                    select
                    onChange={handleChange}
                    label={language ? 'Level user' : 'Nível de permissão'}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {levels && levels.length
                      ? levels.map(level => (
                          <MenuItem key={level.value} value={level.value}>
                            {level.label}
                          </MenuItem>
                        ))
                      : null}
                  </TextFieldStyled>
                  {errors.level && touched.level ? (
                    <ErrorMessageText>{errors.level}</ErrorMessageText>
                  ) : null}
                </Grid>
              </Grid>
              {item && (
                <Grid item xs={12}>
                  <TextFieldStyled
                    value={values.status}
                    fullWidth
                    id="status"
                    name="status"
                    required
                    onChange={handleChange}
                    label="Status"
                    select
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option key={true} value={true}>
                      {language ? 'Active' : 'Ativo'}
                    </option>
                    <option key={false} value={false}>
                      {language ? 'Inactive' : 'Inativo'}
                    </option>
                  </TextFieldStyled>
                </Grid>
              )}
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
                        onClick={() => handleCloseModal()}
                        color="primary"
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
        {loading && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

ModalItem.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  getItens: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.node.isRequired,
};

export default ModalItem;
