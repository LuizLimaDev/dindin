import { useState } from "react"
import imagemFiltro from "../../assets/filtrar.svg"
import "./styles.css"
import Etiqueta from "../Etiqueta"

function Filtro() {
    const [abrirFiltro, setAbrirFiltro ] = useState(false)

    return (
        <div className="container-filtro">

        <button 
        onClick={() => setAbrirFiltro(!abrirFiltro)}
        className="botao-filtrar"
        >
            <img src={imagemFiltro} alt="filtrar" />
            Filtrar
        </button>

        {abrirFiltro && 
        <div className="area-filtro">
            <strong>Categoria</strong>


            <div>
                <Etiqueta clicado titulo="Compras" />
                <Etiqueta titulo="Vendas" />
            </div>

            <div className="container-botoes">
                <button className="limpar-filtro">
                    Limpar filtro
                </button>
                <button className="aplicar-filtro">
                    Aplicar filtro
                </button>
            </div>

        </div>
        }
        </div>
    )
}

export default Filtro