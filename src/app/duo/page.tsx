import { redirect } from "next/navigation";

export const Duo = () => {
  return redirect(`/duo/${crypto.randomUUID()}`);
};

export default Duo;
