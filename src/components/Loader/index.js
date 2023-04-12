import { createPortal } from 'react-dom';
import propTypes from 'prop-types'
import { Overlay } from './styles';


export default function Loader({ isLoading }) {

  if(!isLoading) {
    return null
  }

  return createPortal(
    <Overlay>
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isLoading: propTypes.bool.isRequired,
}