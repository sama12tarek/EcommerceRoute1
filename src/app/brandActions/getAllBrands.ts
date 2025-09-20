export default async function getAllBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    method: "GET",
    cache: "no-store",
  });

  // ✅ تأكد إن الاستجابة ناجحة
  if (!res.ok) {
    const errorText = await res.text(); // نحاول نطبع الرد مهما كان
    console.error("Failed to fetch brands. Response:", errorText);
    throw new Error("Failed to fetch brands");
  }

  const payload = await res.json(); // 👈 دلوقتي نعرف إنها JSON فعلاً
  return payload.data;
}

