"use client"
import Image from "next/image"
import Link from "next/link"
import type { Movie } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useWatchlist } from "@/app/providers"
import { useState } from "react"

type Props = {
  movie: Movie
  onOpenDetails?: (movie: Movie) => void
}

export function MovieCard({ movie, onOpenDetails }: Props) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const [flipped, setFlipped] = useState(false)
  const toggleFlipped = () => setFlipped((f) => !f)

  return (
    <Card className="overflow-hidden [perspective:1000px]">
      <div
        className="cursor-pointer"
        onClick={toggleFlipped}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleFlipped()
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={flipped}
        aria-label={`Toggle details for ${movie.title}`}
      >
        <div
          className="relative h-80 [transform-style:preserve-3d] transition-transform duration-500 ease-out will-change-transform"
          style={flipped ? { transform: "rotateY(180deg)" } : undefined}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <div className="relative w-full h-full bg-muted">
              <Image
                src={movie.image || `/placeholder.svg?height=320&width=384&query=movie poster for ${movie.title}`}
                alt={`${movie.title} poster`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
                <CardTitle className="text-base text-foreground text-pretty">{movie.title}</CardTitle>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="mr-2">{movie.type}</span> • <span className="ml-2">{movie.genre}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden]" style={{ transform: "rotateY(180deg)" }}>
            <div className="flex h-full flex-col justify-between bg-card p-4">
              <div>
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-base text-foreground">{movie.title}</CardTitle>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="mr-2">{movie.year ?? "N/A"}</span> • <span className="ml-2">{movie.genre}</span>
                  </div>
                </CardHeader>
                <div className="text-sm text-muted-foreground">
                  <p className="max-h-28 overflow-hidden">{movie.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isInWatchlist(movie.id) ? "destructive" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWatchlist(movie.id)
                  }}
                  aria-pressed={isInWatchlist(movie.id)}
                >
                  {isInWatchlist(movie.id) ? "Remove" : "Add"} Watchlist
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View details for ${movie.title}`}
                >
                  <Link href={`/title/${movie.id}`}>Details</Link>
                </Button>
                {onOpenDetails && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenDetails(movie)
                    }}
                    aria-label="Open quick view"
                  >
                    Quick View
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
