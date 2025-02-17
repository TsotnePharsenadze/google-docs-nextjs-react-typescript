import Ruler from "@/components/Ruler";
import Editor from "./Editor";
import ToolbarComponent from "./Toolbar";
import Navbar from "@/components/navbar/Navbar";
import { Room } from "./Room";

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
      <div className="fixed left-0 right-0 top-0 bottom-0 z-50 h-[120px] print:hidden">
        <Navbar />
        <ToolbarComponent />
      </div>
      <div className="pt-[125px] print:pt-0">
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
}
