export interface IPost {
  id: string
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  date: number
  createdAt: string
  updatedAt: string
  published: boolean
  url: string
  path: string
}
