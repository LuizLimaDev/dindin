import { useState } from 'react';
import Button from '../../Botao/Botao';
import Modal from '../../Modal/Modal';
import './styles.css';

function Resumo({ listarTransacoes, resumoSaldo, saldo, entrada, saida, resultado }) {
    const [abrirModal, setAbrirModal] = useState(false);

    return (
        <div className='container__resumo'>
            <div className='container__resumo-bancario'>
                <h2 className='resumo__titulo'>Resumo</h2>

                <div className='container__transacoes'>
                    <div className='transacoes__entradas'>
                        <p className='transacoes__titulo'>Entradas</p>
                        <p className='transacoes__entradas-valor'>R$ <span>{entrada}</span></p>
                    </div>
                    <div className='transacoes__saidas'>
                        <p className='transacoes__titulo'>Saídas</p>
                        <p className='transacoes__saidas-valor'>R$ <span>{saida}</span></p>
                    </div>

                    <div className='container__saldo'>
                        <h3 className='saldo__titulo'>Saldo</h3>
                        <p className={`${saldo}`}>R$ <span>{resultado}</span></p>
                    </div>
                </div>
            </div>

            <Button
                tamanho='resumo'
                onClick={() => setAbrirModal(true)}
            >
                Adicionar Registro
            </Button>

            {abrirModal
                && <Modal
                    modalNome='Adicionar Registro'
                    acaoFecharModal={() => setAbrirModal(false)}
                    listarTransacoes={listarTransacoes}
                    resumoSaldo={resumoSaldo}
                />
            }
        </div>
    );
}

export default Resumo;