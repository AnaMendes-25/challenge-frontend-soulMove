interface FaqItemProps {
  number: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

export const ItemSumary = ({
  number,
  question,
  answer,
  isOpen = false,
}: FaqItemProps) => {
  return (
    <details
      open={isOpen}
      className="group w-full max-w-[1280px] rounded-3xl border border-blue-600 bg-blue-50 p-4 transition-all duration-200 sm:p-6"
    >
      <summary className="flex items-center gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        {/* Número do Item */}
        <div className="flex items-center justify-center size-10 bg-blue-600 rounded-lg text-white text-lg font-medium font-['Inter'] shrink-0">
          {number}
        </div>

        {/* Título / Pergunta */}
        <h3 className="flex-1 text-lg font-medium leading-7 text-blue-950 sm:text-2xl sm:leading-8">
          {question}
        </h3>
        {/* Botão de Ação / Ícone de Seta (Rotaciona quando aberto) */}
        <div className="flex items-center justify-center size-10 bg-blue-700 rounded-lg shadow-sm border border-white/10 shrink-0 transition-transform duration-200 group-open:rotate-180">
          <svg
            className="size-5 stroke-white fill-none stroke-[2]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </summary>

      {/* Resposta */}
      <div className="mt-4 animate-fadeIn pt-2 text-base font-normal leading-7 text-blue-950 sm:text-xl sm:leading-8">
        <p>{answer}</p>
      </div>
    </details>
  );
};
