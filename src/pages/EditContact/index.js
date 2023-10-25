import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true)

  const {id} = useParams()
  const history = useHistory()

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id)
        console.log(contactData)
        setIsLoading(false)
      } catch (error) {
        history.push('/')
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        })
      }
    }

    loadContact()
  }, [id, history])
  


   function handleSubmit() {
    //

  }

  return (
    <>

    <Loader 
      isLoading={isLoading}
    />
      <PageHeader title="Editar Vittor Emanoel" />

      <ContactForm 
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
}
