import { NextRequest, NextResponse } from 'next/server';

type RouteParams = {
  params: {
    documentId: string;
  };
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { documentId } = await params;

  return NextResponse.json({
    message: `document-id: ${documentId}`
  });
}
