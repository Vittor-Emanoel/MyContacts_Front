import PropTypes from "prop-types";
import { Container } from "./styles";

import xCircleIcon from '../../../assets/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/icons/check-circle.svg'



export default function ToastMessage({ text, type}) {

  return (
      <Container>
        {type === 'danger' && <img src={xCircleIcon} alt="Danger"/>}
        {type === 'success' && <img src={checkCircleIcon} alt="Success"/>}
          <strong>{text}</strong>
      </Container>
  )
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'danger', 'success'])
}

ToastMessage.defaultProps = {
  type: 'dafault'
}