import PropTypes from 'prop-types';
import { useState } from 'react';
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

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleNameChange({ target }) {
    setName(target.value);

    if (!target.value) {
      setError({ field: 'name', message: 'Nome Obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange({ target }) {
    setEmail(target.value);

    if (target.value && !isEmailValid(target.value)) {
      setError({ field: 'email', message: 'E-mail Inválido' });
    } else {
      removeError('email');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      name,
      email,
      phone,
      category,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={({ target }) => setPhone(target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
