import { DialogSelection } from "../components/DialogSelection";

export default function Home() {
  const handleMode = () => {
    console.log("hola");
  };

  return (
    <div className="flex flex-col w-screen items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DialogSelection handleMode={handleMode} />
    </div>
  );
}
