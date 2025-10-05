"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/lib/types"
import { useWatchlist } from "@/app/providers"

type Props = {
  movie: Movie
  onOpenDetails: (movie: Movie) => void
}

export function HeroBillboard({ movie, onOpenDetails }: Props) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border">
      <div className="relative h-[42vw] max-h-[420px] min-h-[220px] bg-muted">
        <Image
          src={
            movie.image ||
            `/placeholder.svg?height=420&width=1280&query=${encodeURIComponent(
              `${movie.title || "/placeholder.svg"} cinematic banner`,
            )}`
          }
          alt={`${movie.title} banner`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1280px"
        />
        {/* subtle bottom gradient for legibility without using gradients as primary elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl font-semibold">{movie.title}</h1>
        <p className="max-w-2xl text-sm md:text-base text-muted-foreground line-clamp-3">{movie.description}</p>
        <div className="flex items-center gap-2">
          <Button onClick={() => onOpenDetails(movie)} className="font-medium">
            Play
          </Button>
          <Button
            variant={isInWatchlist(movie.id) ? "destructive" : "outline"}
            onClick={() => toggleWatchlist(movie.id)}
            aria-pressed={isInWatchlist(movie.id)}
          >
            {isInWatchlist(movie.id) ? "Remove from List" : "My List"}
          </Button>
        </div>
      </div>
    </div>
  )
}
