import AllProducts from './_components/allProducts/allProducts';
import MainSlider from './_components/mainSlider/mainSlider';
import CategorySlider from './_components/categoreSlider/categorySlider';
export const dynamic = "force-dynamic";




export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider/>
      <AllProducts/>
    </>
  );
}

