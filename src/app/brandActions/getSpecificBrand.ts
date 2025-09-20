'use server';

export default async function getSpecificBrand(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
      method: 'GET',
      cache: 'no-store', // Optional: useful if you always want fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch brand with id ${id}`);
    }

    const payload = await res.json();

    return payload; // ✅ رجّع الداتا بس، مش كل الـ payload
  } catch (error) {
    console.error('Error in getSpecificBrand:', error);
    throw error; // ممكن ترجع null أو ترمي error حسب ما تحب تتعامل معاه
  }
}

