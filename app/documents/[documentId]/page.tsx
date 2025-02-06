import Editor from "./Editor";
import ToolbarComponent from "./toolbar";

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
      <ToolbarComponent />
      <Editor />
    </div>
  );
}
