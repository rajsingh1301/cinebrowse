import { notFound } from "next/navigation"
import Image from "next/image"
import type { Movie } from "@/lib/types"

async function getMovieById(id: string): Promise<Movie | undefined> {
  const data = (await import("@/data/movies.json")).default as Movie[]
  return data.find((m) => String(m.id) === id)
}

export default async function TitlePage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id)
  if (!movie) return notFound()

  const poster =
    movie.image || `/placeholder.svg?height=640&width=480&query=${encodeURIComponent(`${movie.title} poster`)}`

  return (
    <main className="min-h-dvh">
      {/* Hero section */}
      <section className="relative w-full">
        <div className="relative h-[56svh] md:h-[60svh] lg:h-[70svh] bg-muted">
          {/* Using poster as a simple backdrop fallback */}
          <Image
            src={poster || "/placeholder.svg"}
            alt={`${movie.title} poster backdrop`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0">
            <div className="container mx-auto h-full px-4 md:px-8">
              <div className="flex h-full max-w-3xl flex-col justify-end gap-4 pb-8">
                <h1 className="text-pretty text-3xl font-bold md:text-5xl lg:text-6xl">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-foreground/80">
                  {movie.year && <span>{movie.year}</span>}
                  <span className="rounded bg-primary/15 px-2 py-1 text-primary">
                    {movie.type} • {movie.genre}
                  </span>
                  <span className="rounded border border-border px-2 py-1">⭐ {movie.rating.toFixed(1)}</span>
                </div>
                {movie.description && (
                  <p className="max-w-2xl text-pretty text-sm leading-relaxed text-foreground/80 md:text-base">
                    {movie.description}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-3">
                  <button
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    aria-label="Play"
                  >
                    Play
                  </button>
                  <a
                    href="/watchlist"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-4 py-2 text-sm font-semibold hover:bg-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    aria-label="Go to Watchlist"
                  >
                    My List
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-12 md:px-8">
        {/* Poster (sticky on md+) */}
        <aside className="order-2 md:order-1 md:col-span-3">
          <div className="sticky top-24 hidden md:block">
            <div className="overflow-hidden rounded-md border border-border bg-muted">
              <Image
                src={poster || "/placeholder.svg"}
                alt={`${movie.title} poster`}
                width={600}
                height={900}
                sizes="(min-width: 768px) 25vw, 0px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </aside>

        {/* Details */}
        <article className="order-1 md:order-2 md:col-span-9">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold md:text-2xl">About</h2>
              {movie.description ? (
                <p className="mt-2 max-w-prose text-pretty leading-relaxed text-foreground/85">{movie.description}</p>
              ) : (
                <p className="mt-2 text-foreground/70">No description available.</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-md border border-border p-4">
                <div className="text-sm text-foreground/60">Release Year</div>
                <div className="mt-1 text-base font-semibold">{movie.year ?? "—"}</div>
              </div>
              <div className="rounded-md border border-border p-4">
                <div className="text-sm text-foreground/60">Type</div>
                <div className="mt-1 text-base font-semibold">{movie.type}</div>
              </div>
              <div className="rounded-md border border-border p-4">
                <div className="text-sm text-foreground/60">Rating</div>
                <div className="mt-1 text-base font-semibold">⭐ {movie.rating.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
