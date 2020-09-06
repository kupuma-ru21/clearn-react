import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from './signup-styles.scss';
import {
  Header,
  Footer,
  Input,
  FormStatus,
  SubmitButton,
} from '@/presentation/components';
import { FormContext, ApiContext } from '@/presentation/context';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/usecases';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormIvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    emailError: '',
    nameError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  useEffect(() => {
    validate('name');
  }, [state.name]);
  useEffect(() => {
    validate('email');
  }, [state.email]);
  useEffect(() => {
    validate('password');
  }, [state.password]);
  useEffect(() => {
    validate('passwordConfirmation');
  }, [state.passwordConfirmation]);

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state;
    const formdata = { name, email, password, passwordConfirmation };
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formdata),
    }));
    setState((old) => ({
      ...old,
      isFormIvalid:
        !!old.nameError ||
        !!old.emailError ||
        !!old.passwordError ||
        !!old.passwordConfirmationError,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (state.isLoading || state.isFormIvalid) return;
    try {
      setState({ ...state, isLoading: true });
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
      setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };
  return (
    <div className={Styles.signupWrap}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu name" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <SubmitButton text={'Enter'} />
          <Link
            data-testid="login-link"
            to="/login"
            className={Styles.link}
            replace
          >
            Voltar Para Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
