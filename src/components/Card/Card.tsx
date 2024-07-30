import styled from 'styled-components';
import type { Product } from '../../routes/store/useProductsQuery';
import CartControls from './CartControls';

const ProductBar = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${(props) => props.theme.spacing.small};
  flex: auto;
`;

const CardContainer = styled.article`
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.main};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: box-shadow 200ms ease-in-out;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
`;

const Image = styled.img`
  aspect-ratio: 1;
  max-width: 100%;
  object-fit: contain;
  padding: ${(props) => props.theme.spacing.xlarge};
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
`;

const Price = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  padding-top: ${(props) => props.theme.spacing.small};
`;

const Information = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

export const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <CardContainer>
      <Image src={product.image} alt={product.description} />
      <ProductBar>
        <Information>
          <Title>{product.title}</Title>
          <Price>{formatCurrency(product.price)}</Price>
        </Information>
        <CartControls product={product} />
      </ProductBar>
    </CardContainer>
  );
}
