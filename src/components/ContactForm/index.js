import PropTypes from 'prop-types';
import { useState } from 'react';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';

// Components
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

// Styles
import { ButtonContainer, Form } from './styles';

// CustomHooks
import useErrors from '../../hooks/useErrors';

// Controlled Componentes = Responsabilidade do react, renderiza a cada letra
// Uncontrolled Componentes = Javascript puro(useRef)

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleNameChange({ target }) {
    setName(target.value);

    if (!target.value) {
      setError({
        field: 'name',
        message: 'Nome Obrigatório',
      });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange({ target }) {
    setEmail(target.value);

    if (target.value && !isEmailValid(target.value)) {
      setError({
        field: 'email',
        message: 'E-mail Inválido',
      });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange({ target }) {
    setPhone(formatPhone(target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      category,
    });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          error={getErrorMessageByFieldName('email')}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
