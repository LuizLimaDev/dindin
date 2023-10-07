import axios from "../../service/axios";
import "./styles.css"

/* eslint-disable react/prop-types */
function ModalDeletar({
    abrir, 
    setAoDeletar, 
    listarTransacoes,
    resumoSaldo,    
    keyTransacao}) {
    const token = localStorage.getItem('token');

    async function aoExcluir(id) {
        await axios.delete(`/transacao/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });

        listarTransacoes();
        resumoSaldo();
        return
    }

    return (
        <>
            {abrir && 
        <div className="container-confirm">
            <div className="arrow-up ">

            </div>

            <span>Apagar item?</span>
    
            <div className="container-buttons">
                <button
                    className='btn-extra-small btn-blue'
                    onClick={() => aoExcluir(keyTransacao)}
                >
                Sim
                </button>
                <button
                    className="btn-extra-small btn-red"
                    onClick={() => setAoDeletar(false)}
                >
                Não
                </button>
            </div>
        </div>
            }        
        </>

    )
}

export default ModalDeletar