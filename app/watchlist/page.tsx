"use client"
import data from "@/data/movies.json"
import type { Movie } from "@/lib/types"
import { useWatchlist } from "@/app/providers"
import { MovieCard } from "@/components/movie-card"
import { MovieModal } from "@/components/movie-modal"
import { useMemo, useState } from "react"

export default function WatchlistPage() {
  const movies = data as Movie[]
  const { watchlist, toggleWatchlist, isInWatchlist } = useWatchlist()
  const [selected, setSelected] = useState<Movie | null>(null)

  const savedMovies = useMemo(() => movies.filter((m) => watchlist.includes(m.id)), [movies, watchlist])

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Your Watchlist</h1>
        <p className="text-sm text-muted-foreground">Items you’ve added are saved in your browser.</p>
      </header>

      {savedMovies.length === 0 ? (
        <p className="text-muted-foreground">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedMovies.map((m) => (
            <MovieCard key={m.id} movie={m} onOpenDetails={(mm) => setSelected(mm)} />
          ))}
        </div>
      )}

      <MovieModal
        open={!!selected}
        movie={selected}
        onClose={() => setSelected(null)}
        onToggleWatchlist={toggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
    </section>
  )
}
