import { NextRequest, NextResponse } from 'next/server';
import { internalServerError } from '@/app/api/ApiErrors';
import { db } from '@/misc/Database';
import { notFound } from '@/app/api/ApiErrors';

type RouteParams = {
  params: {
    pasteId: string;
  };
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { pasteId } = await params;

    const data = await db.queryOne<{ content: string }>(`SELECT content FROM pastes WHERE id = '${pasteId}'`);
    if (!data) {
      return notFound({ message: `no paste found with id ${pasteId}` });
    }

    const content = data.content;

    return NextResponse.json({
      content
    });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return internalServerError();
  }
}
