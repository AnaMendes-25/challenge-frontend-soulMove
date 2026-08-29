import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import IntegranteCard from "../../components/IntegranteCard/IntegranteCard";
import { listaIntegrantes } from "../../types/IntegranteCardProps";



export default function Integrantes() {
  return (
    <div>
      <Header />

      <IntegranteCard {
        ...listaIntegrantes[0]
      }
      />
      <IntegranteCard {
        ...listaIntegrantes[1]
      }
      />
      <IntegranteCard {
        ...listaIntegrantes[2]
      }
      />
      <IntegranteCard {
        ...listaIntegrantes[3]
      }
      />
      <IntegranteCard {
        ...listaIntegrantes[4]
      }
      />


      <Footer />
    </div>
  )
}
