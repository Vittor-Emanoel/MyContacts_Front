import logo from '../../assets/images/logo.svg';
import { Container, InputSearchContainer } from "./styles";

const Header = () => {
  return (
    <Container>
      <img src={logo} alt="Logo escrita MyContacts na cor preta e roxa" width="201"/>

      <InputSearchContainer>
        <input 
        type="text" 
        placeholder='Pesquisar contato...'/>

      </InputSearchContainer>
    </Container>
  )
}

export default Header;