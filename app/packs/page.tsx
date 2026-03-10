import PacksPage from "../components/PacksPage";
import SectionHeader from "../components/SectionHeader";

export default function Packs() {
  return (
    <div className="px-10 py-6 space-y-8">
      <SectionHeader
        title="Packs de Skins"
        backHref="/"
        backLabel="Volver al Inicio"
      />
      <PacksPage />
    </div>
  )
}