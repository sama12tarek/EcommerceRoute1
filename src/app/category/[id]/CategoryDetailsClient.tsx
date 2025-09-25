
// app/category/[id]/CategoryDetailsClient.tsx
'use client';

import { useEffect, useState } from 'react';
import SingleProduct from '@/app/singleProduct/singleProduct';
import { ProductType } from '@/types/product.type';

type Props = { id: string };

export default function CategoryDetailsClient({ id }: Props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategory(id: string) {
      if (!id) {
        setError('Invalid category ID');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
        const data = await res.json();

        if (data.status === 'success') {
          setProducts(data.data);
          if (data.data.length > 0) {
            setCategoryName(data.data[0].category.name);
          }
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch {
        setError('Error fetching category');
      } finally {
        setLoading(false);
      }
    }

    fetchCategory(id);
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (products.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product: ProductType) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
