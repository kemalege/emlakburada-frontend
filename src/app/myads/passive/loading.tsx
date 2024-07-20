import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};