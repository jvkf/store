import { SquareXIcon } from 'lucide-react';
import styled from 'styled-components';
import type { ProductWithAmount } from '../../zustand-store/useProductStore';
import { formatCurrency } from '../Card/Card';

export const Container = styled.article`
  display: flex;
  flex-flow: row nowrap;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  & > * {
    flex-shrink: 0;
  }
`;

const Header = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  flex-grow: 1;
  flex-shrink: 1;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  border: 0;
  background: transparent;

  &:focus-within {
    outline: 1px dotted red;
  }
`;

const Price = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Amount = styled.p`
  font-weight: 600;
`;

export interface CartProductProps {
  product: ProductWithAmount;
  handleDelete: () => void;
}

export default function CartProduct({
  product,
  handleDelete,
}: CartProductProps) {
  return (
    <Container>
      <DeleteBtn onClick={handleDelete}>
        <SquareXIcon />
        <span className="sr-only">Delete product</span>
      </DeleteBtn>
      <Header>{product.title}</Header>
      <Price>{formatCurrency(product.price)}</Price>
      <Amount>{product.amount}</Amount>
    </Container>
  );
}
