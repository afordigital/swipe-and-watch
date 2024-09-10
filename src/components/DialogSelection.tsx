import Link from "next/link";

type DialogSectionProps = {
  handleMode: () => void;
};

const roomId = crypto.randomUUID();

export const DialogSelection = (props: DialogSectionProps) => {
  return (
    <dialog open className="p-10 flex flex-col items-center justify-center">
      <p>Elige tu modo de juego</p>
      <div className="flex gap-4">
        <Link
          href="/individual"
          className="bg-yellow-600 hover:bg-yellow-700 p-2"
        >
          Individual
        </Link>
        <Link
          href={`/duo/${roomId}`}
          className="bg-yellow-600 hover:bg-yellow-700 p-2"
        >
          Duo
        </Link>
      </div>
    </dialog>
  );
};
