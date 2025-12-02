import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.kaspa-nexus.io';
const API_KEY = process.env.INTERNAL_API_KEY || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit') || '50';
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'marketCap';
  const order = searchParams.get('order') || 'desc';

  try {
    const response = await fetch(
      `${API_BASE}/v1/krc20/tokens?limit=${limit}&page=${page}&sort=${sort}&order=${order}`,
      {
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to fetch tokens' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.items || [], total: data.total || 0 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
