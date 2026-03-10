import SectionHeader from "../components/SectionHeader";
import WeaponsPage from "../components/WeaponsPage";

export default function Armas() {
  return (
    <div className="px-10 py-6 space-y-8">
      <SectionHeader
        title="Skins de Armas"
        backHref="/"
        backLabel="Volver al Inicio"
      />
      <WeaponsPage />
    </div>
  )
}