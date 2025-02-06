import Editor from "./editor";

export default async function DocumentsByIdPage({
  params,
}: {
  params: Promise<{
    documentId: string;
  }>;
}) {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[FAFBFD]">
      <Editor />
    </div>
  );
}
