import { PillarPage, pillarMetadata } from "@/components/pillar-page";

export const metadata = pillarMetadata("maintain");

export default function Page({ params }: PageProps<"/[lang]/maintain">) {
  return <PillarPage id="maintain" params={params} />;
}
