"use client"
import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
  userEmail: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within Providers")
  return ctx
}

type WatchlistContextType = {
  watchlist: number[]
  addToWatchlist: (id: number) => void
  removeFromWatchlist: (id: number) => void
  toggleWatchlist: (id: number) => void
  isInWatchlist: (id: number) => boolean
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error("useWatchlist must be used within Providers")
  return ctx
}

type GenreTheme = "default" | "sci-fi" | "action" | "drama" | "fantasy" | "thriller" | "romance" | "adventure"

type ThemeContextType = {
  theme: GenreTheme
  setTheme: (t: GenreTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useGenreTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useGenreTheme must be used within Providers")
  return ctx
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Auth (mock frontend-only)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // hydrate from localStorage (mock)
    const storedAuth = localStorage.getItem("auth:isAuthenticated")
    const storedEmail = localStorage.getItem("auth:email")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
      setUserEmail(storedEmail)
    }
  }, [])

  const login = (email: string) => {
    setIsAuthenticated(true)
    setUserEmail(email)
    localStorage.setItem("auth:isAuthenticated", "true")
    localStorage.setItem("auth:email", email)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserEmail(null)
    localStorage.removeItem("auth:isAuthenticated")
    localStorage.removeItem("auth:email")
  }

  const authValue = useMemo<AuthContextType>(
    () => ({ isAuthenticated, login, logout, userEmail }),
    [isAuthenticated, userEmail],
  )

  // Watchlist persisted in localStorage
  const [watchlist, setWatchlist] = useState<number[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("watchlist")
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored))
      } catch {
        setWatchlist([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (id: number) => setWatchlist((prev) => (prev.includes(id) ? prev : [...prev, id]))

  const removeFromWatchlist = (id: number) => setWatchlist((prev) => prev.filter((x) => x !== id))

  const toggleWatchlist = (id: number) =>
    setWatchlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const isInWatchlist = (id: number) => watchlist.includes(id)

  const watchlistValue = useMemo<WatchlistContextType>(
    () => ({ watchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist, isInWatchlist }),
    [watchlist],
  )

  const [theme, setTheme] = useState<GenreTheme>("default")

  useEffect(() => {
    const stored = localStorage.getItem("theme:genre") as GenreTheme | null
    if (stored) setTheme(stored)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("theme:genre", theme)
    } catch {}
    const root = document.documentElement
    const themes = [
      "theme-default",
      "theme-sci-fi",
      "theme-action",
      "theme-drama",
      "theme-fantasy",
      "theme-thriller",
      "theme-romance",
      "theme-adventure",
    ]
    themes.forEach((c) => root.classList.remove(c))
    root.classList.add(`theme-${theme}`)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AuthContext.Provider value={authValue}>
        <WatchlistContext.Provider value={watchlistValue}>{children}</WatchlistContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}
