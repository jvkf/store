import styled from 'styled-components';
import { formatCurrency } from '../../components/Card/Card';
import { TotalPrice } from '../../components/Cart/CartModal';
import CartProduct from '../../components/Cart/CartProduct';
import Form from '../../components/Form/Form';
import Header from '../../components/Header';
import useProductStore from '../../zustand-store/useProductStore';
import { Container, Main } from '../store/Store';

const ProductsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 2rem;
`;

const ColumnMain = styled(Main)`
  flex-direction: column;
  align-items: stretch;
`;

export default function Checkout() {
  const [cart, deleteItemFn] = useProductStore((state) => [
    state.cart,
    state.deleteItem,
  ]);

  const totalPrice = cart.reduce((acc, product) => {
    return (acc += product.amount * product.price);
  }, 0);

  return (
    <Container>
      <Header showCart={false} />
      <ColumnMain>
        <ProductsContainer>
          {cart.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              handleDelete={deleteItemFn(product.id)}
            />
          ))}
          {totalPrice !== 0 && (
            <TotalPrice>
              <div>Total:</div>
              {formatCurrency(totalPrice)}
            </TotalPrice>
          )}
        </ProductsContainer>
        <Form cart={cart} />
      </ColumnMain>
    </Container>
  );
}
