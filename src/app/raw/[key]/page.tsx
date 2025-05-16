import { db } from '@/misc/Database';
import { redirect } from 'next/navigation';

type PageParams = {
  params: {
    key: string;
  };
};

export default async function Paste({ params }: PageParams) {
  const { key = '' } = await params;

  const [pasteId] = key.split('.');

  const data = await db.queryOne<{ content: string }>(
    `SELECT content FROM pastes WHERE id = '${pasteId}'`
  );

  if (!data) {
    return redirect('/');
  }

  return <pre>{data.content}</pre>;
}
