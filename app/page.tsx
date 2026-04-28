import { redirect } from "next/navigation";

export default function RootPage() {
  // Default Spanish for Arlington TX demographics; switch to /en at language picker.
  redirect("/es");
}
