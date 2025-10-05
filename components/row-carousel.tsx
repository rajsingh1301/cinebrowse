"use client"

import type { Movie } from "@/lib/types"
import { MovieTile } from "./movie-tile"

type Props = {
  title: string
  movies: Movie[]
  onOpenDetails: (movie: Movie) => void
}

export function RowCarousel({ title, movies, onOpenDetails }: Props) {
  return (
    <section aria-label={title} className="space-y-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1" style={{ scrollbarWidth: "thin" }}>
        {movies.map((m) => (
          <div key={m.id} className="snap-start">
            <MovieTile movie={m} onOpenDetails={onOpenDetails} />
          </div>
        ))}
      </div>
    </section>
  )
}
