"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button variant="outline" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        Prev
      </Button>
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm border border-border hover:bg-accent transition",
              p === currentPage ? "bg-secondary text-secondary-foreground" : "bg-card",
            )}
            aria-current={p === currentPage}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )
}
