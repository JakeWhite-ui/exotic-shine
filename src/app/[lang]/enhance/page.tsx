import { PillarPage, pillarMetadata } from "@/components/pillar-page";

export const metadata = pillarMetadata("enhance");

export default function Page({ params }: PageProps<"/[lang]/enhance">) {
  return <PillarPage id="enhance" params={params} />;
}
