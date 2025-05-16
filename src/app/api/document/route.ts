import { NextRequest, NextResponse } from 'next/server';
import { badRequest, internalServerError } from '@/app/api/ApiErrors';
import { db } from '@/misc/Database';
import { Utils } from '@/utils/utils';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.content) {
      return badRequest({ error: 'missing content' });
    }

    const pasteId = await Utils.createId();
    await db.insert('pastes', ['id', 'content'], [pasteId, data.content]);

    return NextResponse.json({
      key: pasteId,
      raw: `/raw/${pasteId}`
    });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return internalServerError();
  }
}
