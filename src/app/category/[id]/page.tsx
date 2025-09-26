
// app/category/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Subcategory {
  _id: string;
  name: string;
  category: string;
  slug?: string;
  createdAt?: string;
}

const SubcategoriesPage = () => {
  const params = useParams();
  const categoryId = params.id as string;

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories");
        const data = await res.json();
        const filtered = data.data.filter((sub: Subcategory) => sub.category === categoryId);
        setSubcategories(filtered);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);

  if (loading) {
    return <div className="text-center mt-10">Loading subcategories...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Subcategories</h1>
      {subcategories.length === 0 ? (
        <p className="text-gray-500">No subcategories found for this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {subcategories.map((sub) => (
            <div key={sub._id} className="p-4 border rounded bg-sky-400 hover:bg-sky-300 transition">
              {sub.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoriesPage;
