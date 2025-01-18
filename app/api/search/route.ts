import { NextResponse } from 'next/server'
import { z } from 'zod'

const searchSchema = z.object({
  url: z.string().url(),
  query: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url, query } = searchSchema.parse(body)

    const backendUrl = 'http://localhost:8000'

    const response = await fetch(`${backendUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, query }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Backend error:', errorData)
      throw new Error(errorData.detail || `Backend failed with status ${response.status}`)
    }

    const data = await response.json()
    
    if (!Array.isArray(data)) {
      console.error('Invalid backend response:', data)
      throw new Error('Invalid response format from backend')
    }

    return NextResponse.json({ results: data })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to perform search' },
      { status: 500 }
    )
  }
}

