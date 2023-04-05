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
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Vittor Emanoel</strong>
              <small>instagram</small>
            </div>
            <span>vittore.dev@gmail.com</span>
            <span>(11) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/1212">
              <img src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="deleted" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}

fetch("http://localhost:3001/contacts")
.then(async (response) => {
 const json = await response.json()
  console.log(response)
  console.log(json)
})
.catch((error) => {
  console.log(error)
})


// SOP ==> Same Origin Policy -> Política de mesma origem
// CORS ==> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origem cruzadas
// Origem: protocolo://domínio:porta 