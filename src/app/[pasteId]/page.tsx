type PageParams = {
  params: {
    pasteId: string;
  };
};

export default async function Paste({ params }: PageParams) {
  const { pasteId } = await params;

  return <h1>you requested paste: {pasteId}</h1>;
}
