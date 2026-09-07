import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import IntegranteCard from "../../components/IntegranteCard/IntegranteCard";
import { listaIntegrantes } from "../../types/IntegranteCardProps";



export default function Integrantes() {
  return (

    <div className="self-stretch inline-flex justify-start items-center gap-6 flex-wrap content-center">
      <Header />
      <main className="w-full max-w-360 mx-auto min-h-screen relative bg-white overflow-x-hidden"></main>
      <div className="w-full flex flex-wrap justify-center gap-3">
        <IntegranteCard {...listaIntegrantes[0]} />
        <IntegranteCard {...listaIntegrantes[1]} />
        <IntegranteCard {...listaIntegrantes[2]} />
        <IntegranteCard {...listaIntegrantes[3]} />
        <IntegranteCard {...listaIntegrantes[4]} />
      </div>
      <main />
      <Footer />
    </div>
  )
}
