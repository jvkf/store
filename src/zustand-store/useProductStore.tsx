import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../routes/store/useProductsQuery';

interface ProductWithAmount extends Product {
  amount: number;
}

interface ProductStore {
  cart: ProductWithAmount[];
  addToCart: (product: Product) => () => void;
  increaseAmount: (productId: number) => () => void;
  decreaseAmount: (productId: number) => () => void;
}

const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) => () =>
        set((state) => {
          const productWithAmount = { ...product, amount: 1 };
          return { cart: [...state.cart, productWithAmount] };
        }),
      increaseAmount: (productId) => () =>
        set((state) => ({
          cart: updateProductAmount(state.cart, productId, 1),
        })),
      decreaseAmount: (productId) => () =>
        set((state) => ({
          cart: updateProductAmount(state.cart, productId, -1),
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);

const updateProductAmount = (
  cart: ProductWithAmount[],
  productId: number,
  change: number
) => {
  return cart.reduce((acc, item) => {
    if (item.id === productId) {
      const newAmount = item.amount + change;
      if (newAmount > 0) {
        acc.push({ ...item, amount: newAmount });
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as ProductWithAmount[]);
};

export default useProductStore;
