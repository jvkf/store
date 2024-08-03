import { ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
import useProductStore from '../../zustand-store/useProductStore';
import CartModal from './CartModal';

const HeaderButton = styled.button`
  background-color: white;
  position: relative;
  border: 1px solid white;
  aspect-ratio: 1;
  border-radius: 100%;
  cursor: pointer;
  transition: box-shadow 100ms ease-in;
  box-shadow: 0 0 15px 6px rgba(255, 255, 255, 0.3);

  &:hover {
    box-shadow: 0 0 12px 6px rgba(255, 255, 255, 0.5);
  }
`;

const HeaderContainer = styled.div`
  text-align: right;
  position: relative;
`;

const CartNumber = styled.span`
  position: absolute;
  right: -5px;
  bottom: -20px;
  width: 26px;
  height: 26px;
  background-color: white;
  border-radius: 100%;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CartBtn() {
  const numberOfProducts = useProductStore((state) => state.cart).reduce(
    (acc, cv) => {
      return (acc += cv.amount);
    },
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <HeaderContainer>
      <HeaderButton onClick={handleCartClick}>
        <span className="sr-only">Clique para ver o carrinho</span>
        <ShoppingBasket />
        {numberOfProducts !== 0 && (
          <CartNumber aria-label="Número de itens no carrinho">
            {numberOfProducts}
          </CartNumber>
        )}
      </HeaderButton>
      <CartModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </HeaderContainer>
  );
}
