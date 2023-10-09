import "./styles.css"

function Etiqueta({
    checked,
    titulo,
    id,
    categorias,
    setCategorias
}) {

    function selecionarCategoria() {
        const categoriasCarregadas = [...categorias]

        categoriasCarregadas.forEach(categoria => {
            if (categoria.id === id) {
                categoria.checked = !categoria.checked
            }
        })

        setCategorias([...categoriasCarregadas])
    }

    return (
        <div 
        className={`container__etiqueta ${checked ? "clicado" : "normal"}`}
        onClick={() => selecionarCategoria()}
        >
            <span>{titulo}</span>

            {checked ? "x" : "+"}

        </div>
    )
}

export default Etiqueta