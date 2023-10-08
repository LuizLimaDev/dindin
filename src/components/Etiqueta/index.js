import { useEffect, useState } from "react"
import "./styles.css"

function Etiqueta({
    titulo, 
    clicado, 
    categoria,
    limparFiltros, 
    setLimparFiltros
}) {
    const [categoriaAtivada, setCategoriaAtivada] = useState(false)

    function selecionarCategoria(categoria) {
        setCategoriaAtivada(!categoriaAtivada)
        categoria.checked = true
    }

    useEffect(() => {
        limparFiltros && setCategoriaAtivada(false)
        setLimparFiltros(false)
        
        if (!categoriaAtivada) {
            categoria.checked = false
            return
        }

    }, [limparFiltros, categoriaAtivada])

    return (
        <div 
        className={`container__etiqueta ${categoriaAtivada ? "clicado" : "normal"}`}
        onClick={() => selecionarCategoria(categoria)}
        >
            <span>{titulo}</span>

            {clicado ? "x" : "+"}

        </div>
    )
}

export default Etiqueta