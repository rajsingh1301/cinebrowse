"use client"

import Image from "next/image"
import type { Movie } from "@/lib/types"
import { useWatchlist } from "@/app/providers"
import { Button } from "@/components/ui/button"

type Props = {
  movie: Movie
  onOpenDetails: (movie: Movie) => void
}

export function MovieTile({ movie, onOpenDetails }: Props) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  return (
    <div className="group relative w-[60vw] sm:w-[42vw] md:w-[30vw] lg:w-[18vw]">
      <div
        className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-muted"
        onClick={() => onOpenDetails(movie)}
        aria-label={`Open details for ${movie.title}`}
        role="button"
      >
        <Image
          src={
            movie.image ||
            `/placeholder.svg?height=270&width=480&query=${encodeURIComponent(
              `${movie.title || "/placeholder.svg"} widescreen still`,
            )}`
          }
          alt={`${movie.title} still`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 60vw, 18vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2">
        <div className="rounded-md bg-background/70 backdrop-blur px-2 py-2 border border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium truncate pr-2">{movie.title}</p>
            <span className="text-xs text-muted-foreground">⭐ {movie.rating.toFixed(1)}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Button size="sm" onClick={() => onOpenDetails(movie)}>
              Play
            </Button>
            <Button
              size="sm"
              variant={isInWatchlist(movie.id) ? "destructive" : "outline"}
              onClick={() => toggleWatchlist(movie.id)}
              aria-pressed={isInWatchlist(movie.id)}
            >
              {isInWatchlist(movie.id) ? "Remove" : "My List"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
