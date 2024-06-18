import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/icons/check-circle.svg';
import xCircleIcon from '../../../assets/icons/x-circle.svg';

function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message?.duration || 7000);

    // component desmonta
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      isLeaving={isLeaving}
      ref={animatedRef}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="Danger" />}
      {message.type === 'success' && (
        <img src={checkCircleIcon} alt="Success" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};

export default memo(ToastMessage);
