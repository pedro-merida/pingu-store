import PlayersPage from "../components/PlayersPage";
import SectionHeader from "../components/SectionHeader";

export default function Players() {
  return (
    <div className="px-10 py-6 space-y-8">
      <SectionHeader
        title="Skins de Players"
        backHref="/"
        backLabel="Volver al Inicio"
      />
      <PlayersPage />
    </div>
  )
}