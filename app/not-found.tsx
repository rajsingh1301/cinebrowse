export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-semibold mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground">The page you requested does not exist.</p>
      <a href="/" className="inline-block mt-4 underline">
        Go back home
      </a>
    </div>
  )
}
