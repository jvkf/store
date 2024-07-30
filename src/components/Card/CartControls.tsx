import { useShallow } from 'zustand/react/shallow';
import { Product } from '../../routes/store/useProductsQuery';
import useProductStore from '../../zustand-store/useProductStore';
import AddCartButton from './AddCartButton';
import CartInput from './CartInput';

interface CartControlsProps {
  product: Product;
}

export default function CartControls({ product }: CartControlsProps) {
  const handleAddToCart = useProductStore.getState().addToCart(product);
  const handleIncreaseAmount = useProductStore
    .getState()
    .increaseAmount(product.id);
  const handleDecreaseAmount = useProductStore
    .getState()
    .decreaseAmount(product.id);
  const productOnCart = useProductStore(
    useShallow((state) => state.cart.find((p) => p.id === product.id))
  );

  if (!productOnCart) {
    return <AddCartButton onClick={handleAddToCart} />;
  }

  return (
    <CartInput
      amount={productOnCart.amount}
      onIncreaseClick={handleIncreaseAmount}
      onDecreaseClick={handleDecreaseAmount}
    />
  );
}
