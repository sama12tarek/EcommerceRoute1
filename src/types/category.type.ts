
// src/types/category.type.ts

export interface Daum {
  id: string;
  title: string;
  description: string;
  // Add other properties that Daum should have
}

export interface Root {
  results: number;
  metadata: Metadata;
  data: Daum[]; // Now Daum is correctly defined
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Root {
  results: number
  metadata: Metadata
  data: Daum[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface CategoryType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}