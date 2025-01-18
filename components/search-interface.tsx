'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchResult {
  title: string
  content: string
  html: string
  path: string
  matchPercentage: number
}

export function SearchInterface() {
  const [url, setUrl] = useState('')
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState('')
  const [isBackendAvailable, setIsBackendAvailable] = useState(true)

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch('/api/health')
        setIsBackendAvailable(response.ok)
      } catch (err) {
        console.error('Backend health check failed:', err)
        setIsBackendAvailable(false)
        setError('Backend service is not available. Please ensure the server is running.')
      }
    }
    checkBackend()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setResults([])

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, query }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Search failed with status ${response.status}`)
      }

      if (!Array.isArray(data.results)) {
        throw new Error('Invalid response format: results is not an array')
      }

      setResults(data.results)
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to highlight matched text
  const highlightMatch = (text: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark>
        : part
    )
  }

  return (
    <div className="space-y-8">
      {!isBackendAvailable && (
        <div className="p-4 text-amber-600 bg-amber-50 rounded-md mb-4">
          Backend service is not available. Please ensure the server is running.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="flex-1"
            />
          </div>
          <Input
            type="text"
            placeholder="Enter your search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || !isBackendAvailable}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {error && (
        <div className="p-4 text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {results.length === 0 && !isLoading && !error && query && (
        <div className="p-4 text-muted-foreground bg-muted rounded-md">
          No exact matches found for "{query}"
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Search Results ({results.length} match{results.length !== 1 ? 'es' : ''})
          </h2>
          {results.map((result, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{result.title}</h3>
                  <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                    {result.matchPercentage}% match
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Path: {result.path}
                </p>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content">
                    <div className="mt-2 p-2 bg-muted rounded-md text-sm">
                      {highlightMatch(result.content)}
                    </div>
                  </TabsContent>
                  <TabsContent value="html">
                    <pre className="mt-2 p-2 bg-muted rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                      {result.html}
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

