import { redirect } from 'next/navigation';
import { db } from '@/misc/Database';
import { SyntaxHighlight } from '@/components/syntax-highlight';
import { Footer } from '@/components/footer';

type PageParams = {
  params: {
    key: string;
  };
};

export default async function Paste({ params }: PageParams) {
  const { key = '' } = await params;

  const [pasteId, extension] = key.split('.');

  const data = await db.queryOne<{ content: string }>(
    `SELECT content FROM pastes WHERE id = '${pasteId}'`
  );

  if (!data) {
    return redirect('/');
  }

  return (
    <>
      <SyntaxHighlight content={data.content} extension={extension} />
      <Footer />
    </>
  );
}
