import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction"
import ContactsService from "../../services/ContactsService"
import toast from "../../utils/toast"

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState("")
  const navigate = useNavigate()

  const contactFormRef = useRef(null)

  const { id } = useParams()

  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    const controller = new AbortController()
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
          controller.signal
        )

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact)
          setIsLoading(false)
          setContactName(contact.name)
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }

        safeAsyncAction(() => {
          navigate('/', { replace: true });
          toast({
            type: 'danger',
            text: 'Contato não encontrado!'
          })
        })
      }
    }

    loadContact()

    return () => {
      controller.abort()
    }
  }, [id, safeAsyncAction, navigate])

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact)

      setContactName(contactData.name)

      toast({
        type: "success",
        text: "Contato editado com successo!",
        duration: 3000
      })
    } catch (error) {
      toast({
        type: "danger",
        text: " Ocorreu um erro ao editadar o contato!"
      })
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit
  }
}
