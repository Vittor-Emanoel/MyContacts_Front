import logo from '../../assets/images/logo.svg';
import { Container } from './styles';

function Header() {
  return (
    <Container>
      <img
        src={logo}
        alt="Logo escrita MyContacts na cor preta e roxa"
        width="201"
      />
    </Container>
  );
}

export default Header;
