


export const revalidate =0;

import SingleProduct from '@/app/singleProduct/singleProduct';
import { Product } from '@/types/product.type';
import getProduct from '@/lib/api/products.api';



export default async  function ProductsPage() {

    const data = await getProduct();
  

  return (
    <div className="container my-12 w-[80%] mx-auto">
      <div className="flex flex-wrap gap-4 p-4 justify-evenly">
        {data.map((product:Product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

}


/*

import React from 'react';
import getProduct from '@/lib/api/products.api';
import SingleProduct from '../singleProduct/singleProduct';
import { ProductType } from '@/types/product.type';

export default async function Products() {
  const data = await getProduct();

  return (
    <>
  
    <div className='container my-12 w-[80%] mx-auto'>

      <div className='flex flex-wrap gap-4 p-4 justify-evenly'>
        {data.map((product:ProductType) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
    </>
  );
}

export default function AllProducts({ products }: { products: ProductType[] }) {
  return (
    <div className="container my-12 w-[80%] mx-auto">
      <div className="flex flex-wrap gap-4 p-4 justify-evenly">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
*/
