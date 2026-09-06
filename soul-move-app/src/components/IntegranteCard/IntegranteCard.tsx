import type { IntegranteCardProps } from "../../types/IntegranteCardProps";
import githubIcon from "../../assets/logo/github.svg";
import linkedinIcon from "../../assets/logo/linkedin.svg";





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
    <article className="w-60 p-2 bg-blue-950 rounded-2xl flex flex-col justify-start items-start gap-3 shadow-xl hover:-translate-y-[5px] transition-all duration-200">
      <img
        className="w-full h-80 object-cover rounded-2xl"
        src={fotoUrl}
        alt={`Foto de perfil de ${nome}`}
      />
      
      <header className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-1 text-center">
          <h3 className="text-white text-xl font-bold font-['Inter'] leading-8">
            {nome}
          </h3>
          <p className="text-white text-xs font-normal font-['Inter'] leading-8 opacity-90">
            {rm}
          </p>
        </div>

        <hr className="w-full border-t border-indigo-50/20 my-0" />

        <p className="text-white text-xs text-center font-normal font-['Inter'] leading-8">
          {skills}
        </p>

        <footer className="flex items-center gap-2 pt-2">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 py-2 bg-white rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-neutral-300 flex items-center gap-2 transition-all justify-center hover:scale-105 duration-200 hover:bg-[#bfdbfe]"
          >
            <div className="w-3 h-3 relative flex items-center justify-center overflow-hidden">
              <img
                src={linkedinIcon}
                alt={`LinkedIn de ${nome}`} 
                />
            </div>
            <span className="text-neutral-700 text-xs font-semibold font-['Inter'] leading-5">
              LinkedIn
            </span>
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 py-2 bg-white rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-neutral-300 flex items-center gap-2 transition-all justify-center hover:scale-105 duration-200 hover:bg-[#bfdbfe]"
          >
            <div className="w-3 h-3 relative flex items-center justify-center overflow-hidden">
              <img
                src={githubIcon}
                alt={`GitHub de ${nome}`} 
                />
            </div>
            <span className="text-neutral-700 text-xs font-semibold font-['Inter'] leading-5">
              GitHub
            </span>
          </a>
        </footer>
      </header>
    </article>
    
  );
};

export default IntegranteCard;