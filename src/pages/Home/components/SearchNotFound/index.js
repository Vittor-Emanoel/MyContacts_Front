/* eslint-disable react/prop-types */
import PropsTypes from 'prop-types';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';
import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="MagnifierQuestion" />
      <span>
        Nenhum resultado foi encontrado para
        {' '}
        <strong>{searchTerm}</strong>
      </span>
    </Container>
  );
}

SearchNotFound.propsTypes = {
  searchTerm: PropsTypes.string.isRequired,
};
