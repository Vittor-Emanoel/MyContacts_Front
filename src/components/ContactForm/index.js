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

// Controlled Componentes = Responsabilidade do react, renderiza a cada letra
// Uncontrolled Componentes = Javascript puro(useRef)

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name,
      email,
      phone,
      category,
    });
  };

  const handleNameChange = ({ target }) => {
    setName(target.value);

    if (!target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é Obrigatório' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'name'));
    }
  };

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);

    if (target.value && !isEmailValid(target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'Email inválido' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'email'));
    }
  };

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={handleNameChange} />
      </FormGroup>

      <FormGroup>
        <Input
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
