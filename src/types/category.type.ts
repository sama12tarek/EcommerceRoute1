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