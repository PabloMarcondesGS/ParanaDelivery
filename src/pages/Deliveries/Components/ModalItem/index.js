/* eslint-disable react/jsx-boolean-value */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import {
  Typography,
  Grid,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

import api from '~/services/api';
import { useAuth } from '~/hooks/Auth';
import { useToast } from '~/hooks/Toast';
import LoadingPage from '~/components/Loader';

import { TextFieldStyled, ErrorMessageText } from './styles';

const ModalItem = ({ handleCloseModal, open, item = null, getItens }) => {
  const { addToast } = useToast();
  const { language } = useAuth();
  const [loading, setLoading] = useState(false);
  const [motoboys, setMotoboys] = useState([]);
  const [selecteds, setSelecteds] = useState();

  const schema = Yup.object().shape({
    client_name: Yup.string().required(
      language ? 'Enter the name of the user.' : 'Informe o nome do cliente'
    ),
    phone: Yup.string().required(
      language ? 'Enter the name of the user.' : 'Informe o telefone do cliente'
    ),
  });

  const handleSelectedItens = useCallback(e => {
    setSelecteds(e);
  }, []);

  const handleSaveClasse = useCallback(
    async data => {
      if (!selecteds) {
        addToast({
          type: 'error',
          title: 'Selecione um motoboy',
        });
        return;
      }
      setLoading(true);
      if (item && item.id) {
        api
          .put(`deliveries/${item.id}`, {
            ...data,
            user_id: selecteds.value,
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
          .post(`deliveries`, {
            ...data,
            user_id: selecteds.value,
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
    [addToast, getItens, handleCloseModal, item, language, selecteds]
  );

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await api.get('users-motoboy');
      const arr = [];
      resp.data
        .filter(motoboy => motoboy.status)
        // eslint-disable-next-line
        .map(usr => {
          const objData = {
            value: usr.id,
            label: usr.name,
          };
          arr.push(objData);
        });
      setMotoboys(arr);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (item && item.user_id) {
      setSelecteds({
        value: item.user.id,
        label: item.user.name,
      });
    }
  }, [item]);

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
            client_name: item && item.client_name ? item.client_name : '',
            phone: item && item.phone ? item.phone : '',
            address: item && item.address ? item.address : '',
            city: item && item.city ? item.city : '',
            cep: item && item.cep ? item.cep : '',
            state: item && item.state ? item.state : '',
            status: item ? item.status : true,
          }}
          onSubmit={handleSaveClasse}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <Form>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ padding: 8, zIndex: 999 }}
                >
                  <p>Selecione o motoboy</p>
                  <Select
                    options={motoboys}
                    value={selecteds}
                    placeholder="Selecione o motoboy"
                    style={{ background: 'white', zIndex: 999 }}
                    label="Selecione o Usuário"
                    onChange={handleSelectedItens}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.client_name}
                    fullWidth
                    id="client_name"
                    name="client_name"
                    required
                    onChange={handleChange}
                    label={'Nome do cliente'}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.client_name && touched.client_name ? (
                    <ErrorMessageText>{errors.client_name}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <InputMask
                    mask="(99) 99999-9999"
                    fullWidth
                    value={values.phone}
                    name="phone"
                    label={language ? 'Phone' : 'Telefone do cliente'}
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
                    value={values.address}
                    fullWidth
                    id="address"
                    name="address"
                    onChange={handleChange}
                    label={language ? 'address' : 'Endereço, número'}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.address && touched.address ? (
                    <ErrorMessageText>{errors.address}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.city}
                    fullWidth
                    id="city"
                    name="city"
                    required
                    onChange={handleChange}
                    label="Cidade"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.city && touched.city ? (
                    <ErrorMessageText>{errors.city}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.state}
                    fullWidth
                    id="state"
                    name="state"
                    required
                    onChange={handleChange}
                    label="Cidade"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.state && touched.state ? (
                    <ErrorMessageText>{errors.state}</ErrorMessageText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextFieldStyled
                    value={values.cep}
                    fullWidth
                    id="cep"
                    name="cep"
                    required
                    onChange={handleChange}
                    label="CEP"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.cep && touched.cep ? (
                    <ErrorMessageText>{errors.cep}</ErrorMessageText>
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
                    label="Status (Deletar pedido?)"
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
                      Aberto
                    </option>
                    <option key={false} value={false}>
                      Fechado
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
