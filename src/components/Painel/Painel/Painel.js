import { useEffect, useState } from 'react';
import api from '../../../service/axios';
import Resumo from '../Resumo/Resumo';
import Tabela from '../Tabela/Tabela';
import './styles.css';
import Filtro from '../../Filtro';

function Painel() {
    const [transacoes, setTransacoes] = useState([]);
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [resultado, setResultado] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        listarTransacoes();
        resumoSaldo();
    }, []);

    async function listarTransacoes() {
        try {
            const response = await api.get('/transacao', {
                headers: {
                    Authorization: `${token}`
                }
            });

            setTransacoes([...response.data])
            return response.data

        } catch (erro) {
            console.log(erro);
        }
    }

    async function resumoSaldo() {
        try {
            const response = await api.get('/transacao/extrato', {
                headers: {
                    Authorization: `${token}`
                }
            })

            setEntrada(response.data.entrada)
            setSaida(response.data.saida)
            setResultado(response.data.entrada - response.data.saida)
        } catch (erro) {
            console.log(erro);
        }
    }

    return (
        <main className='principal'>
            <div className='container__informacoes'>
                
                <div className="container-left">
                    <Filtro transacoes={transacoes} setTransacoes={setTransacoes} listarTransacoes={listarTransacoes}/>

                    <Tabela
                        listarTransacoes={listarTransacoes}
                        resumoSaldo={resumoSaldo}
                        transacoes={transacoes}
                    />
                </div>
            
                <div className="container-right">
                <Resumo
                    listarTransacoes={listarTransacoes}
                    resumoSaldo={resumoSaldo}
                    saldo={resultado < 0 ? 'negativo' : 'positivo'}
                    entrada={entrada}
                    saida={saida}
                    resultado={resultado}
                />
                </div>
            </div>
        </main>
    );
}

export default Painel;
