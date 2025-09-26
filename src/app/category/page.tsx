"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ دي المهمة

// Category Type
export interface Category {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
  createdAt?: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Hook بتاع الراوتر

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-600"></div>
      </div>
    );
  }

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`); // ✅ هنا بيروح للصفحة الجديدة
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className="border p-4 rounded text-center font-medium hover:bg-blue-400 transition"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;


