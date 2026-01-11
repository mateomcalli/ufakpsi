import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createClient from './server'

const proxy = async (request: NextRequest) => {
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = await createClient()
  await supabase.auth.getClaims()

  request.cookies.getAll().forEach(cookie => {
    response.cookies.set(cookie.name, cookie.value)
  })

  return response
}

export default proxy