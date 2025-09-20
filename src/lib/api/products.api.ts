







export default async function getProduct() {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`) 
   
    


    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }

    const  {data}  = await res.json();
    return data ;
  } catch (error) {
    console.log("Error in getProduct:", error);
    return []; 
  }
}
