import { ThemeProvider } from "styled-components";

//Styles
import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";

//Component Styled
import { Container } from "./styles";

//Componentes
import ContactsLists from "../ContactsLists";
import Header from "../Header";


const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      
        <Container>
          <Header />
          <ContactsLists />
        </Container>
    </ThemeProvider>
  );
}

export default App;
