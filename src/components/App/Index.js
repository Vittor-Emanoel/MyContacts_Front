import { ThemeProvider } from "styled-components";

//Styles
import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";
import Header from "../Header";

//Component Styled
import { Container } from "./styles";

//Componentes


const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      
        <Container>
          <Header />
        </Container>
    </ThemeProvider>
  );
}

export default App;
