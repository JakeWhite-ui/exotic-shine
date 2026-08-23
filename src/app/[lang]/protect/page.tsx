import { PillarPage, pillarMetadata } from "@/components/pillar-page";

export const metadata = pillarMetadata("protect");

export default function Page({ params }: PageProps<"/[lang]/protect">) {
  return <PillarPage id="protect" params={params} />;
}
