import SectionHeader from "@/app/components/SectionHeader";
import PlayersPage from "../../components/PlayersPage";
import { getSectionTitle } from "../../lib/getSectionTitle";

interface Props {
  params: Promise<{
    type: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { type } = await params;

  const title = getSectionTitle("player", type);

  return (
    <div className="px-10 py-6 space-y-8">
      <SectionHeader
        title={title}
        backHref="/player"
        backLabel="Volver a Ver Todo"
      />
      <PlayersPage typeFilter={type} />
    </div>
  )
}