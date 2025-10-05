"use client"
import type { Movie } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import Image from "next/image"

type Props = {
  open: boolean
  movie: Movie | null
  onClose: () => void
  onToggleWatchlist: (id: number) => void
  isInWatchlist: (id: number) => boolean
}

export function MovieModal({ open, movie, onClose, onToggleWatchlist, isInWatchlist }: Props) {
  // basic ESC close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open || !movie) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${movie.title} details`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-card text-card-foreground shadow-xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <Button variant="ghost" onClick={onClose} aria-label="Close details">
            Close
          </Button>
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div className="relative w-full h-40 rounded-md overflow-hidden border border-border">
            <Image
              src={
                movie.image ||
                `/placeholder.svg?height=160&width=320&query=${encodeURIComponent(movie.title + " poster") || "/placeholder.svg"}`
              }
              alt={`${movie.title} poster`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </div>
          <p className="text-sm text-muted-foreground">{movie.description}</p>
          <div className="text-sm">
            <div>
              <strong>Type:</strong> {movie.type}
            </div>
            <div>
              <strong>Genre:</strong> {movie.genre}
            </div>
            <div>
              <strong>Rating:</strong> ⭐ {movie.rating.toFixed(1)}
            </div>
            {movie.year && (
              <div>
                <strong>Year:</strong> {movie.year}
              </div>
            )}
          </div>
          <div className="pt-2">
            <Button onClick={() => onToggleWatchlist(movie.id)}>
              {isInWatchlist(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
