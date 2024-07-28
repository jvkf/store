import styled from 'styled-components';
import type { Product } from '../../routes/store/useProductsQuery';

const Information = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${(props) => props.theme.spacing.small};
`;

const CardContainer = styled.article`
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.main};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
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
`;

export default function Card({ product }: { product: Product }) {
  return (
    <CardContainer>
      <Image src={product.image} alt={product.description} />
      <Information>
        <div>
          <Title>{product.title}</Title>
          <Price>{product.price}</Price>
        </div>
        {/* TODO: addbTn */}
      </Information>
    </CardContainer>
  );
}
