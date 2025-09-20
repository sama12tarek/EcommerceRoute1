"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner"; // استيراد toast

import getAllBrands from "../brandActions/getAllBrands";

type Brand = {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
};

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      const res = await getAllBrands();
      setBrands(res);
      setLoading(false);
    }

    fetchBrands();
  }, []);

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(keyword.toLowerCase())
  );

  // دالة تعرض toast مع اسم وصورة البراند
  function showBrandToast(brand: Brand) {
    toast(
      <div className="flex items-center gap-3">
        {brand.image && (
          <Image
            src={brand.image}
            alt={brand.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
        <span className="font-semibold">{brand.name}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Brands</h2>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search brand..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="text-center">Loading brands...</p>}

      {/* brands grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((brand) => (
          <Link
            href={`/brands/${brand._id}`}
            key={brand._id}
            className="relative group rounded-xl overflow-hidden shadow hover:shadow-lg transition block"
            onClick={(e) => {
              e.preventDefault(); // نمنع التنقل تلقائي عشان نعرض التوست الأول
              showBrandToast(brand);

              // بعد 500ms نسمح بالتنقل للصفحة
              setTimeout(() => {
                window.location.href = `/brands/${brand._id}`;
              }, 500);
            }}
          >
            {brand.image && (
              <Image
                src={brand.image}
                alt={brand.name}
                className="w-full h-56 object-contain bg-white p-6"
                width={300}
                height={300}
              />
            )}
            {/* footer overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-2 text-center">
              <p className="font-semibold">{brand.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


