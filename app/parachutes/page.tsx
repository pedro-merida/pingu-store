import SectionHeader from "../components/SectionHeader";
import ParachutesPage from "../components/ParachutesPage";

export default function Parachutes() {
  return (
    <div className="px-10 py-6 space-y-8">
      <SectionHeader
        title="Skins de Paracaídas"
        backHref="/"
        backLabel="Volver al Inicio"
      />
      <ParachutesPage />
    </div>
  )
}