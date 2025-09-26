



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import { Product } from './../../types/product.type';
import AddBtn from '@/app/_components/AddBtn/AddBtn';
import AddChicklistIcon from '@/app/_components/addChicklistIcon/addChicklistIcon';
export default function SingleProduct({ product }: { product: Product }) {


  return (
    <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/4'>
      <Card className='gap-2 p-2'>
        <Link href={`/products/${product.id}`}>
          <CardHeader>
            <CardTitle className="text-sm line-clamp-1">{product.brand.name}</CardTitle>
            <CardDescription>{product.category.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={100}
              height={100}
              className="w-full h-40 object-cover rounded"
            />
            <p>{product.title}</p>
          </CardContent>
        </Link>

        <CardFooter className="flex flex-col gap-2">
          <div className='flex justify-between items-center w-full px-1'>
            <p className='font-semibold text-sm text-gray-800'>
              {product.price} EGP
            </p>
            <div className='flex items-center gap-1 text-yellow-500 text-sm justify-between'>
              <i className='fas fa-star'></i>
              <span className='text-gray-700'>{product.ratingsAverage}</span>

              <AddChicklistIcon productId={product.id} />



            </div>
          </div>

            
        </CardFooter>
          <AddBtn id={product.id}/>

      </Card>
    </div>
  );
}


