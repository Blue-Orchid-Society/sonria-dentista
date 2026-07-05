import { redirect } from "next/navigation";

export default async function LocalizedToolRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/tools/${slug}`);
}
