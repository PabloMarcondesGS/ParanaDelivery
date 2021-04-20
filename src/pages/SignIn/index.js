import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid, TextField } from '@material-ui/core';

import {
  StyledContainer,
  StyledGridItem,
  StyledSubmitButton,
  StyledForm,
  Error,
} from './styles';

import colors from '~/styles/colors';
import { useAuth } from '~/hooks/Auth';
import { useToast } from '~/hooks/Toast';

import logoImg from '~/assets/images/log.png';

const SignIn = () => {
  const { signIn, loading, setLoading, language, updateLanguage } = useAuth();
  const { addToast } = useToast();
  const [error, setError] = useState('');

  const schema = Yup.object().shape({
    email: Yup.string().required(
      language ? 'Enter email.' : 'Informe o e-mail'
    ),
    password: Yup.string().required(
      language ? 'Enter password' : 'Informe a senha'
    ),
  });
  const handleLogin = useCallback(
    async data => {
      try {
        await signIn(data, setError);
      } catch (err) {
        addToast({
          type: 'error',
          title: language ? 'An error has occurred.' : 'Ocorreu um erro.',
          description: language
            ? 'Check your email and password and try again'
            : 'Verifique seu email e senha e tente novamente',
        });
        setLoading(false);
      }
    },
    [signIn, addToast, setLoading, language]
  );

  const handleChangeLanguage = useCallback(() => {
    const languageS = localStorage.getItem('@webAcademy:language');
    if (languageS) {
      localStorage.removeItem('@webAcademy:language');
    } else {
      localStorage.setItem('@webAcademy:language', JSON.stringify(true));
    }
    updateLanguage();
  }, [updateLanguage]);

  return (
    <StyledContainer maxWidth="sm">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit }) => (
          <StyledForm>
            <img alt="Coupons" width="200" src={logoImg} />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <StyledGridItem
                item
                sm
                marginTop={30}
                style={{
                  background: 'white',
                  marginTop: 14,
                  paddingLeft: 8,
                  borderRadius: 8,
                }}
              >
                <TextField
                  id="email"
                  name="email"
                  fullWidth
                  autoFocus
                  style={{
                    paddingTop: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
                  color="secondary"
                  disabled={false}
                  type="email"
                  label={language ? 'Email' : 'E-mail'}
                  // error={error}
                  onChange={handleChange}
                />
              </StyledGridItem>

              <StyledGridItem
                item
                sm
                style={{
                  background: 'white',
                  marginTop: 14,
                  paddingLeft: 8,
                  borderRadius: 8,
                }}
              >
                <TextField
                  id="password"
                  name="password"
                  color="secondary"
                  style={{
                    paddingTop: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
                  fullWidth
                  disabled={false}
                  type="password"
                  label={language ? 'Password' : 'Senha'}
                  // error={error}
                  onChange={handleChange}
                />
              </StyledGridItem>
              {error && <Error>{error}</Error>}

              <center>
                <StyledGridItem item marginTop={70}>
                  <StyledSubmitButton
                    variant="contained"
                    background={colors.blueButton}
                    color={colors.white}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {loading
                      ? `${language ? 'Loading...' : 'Entrando...'}`
                      : `${language ? 'SignIn' : 'Entrar'}`}
                  </StyledSubmitButton>
                </StyledGridItem>

                <StyledGridItem item marginTop={70}>
                  <StyledSubmitButton
                    variant="contained"
                    background={colors.blueButton}
                    color={colors.white}
                    type="button"
                    onClick={handleChangeLanguage}
                  >
                    {language ? 'PT-BR' : 'EN-US'}
                  </StyledSubmitButton>
                </StyledGridItem>
                {/* <StyledGridItem item>
                  <StyledSubmitButton
                    variant="outlined"
                    color="primary"
                    type="button"
                  >
                    Recuperar a senha
                  </StyledSubmitButton>
                </StyledGridItem> */}
              </center>
            </Grid>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default SignIn;
