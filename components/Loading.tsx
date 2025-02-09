import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loader2Icon className="animate-spin h-9 w-9" />
    </div>
  );
};

export default Loading;
