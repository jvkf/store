import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductWithAmount } from '../zustand-store/useProductStore';
import { formatCurrency } from './Card/Card';
import { FinishBtn } from './Cart/CartModal';
import { FormSchema } from './Form/Schema';

const Dialog = styled.dialog`
  inset: unset;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Backdrop = styled.div`
  position: absolute;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Paragraph = styled.p`
  padding: ${(props) => props.theme.spacing.medium} 0;
`;

const Bold = styled.span`
  font-weight: 600;
`;

export interface SuccessProps {
  finishedData: {
    formData: FormSchema;
    cart: ProductWithAmount[];
  };
}

export default function Success({
  finishedData: { formData, cart },
}: SuccessProps) {
  return (
    <>
      <Dialog open aria-live="polite">
        <Paragraph>
          Parabéns <Bold>{formData.fullName}</Bold>! Compra confirmada com
          sucesso. Estes são seus produtos:
        </Paragraph>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.amount}x {product.title}
            </li>
          ))}
        </ul>
        <Paragraph>
          O valor total da compra foi de{' '}
          <Bold>
            {formatCurrency(
              cart.reduce((acc, p) => (acc += p.price * p.amount), 0)
            )}
          </Bold>{' '}
          pago com o cartão final {formData.ccNumber.toString().slice(-4)}.
        </Paragraph>
        <FinishBtn as={Link} to={'/'}>
          Finalizar
        </FinishBtn>
      </Dialog>
      <Backdrop />
    </>
  );
}
