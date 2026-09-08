import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ItemSumary } from "../../components/ItemSumary/ItemSumary"; // Importe o seu componente de sumário

import cuboDuvida from "../../assets/banners/cubo-duvidas.png";

// Importe o faqData do arquivo onde você definiu as seções e tipos
import { faqData } from "../../types/faq"; // (Ajuste o caminho caso esteja em outra pasta)

export default function Faq() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="w-full max-w-360 mx-auto min-h-screen relative bg-white overflow-x-hidden">
        
        {/* Banner Superior */}
        <section className="w-full flex justify-center py-8">
          <header className="w-full max-w-7xl mx-auto p-8 md:p-12 bg-blue-950 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-4">
              <p className="text-blue-300 text-base font-normal tracking-wide uppercase">
                [ FAQ ]
              </p>
              <h2 className="text-indigo-50 text-4xl sm:text-5xl font-semibold leading-tight">
                Perguntas frequentes
              </h2>
              <p className="text-indigo-50 text-lg md:text-xl font-normal leading-relaxed">
                Tire suas dúvidas sobre como o nosso sistema de pontuação e recompensas funciona. Caso a informação que você busca não esteja na lista, use o nosso chat para tirar dúvidas.
              </p>
            </div>
            <figure className="w-full md:w-1/2 shrink-0 flex justify-center">
              <img
                className="w-full max-w-[567px] h-80 object-cover rounded-2xl"
                src={cuboDuvida}
                alt="Ilustração de um cubo com interrogações representando dúvidas e perguntas frequentes"
              />
            </figure>
          </header>
        </section>

        {/* Seção de Perguntas Dinâmicas */}
        <section className="w-full flex justify-center py-8">
          <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-10">
            
            {/* 1º Map: Passa por cada Seção (Ex: "Sobre o Soul Move", "Sobre pontuação") */}
            {faqData.map((section) => (
              <div key={section.id} className="flex flex-col items-start gap-4 w-full">
                
                {/* Título da Seção */}
                <h3 className="text-blue-950 text-2xl font-medium font-['Inter'] leading-8">
                  {section.title}
                </h3>
                
                {/* Container das perguntas daquela seção */}
                <div className="w-full flex flex-col gap-4">
                  {/* 2º Map: Passa por cada pergunta de dentro da seção */}
                  {section.items.map((item) => (
                    <ItemSumary 
                      key={item.id}
                      number={item.number}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>

              </div>
            ))}

          </div>
        </section>
        
      </main>
      <Footer />
    </div>
  )
}