export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground flex items-center justify-center">
        <p className="text-pretty ">&copy; {new Date().getFullYear()} CineBrowse</p>
     
      </div>
    </footer>
  )
}
