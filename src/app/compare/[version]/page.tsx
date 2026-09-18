import { notFound } from "next/navigation";
import HomePage from "../../components/HomePage";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ version: "current" }, { version: "outcome" }];
}

export default async function Preview({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  if (version !== "current" && version !== "outcome") notFound();
  return <HomePage outcome={version === "outcome"} preview />;
}
