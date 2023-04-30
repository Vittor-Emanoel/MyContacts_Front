import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  Container,
  Header,
  InputSearchContainer,
  ListHeader
} from "./styles"

import Loader from "../../components/Loader"

import arrow from "../../assets/icons/Arrow.svg"
import edit from "../../assets/icons/Edit.svg"
import trash from "../../assets/icons/Trash.svg"

import ContactsService from "../../services/ContactsService"

export default function Home() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  )

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true)

        const contactsList = await ContactsService.listContacts(orderBy)

        setContacts(contactsList)
      } catch (error) {
        console.log("Caiu no catch", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContacts()
  }, [orderBy])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"))
  }

  function handleChangeSearchTerm({ target }) {
    setSearchTerm(target.value)
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquisar contato..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? " contato" : " contatos"}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.categories_name && (
                <small>{contact.categories_name}</small>
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
    </Container>
  )
}

// SOP ==> Same Origin Policy -> Política de mesma origem
// CORS ==> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origem cruzadas
// Origem: protocolo://domínio:porta
