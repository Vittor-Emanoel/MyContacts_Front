import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity:  0 }

    to { opacity: 1 }
  
`;

const fadeOut = keyframes`
  from { opacity:  1 }

  to {opacity: 0}
  
`;

const scaleOut = keyframes`
      from {
    transform:  scale(1)
    }

    to {
      transform:  scale(0)

    }

`;

const scaleIn = keyframes`
  from {
    transform:  scale(0)
    }

    to {
      transform:  scale(1)

    }
  
`;

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

  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving
    && css`
      animation: ${fadeOut} 0.2s forwards;
    `}
`;

export const Container = styled.div`
  background: #ffffff;
  border-radius: 4px;
  width: 90%;
  max-width: 450px;
  min-height: 204px;
  padding: 24px;
  animation: ${scaleIn} 0.3s;
  box-shadow: 0px 4px 10px 0px #0000000a;

  > h1 {
    font-size: 22px;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray[900])};
  }

  .modal-body {
    margin-top: 32px;
  }

  ${({ isLeaving }) => isLeaving
    && css`
      animation: ${scaleOut} 0.2s forwards;
    `}
`;

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
`;
