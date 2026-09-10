import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import IntegranteCard from "../../components/IntegranteCard/IntegranteCard";
import { listaIntegrantes } from "../../data/IntegranteCardPropsData";

export default function Integrantes() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main className="w-full overflow-x-hidden">
        <div className="mx-auto grid w-[calc(100%-32px)] max-w-[1280px] grid-cols-1 justify-center gap-3 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <IntegranteCard {...listaIntegrantes[0]} />
          <IntegranteCard {...listaIntegrantes[1]} />
          <IntegranteCard {...listaIntegrantes[2]} />
          <IntegranteCard {...listaIntegrantes[3]} />
          <IntegranteCard {...listaIntegrantes[4]} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
