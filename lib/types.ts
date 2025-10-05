export type MediaType = "Movie" | "Series" | "Anime"

export interface Movie {
  id: number
  title: string
  description: string
  genre: string
  rating: number // 0 - 10
  type: MediaType
  year?: number
  image?: string
}
