import { useState } from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../components/Card/Card';
import { TotalPrice } from '../../components/Cart/CartModal';
import CartProduct from '../../components/Cart/CartProduct';
import Form from '../../components/Form/Form';
import { FormSchema } from '../../components/Form/Schema';
import Header from '../../components/Header';
import Success from '../../components/Success';
import useProductStore, {
  ProductStoreState,
} from '../../zustand-store/useProductStore';
import { Container, Main } from '../store/Store';

const ProductsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) =>
    `${props.theme.spacing.medium} ${props.theme.spacing.xlarge}`};
`;

const ColumnMain = styled(Main)`
  flex-direction: column;
  align-items: stretch;
`;

const CenterDiv = styled.div`
  display: grid;
  place-items: center;
`;

export interface FinishedData extends ProductStoreState {
  formData: FormSchema;
}

export default function Checkout() {
  const [cart, deleteItemFn] = useProductStore((state) => [
    state.cart,
    state.deleteItem,
  ]);
  const [finishedData, setFinishedData] = useState<FinishedData | null>(null);

  const totalPrice = cart.reduce((acc, product) => {
    return (acc += product.amount * product.price);
  }, 0);

  const isCartEmpty = cart.length === 0;

  return (
    <Container>
      <Header showCart={false} />
      <ColumnMain>
        {!isCartEmpty && (
          <>
            <ProductsContainer>
              {cart.map((product) => (
                <CartProduct
                  key={product.id}
                  product={product}
                  handleDelete={deleteItemFn(product.id)}
                />
              ))}
              <TotalPrice>
                <div>Total:</div>
                {formatCurrency(totalPrice)}
              </TotalPrice>
            </ProductsContainer>
            <Form cart={cart} setFinishedData={setFinishedData} />
          </>
        )}
        {isCartEmpty && <CenterDiv>O carrinho está vazio!</CenterDiv>}
        {finishedData !== null && <Success finishedData={finishedData} />}
      </ColumnMain>
    </Container>
  );
}
