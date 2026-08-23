import { PillarPage, pillarMetadata } from "@/components/pillar-page";

export const metadata = pillarMetadata("elevate");

export default function Page({ params }: PageProps<"/[lang]/elevate">) {
  return <PillarPage id="elevate" params={params} />;
}
