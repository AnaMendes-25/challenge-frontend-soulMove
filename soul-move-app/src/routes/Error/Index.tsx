import { Link } from "react-router/internal/react-server-client";
import Footer from "../../components/Footer/Footer";

export default function Error() {
  return (
    <section className="flex h-screen items-start justify-center bg-white px-4 pt-8 text-left sm:px-6 sm:pt-12">
      <div className="w-full max-w-[620px] rounded-2xl bg-[#EFF6FF] px-8 py-10 sm:px-11 sm:py-12">
        <h1 className="mb-3 text-4xl font-bold leading-none !text-blue-300 sm:text-5xl">404</h1>
        <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight !text-[#0F172A] sm:text-3xl">Página não encontrada</h2>
        <p className="mb-6 text-base leading-6 text-[#475569]">O endereço que você tentou acessar não existe ou foi alterado.</p>
      </div>
    </section>
  )
}
