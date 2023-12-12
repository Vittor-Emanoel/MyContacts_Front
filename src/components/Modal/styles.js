import styled from "styled-components"

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.div`
  background: #ffffff;
  border-radius: 4px;
  width: 90%;
  max-width: 450px;
  min-height: 204px;
  padding: 24px;

  box-shadow: 0px 4px 10px 0px #0000000a;

  > h1 {
    font-size: 22px;
    color: ${({ theme, danger }) =>
      danger ? theme.colors.danger.main : theme.colors.gray[900]};
  }

  .modal-body {
    margin-top: 32px;
  }
`

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray[200]};

    &:disabled {
      cursor: not-allowed;
    }
  }
`
