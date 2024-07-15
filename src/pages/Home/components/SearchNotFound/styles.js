import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: flex-start;

  width: 100%;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 24px;
    word-break: break-word;
  }
`;
