import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const backendUrl = "http://localhost:8000"
    const response = await fetch(`${backendUrl}/health`)
    
    if (!response.ok) {
      throw new Error(`Backend health check failed with status ${response.status}`)
    }
    
    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({ status: 'error', message: 'Backend is not available' }, { status: 503 })
  }
}

