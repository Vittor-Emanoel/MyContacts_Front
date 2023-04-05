import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Container,
  Header,
  InputSearchContainer,
  ListContainer,
} from './styles';

import arrow from '../../assets/icons/Arrow.svg';
import edit from '../../assets/icons/Edit.svg';
import trash from '../../assets/icons/Trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([])
 
  useEffect(() => {
    fetch("http://localhost:3001/contacts")
        .then(async (response) => {
        const json = await response.json()
        setContacts(json)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  console.log(contacts);
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>{contacts.length} 
        {contacts.length === 1 ? " contato" : " contatos"}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

       {contacts.map((contact) => (
         <Card key={contact.id}>
         <div className="info">
           <div className="contact-name">
             <strong>{contact.name}</strong>
             {contact.category_name && (
              <small>{contact.category_name}</small>
             )}
           </div>
           <span>{contact.email}</span>
           <span>{contact.phone}</span>
         </div>

         <div className="actions">
           <Link to={`/edit/${contact.id}`}>
             <img src={edit} alt="edit" />
           </Link>
           <button type="button">
             <img src={trash} alt="deleted" />
           </button>
         </div>
       </Card>
       ))}
      </ListContainer>
    </Container>
  );
}




// SOP ==> Same Origin Policy -> Política de mesma origem
// CORS ==> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origem cruzadas
// Origem: protocolo://domínio:porta 