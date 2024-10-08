import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mode, MODES } from "@/app/page";
import { Button } from "./ui/button";

type ModeSelectionProps = {
  handleMode: (mode: Mode) => void;
  description: string;
  mode: Mode;
};

const roomId = crypto.randomUUID();

export const ModeSelection = ({
  handleMode,
  description,
  mode,
}: ModeSelectionProps) => {
  return (
    <Card className="max-w-[325px]">
      <CardHeader>
        <CardTitle className="capitalize">{mode}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            handleMode(mode);
          }}
          asChild
        >
          <Link
            href={mode === MODES.INDIVIDUAL ? "/individual" : `/duo/${roomId}`}
          >
            Play {mode}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
