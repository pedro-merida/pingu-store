import SectionHeader from "@/app/components/SectionHeader";
import WeaponsPage from "../../components/WeaponsPage";
import { getSectionTitle } from "@/app/lib/getSectionTitle";

interface Props {
  params: Promise<{
    type: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { type } = await params;

  const title = getSectionTitle("weapons", type);

  return (
    <div className="px-10 py-6 space-y-8">
      <SectionHeader
        title={title}
        backHref="/weapons"
        backLabel="Volver a Ver Todo"
      />
      <WeaponsPage typeFilter={type} />
    </div>
  );
}