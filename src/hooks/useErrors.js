import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }
    setErrors((prevState) => [...prevState, { field, message }]);
  }

  function removeError(fiedlName) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fiedlName));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return { setError, removeError, getErrorMessageByFieldName };
}
