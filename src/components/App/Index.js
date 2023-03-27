import { ThemeProvider } from 'styled-components';

// Styles
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

// Component Styled
import { Container } from './styles';

// Componentes
import Routes from '../../Routes';
import Header from '../Header';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
