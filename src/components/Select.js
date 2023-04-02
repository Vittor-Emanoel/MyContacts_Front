import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  background: #ffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: none;
  padding: 0 16px;
  outline: none;
  border: 2px solid #ffff;
  transition: border-color 0.2s ease-in;
  font-size: 1rem;
  appearance: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }
`;
