import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import useProductStore from '../../zustand-store/useProductStore';
import CartProduct from './CartProduct';

const Modal = styled.dialog`
  top: calc(100% + 20px);
  left: auto;
  right: 0;
  text-align: left;
  bottom: auto;
  background-color: ${(props) => props.theme.colors.light};
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  width: 85vw;
  max-width: 500px;
  max-height: 60vh;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.xlarge} 0.7rem;
`;

const Header = styled.h3`
  border-bottom: 1px solid black;
  padding-bottom: ${(props) => props.theme.spacing.xsmall};
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const CloseButton = styled.button`
  appearance: none;
  cursor: pointer;
  background: transparent;
  border: 1px solid black;
  position: absolute;
  right: 10px;
  top: 10px;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.light};
  }
`;

interface CartModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CartModal({ isOpen, setIsOpen }: CartModalProps) {
  const [cart, deleteItemFn] = useProductStore((state) => [
    state.cart,
    state.deleteItem,
  ]);

  return (
    <Modal open={isOpen}>
      <Header>Carrinho</Header>
      <CloseButton onClick={() => setIsOpen((prev) => !prev)}>
        Fechar
      </CloseButton>
      {cart.map((product) => (
        <CartProduct
          product={product}
          handleDelete={deleteItemFn(product.id)}
          key={product.id}
        />
      ))}
    </Modal>
  );
}
