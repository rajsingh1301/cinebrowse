"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth, useWatchlist, useGenreTheme } from "@/app/providers"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MoreVertical, Film } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, logout, userEmail } = useAuth()
  const { watchlist } = useWatchlist()
  const { theme, setTheme } = useGenreTheme()

  const setT = (t: Parameters<typeof setTheme>[0]) => setTheme(t)

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-primary flex items-center gap-2">
          {/* Logo icon before brand name */}
          <Film className="h-5 w-5" aria-hidden="true" />
          <span>CineBrowse</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={cn(
              "px-3 py-2 rounded-md transition hover:bg-accent/60",
              pathname === "/" && "bg-accent text-accent-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href="/watchlist"
            className={cn(
              "px-3 py-2 rounded-md transition hover:bg-accent/60",
              pathname?.startsWith("/watchlist") && "bg-accent text-accent-foreground",
            )}
          >
            Watchlist
            <span className="ml-2 inline-flex items-center justify-center text-xs bg-primary text-primary-foreground rounded px-1.5 py-0.5">
              {watchlist.length}
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Open theme menu">
                Theme: {theme.replace("-", " ")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select genre mood</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setT("default")}>Default</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("sci-fi")}>Sci‑Fi</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("action")}>Action</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("drama")}>Drama</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("fantasy")}>Fantasy</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("thriller")}>Thriller</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("romance")}>Romance</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("adventure")}>Adventure</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isAuthenticated ? (
            <>
              <Button variant="outline" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button onClick={() => router.push("/signup")}>Sign Up</Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">{userEmail}</span>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile three-dot menu */}
        <div className="flex md:hidden items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MoreVertical className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[12rem]">
              {isAuthenticated ? (
                <>
                  <DropdownMenuLabel className="truncate">{userEmail}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              ) : (
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
              )}

              <DropdownMenuItem onSelect={() => router.push("/")}>Home</DropdownMenuItem>

              <DropdownMenuItem onSelect={() => router.push("/watchlist")}>
                <span>Watchlist</span>
                <span className="ml-auto inline-flex items-center justify-center text-xs bg-primary text-primary-foreground rounded px-1.5 py-0.5">
                  {watchlist.length}
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem onSelect={() => router.push("/login")}>Login</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push("/signup")}>Sign Up</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onSelect={logout}>Logout</DropdownMenuItem>
              )}

              {/* Theme selector (mobile) */}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => setT("default")}>Default</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("sci-fi")}>Sci‑Fi</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("action")}>Action</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("drama")}>Drama</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("fantasy")}>Fantasy</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("thriller")}>Thriller</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("romance")}>Romance</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setT("adventure")}>Adventure</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
