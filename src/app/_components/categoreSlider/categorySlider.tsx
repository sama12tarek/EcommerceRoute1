import allCategory from '@/lib/api/Get All Categories';
import CategorySwiper from './../categorySwipper/categorySwiper';

export default async function CategorySlider() {
  const  data  = await allCategory();
console.log('allCategory result:', data);
  return (
    <>

     <CategorySwiper data={data}/>
    </>

  );
}


