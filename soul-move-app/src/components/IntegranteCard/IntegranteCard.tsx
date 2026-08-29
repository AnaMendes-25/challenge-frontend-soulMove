import type { IntegranteCardProps } from "../../types/IntegranteCardProps";





export const IntegranteCard: React.FC<IntegranteCardProps> = ({
  nome,
  rm,
  skills,
  fotoUrl,
  linkedinUrl,
  githubUrl
}) => {
  return (
    <article className="w-96 p-6 bg-blue-950 rounded-3xl flex flex-col justify-start items-start gap-6 shadow-xl">
      <img
        className="w-full h-96 object-cover rounded-lg"
        src={fotoUrl}
        alt={`Foto de perfil de ${nome}`}
      />
      
      <header className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-1">
          <h3 className="text-white text-2xl font-semibold font-['Inter'] leading-8">
            {nome}
          </h3>
          <p className="text-white text-xl font-normal font-['Inter'] leading-8 opacity-90">
            {rm}
          </p>
        </div>

        <hr className="w-full border-t border-indigo-50/20 my-0" />

        <p className="text-white text-xl font-normal font-['Inter'] leading-8">
          {skills}
        </p>

        <footer className="flex items-center gap-2 pt-2">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-white rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-neutral-300 flex items-center gap-2 hover:bg-neutral-100 transition-colors"
          >
            <div className="w-5 h-5 relative flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-[56px]" />
              <div className="w-2.5 h-2 absolute bg-white" />
            </div>
            <span className="text-neutral-700 text-sm font-semibold font-['Inter'] leading-5">
              LinkedIn
            </span>
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-white rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-neutral-300 flex items-center gap-2 hover:bg-neutral-100 transition-colors"
          >
            <div className="w-5 h-5 relative flex items-center justify-center overflow-hidden">
              <div className="w-4 h-4 bg-blue-600 rounded-sm" />
            </div>
            <span className="text-neutral-700 text-sm font-semibold font-['Inter'] leading-5">
              GitHub
            </span>
          </a>
        </footer>
      </header>
    </article>
  );
};

export default IntegranteCard;