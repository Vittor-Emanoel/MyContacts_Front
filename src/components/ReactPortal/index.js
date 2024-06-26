import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default function ReactPortal({ containerId, children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return createPortal(children, container);
}

ReactPortal.proptypes = {
  containerId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
  containerId: 'portal-root',
};
