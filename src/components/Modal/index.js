import PropTypes from "prop-types"
import { createPortal } from "react-dom"
import Button from "../Button"
import { Container, Footer, Overlay } from "./styles"

export default function Modal({
  title,
  danger,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible
}) {
  if (!visible) return null

  return createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <div className="modal-body">{children}</div>
        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <Button type="button" danger={danger} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("modal-root")
  )
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

Modal.defaultProps = {
  danger: false,
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar"
}
