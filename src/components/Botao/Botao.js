import './styles.css';

function Botao({ children, cor, tamanho, onClick, type }) {
    return (
        <>
            <button
                className={`botao ${cor} ${tamanho}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </>
    );
}

export default Botao;