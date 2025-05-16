import { redirect } from 'next/navigation';
import { db } from '@/misc/Database';

type PageParams = {
  params: {
    pasteId: string;
  };
};

export default async function Paste({ params }: PageParams) {
  const { pasteId } = await params;

  const data = await db.queryOne<{ content: string }>(`SELECT content FROM pastes WHERE id = '${pasteId}'`);
  if (!data) {
    return redirect('/');
  }

  const content = data.content;

  return <pre>{content}</pre>;
}
