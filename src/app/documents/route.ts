import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/misc/Database';
import { Utils } from '@/utils/utils';

export async function POST(request: NextRequest) {
  try {
    const content = await request.text();
    if (!content) {
      return NextResponse.json(
        { error: 'bad request', message: 'no content provided' },
        { status: 400 }
      );
    }

    const pasteId = await Utils.createId();
    await db.insert('pastes', ['id', 'content'], [pasteId, content]);

    return NextResponse.json({
      key: pasteId,
      raw: `/raw/${pasteId}`
    });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { error: 'internal server error', message: 'failed creating paste' },
      { status: 500 }
    );
  }
}
