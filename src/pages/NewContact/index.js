import { useRef } from "react"
import { useHistory } from "react-router-dom"
import ContactForm from "../../components/ContactForm"
import PageHeader from "../../components/PageHeader"
import ContactsService from "../../services/ContactsService"
import toast from "../../utils/toast"

export default function NewContact() {
  const contactFormRef = useRef(null)
  const history = useHistory()

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact)

      contactFormRef.current.resetFields()

      toast({
        type: "success",
        text: " Contato cadastrado com sucesso!",
        duration: 3000
      })

      history.push("/")
    } catch (error) {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao cadastrar o contato!"
      })
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  )
}
