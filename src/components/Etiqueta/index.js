import "./styles.css"

function Etiqueta({titulo, clicado}) {
    return (
        <div className={`container-etiqueta ${clicado ? "clicado" : "normal"}`}>
            <span>{titulo}</span>

            {clicado ? "x" : "+"}

        </div>
    )
}

export default Etiqueta