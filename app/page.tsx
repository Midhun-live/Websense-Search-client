import { SearchInterface } from '@/components/search-interface'

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Website Content Search</h1>
        <p className="text-muted-foreground">Search through website content with precision</p>
      </div>
      <SearchInterface />
    </main>
  )
}