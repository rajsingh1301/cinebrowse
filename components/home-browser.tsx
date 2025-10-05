"use client"
import { useMemo, useState } from "react"
import data from "@/data/movies.json"
import type { Movie } from "@/lib/types"
import { HeroBillboard } from "@/components/hero-billboard"
import { RowCarousel } from "@/components/row-carousel"
import { MovieModal } from "@/components/movie-modal"
import { useWatchlist } from "@/app/providers"
import { Button } from "@/components/ui/button"

const PAGE_SIZE = 8

export function HomeBrowser() {
  const movies = data as Movie[]

  const allGenres = useMemo(() => {
    const set = new Set<string>()
    movies.forEach((m) => set.add(m.genre))
    return ["All", ...Array.from(set).sort()]
  }, [movies])

  const [genre, setGenre] = useState<string>("All")
  const [sort, setSort] = useState<"rating-desc" | "rating-asc">("rating-desc")
  const [page, setPage] = useState<number>(1)
  const [selected, setSelected] = useState<Movie | null>(null)

  const { toggleWatchlist, isInWatchlist } = useWatchlist()

  const featured = useMemo(() => {
    return [...movies].sort((a, b) => b.rating - a.rating)[0]
  }, [movies])

  const byGenre = useMemo(() => {
    const map = new Map<string, Movie[]>()
    movies.forEach((m) => {
      const key = m.genre || "Other"
      map.set(key, [...(map.get(key) || []), m])
    })
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [movies])

  const openDetails = (m: Movie) => setSelected(m)
  const closeDetails = () => setSelected(null)

  return (
    <section className="space-y-8">
      {featured && <HeroBillboard movie={featured} onOpenDetails={(m) => setSelected(m)} />}

      <header className="flex flex-col md:flex-row items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-balance">Browse by Genre</h2>
        <div className="flex items-center gap-2">
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value)
              setPage(1)
            }}
            className="border border-border rounded-md bg-background px-3 py-2 text-sm"
            aria-label="Filter by genre"
          >
            {allGenres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="border border-border rounded-md bg-background px-3 py-2 text-sm"
            aria-label="Sort by rating"
          >
            <option value="rating-desc">Rating: High → Low</option>
            <option value="rating-asc">Rating: Low → High</option>
          </select>
          <Button
            variant="outline"
            onClick={() => {
              setGenre("All")
              setSort("rating-desc")
              setPage(1)
            }}
          >
            Reset
          </Button>
        </div>
      </header>

      <div className="space-y-6">
        {byGenre
          .filter(([g]) => genre === "All" || g === genre)
          .map(([g, list]) => {
            const sorted = [...list].sort((a, b) =>
              sort === "rating-desc" ? b.rating - a.rating : a.rating - b.rating,
            )
            return <RowCarousel key={g} title={`${g} Picks`} movies={sorted} onOpenDetails={(m) => setSelected(m)} />
          })}
      </div>

      <MovieModal
        open={!!selected}
        movie={selected}
        onClose={closeDetails}
        onToggleWatchlist={toggleWatchlist}
        isInWatchlist={isInWatchlist}
      />
    </section>
  )
}
