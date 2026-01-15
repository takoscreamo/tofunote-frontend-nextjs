import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

async function proxyRequest(request: NextRequest, path: string[]) {
  const url = `${BACKEND_URL}/api/${path.join('/')}${request.nextUrl.search}`;

  // リクエストヘッダーをコピー
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    // hostヘッダーは除外
    if (key.toLowerCase() !== 'host') {
      headers.set(key, value);
    }
  });

  // リクエストボディを取得
  let body: BodyInit | null = null;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    body = await request.text();
  }

  // バックエンドにリクエストを転送
  const response = await fetch(url, {
    method: request.method,
    headers,
    body,
    credentials: 'include',
  });

  // レスポンスヘッダーをコピー
  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    responseHeaders.set(key, value);
  });

  // レスポンスボディを取得
  const responseBody = await response.text();

  return new NextResponse(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path);
}
