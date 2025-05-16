import { NextRequest, NextResponse } from 'next/server';
import { internalServerError } from '@/app/api/ApiErrors';
import { db } from '@/misc/Database';
import { Utils } from '@/utils/utils';

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();

    const pasteId = Utils.createId();
    await db.insert('pastes', ['id', 'content'], [pasteId, content]);

    return NextResponse.json({
      id: pasteId
    });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return internalServerError();
  }
}
