import { useEffect, useMemo, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  Container,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  EmptyListContainer,
  SearchNotFoundContainer
} from "./styles"

import Button from "../../components/Button"
import Loader from "../../components/Loader"

import arrow from "../../assets/icons/Arrow.svg"
import edit from "../../assets/icons/Edit.svg"
import trash from "../../assets/icons/Trash.svg"
import sad from "../../assets/images/sad.svg"
import emptyBox from "../../assets/images/empty-box.svg"
import magnifierQuestion from "../../assets/images/magnifier-question.svg"

import ContactsService from "../../services/ContactsService"

export default function Home() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  )

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      // const contactsList = []
      const contactsList = await ContactsService.listContacts(orderBy)

      setHasError(false)
      setContacts(contactsList)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"))
  }
  function handleChangeSearchTerm({ target }) {
    setSearchTerm(target.value)
  }

  function handleTryAgain() {
    loadContacts()
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}
      <Header
        justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError
            ? "flex-end"
            : contacts.length > 0
            ? "space-between"
            : "center"
        }
        hasError={hasError}
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? " contato" : " contatos"}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="EmptyBox" />

              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão
                <strong>”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="MagnifierQuestion" />
              <span>
                Nenhum resultado foi encontrado para{" "}
                <strong>{searchTerm}</strong>
              </span>
            </SearchNotFoundContainer>
          )}

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
        </>
      )}
    </Container>
  )
}

// SOP ==> Same Origin Policy -> Política de mesma origem
// CORS ==> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origem cruzadas
// Origem: protocolo://domínio:porta
