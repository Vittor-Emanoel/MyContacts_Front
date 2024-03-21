import { Container } from "./styles"

import Loader from "../../components/Loader"

import Modal from "../../components/Modal"
import ContactsList from "./components/ContactsList"
import ErrorStatus from "./components/ErrorSttatus"
import Header from "./components/Header"
import InputSearch from "./components/InputSearch"
import useHome from "./useHome"

import EmptyList from "./components/EmptyList"

import SearchNotFound from "./components/SearchNotFound"

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    handleConfirmDeleteContact,
    handleTryAgain,
    handleDeleteContact,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    filteredContacts,
    isDeleteModalVisible,
    hasError,
    contactBeingDeleted,
    handleCloseDeleteModal,
    contacts,
    searchTerm,
    orderBy
  } = useHome()

  const hasContacts = contacts.length > 0
  const isListEmpty = !hasError && !isLoading && !hasContacts
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            orderBy={orderBy}
            filteredContacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
            onToggleOrderBy={handleToggleOrderBy}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            confirmLabel="Deletar"
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Está ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  )
}

// SOP ==> Same Origin Policy -> Política de mesma origem
// CORS ==> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origem cruzadas
// Origem: protocolo://domínio:porta
