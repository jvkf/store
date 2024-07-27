import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './components/Footer';
import StyledProvider from './StyledProvider';

const queryClient = new QueryClient();

const Container = styled.div`
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledProvider>
        <Container>
          <Outlet />
          <Footer />
        </Container>
      </StyledProvider>
    </QueryClientProvider>
  );
}

export default App;
