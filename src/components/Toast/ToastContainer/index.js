import { useEffect } from "react"
import ToastMessage from "../ToastMessage"
import { Container } from "./styles"

import useAnimatedList from "../../../hooks/useAnimatedList"
import { toastEventManager } from "../../../utils/toast"

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItems,
    handleAnimationEnd,
    renderList
  } = useAnimatedList()

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration }
      ])
    }

    toastEventManager.on("addtoast", handleAddToast)

    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast)
    }
  }, [setMessages])

  return (
    <Container>
      {renderList((message, { isLeaving }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItems}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  )
}
