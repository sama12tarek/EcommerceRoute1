
import selectedsProduct from '@/lib/api/selectedProduct';
import React from 'react';
import getRelatedProducts from "@/productCategoryAction/relatedProducts";
import { Product } from '@/types/product.type';

import SingleProduct from '@/app/singleProduct/singleProduct';
type Params = { id: string };





export default async function ProductDetails({ params }:{params: Params}) {
  const { id } = params;
console.log('product ID',id)
  const data = await selectedsProduct(id);
if (!data) { return <div className="text-center text-red-500 mt-8">Products not found.</div>; }
const RelatedProducts = await getRelatedProducts(data.category._id);
console.log('RelatedProducts:', RelatedProducts);

  return (
    
  <div className='flex flex-wrap gap-12 w-[90%] mx-auto justify-center rounded-lg my-10'>
  
     {RelatedProducts?.map((currentProduct: Product) => ( 
       
      <SingleProduct key={currentProduct.id} product={currentProduct} /> 
  
      ))} 
     </div>
    

  );
}


