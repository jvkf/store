import { useQuery } from '@tanstack/react-query';

export interface Product {
  image: string;
  title: string;
  price: number;
  id: string;
  description: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('There was an error fetching');
  }
  return response.json();
};

export const useProductsQuery = () =>
  useQuery({ queryKey: ['products'], queryFn: () => fetchProducts() });
