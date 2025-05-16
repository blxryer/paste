import { redirect } from 'next/navigation';
import { Utils } from '@/utils/utils';
import { SyntaxHighlight } from '@/components/syntax-highlight';
import { Footer } from '@/components/footer';

type PageParams = {
    key: string;
};

export default async function Paste({ params }: { params: Promise<PageParams> })  {
  const { key = '' } = await params;

  const [pasteId, extension] = key.split('.');

  const data = await Utils.getPasteById(pasteId);
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
