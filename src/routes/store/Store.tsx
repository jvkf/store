import styled from 'styled-components';
import Card from '../../components/Card/Card';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import { useProductsQuery, type Product } from './useProductsQuery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.large};
  padding: ${(props) => props.theme.spacing.medium};
`;

function Store() {
  const query = useProductsQuery();

  return (
    <Container>
      <Header showCart={true} />
      <Main>
        {query.isPending && <Spinner />}
        {query.error && 'Erro procurando produtos'}
        {query.data && (
          <Grid>
            {query.data.map((product: Product) => (
              <Card key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </Main>
    </Container>
  );
}

export default Store;
