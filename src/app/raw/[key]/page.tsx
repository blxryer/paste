import { Utils } from '@/utils/utils';
import { redirect } from 'next/navigation';

type PageParams = {
  params: {
    key: string;
  };
};

export default async function Paste({ params }: PageParams) {
  const { key = '' } = await params;

  const [pasteId] = key.split('.');

  const data = await Utils.getPasteById(pasteId);
  if (!data) {
    return redirect('/');
  }

  return <pre>{data.content}</pre>;
}
