import { useState } from 'react';
import Modal from '../../Modal/Modal';
import LinhaTabela from '../LinhaTabela/LinhaTabela';
import './styles.css';

function Tabela({ listarTransacoes, resumoSaldo, transacoes, categoria }) {
    const [editarTransacao, setEditarTransacao] = useState(false);
    const [transacaoSelecionada, setTransacaoSelecionada] = useState({
        id: 0,
        valor: 0,
        categoria: '',
        data: '',
        descricao: '',
        tipo: ''
    });
    
    function dadosDaTransacaoEscolhida(transacao) {
        return {
            id: transacao.id,
            valor: transacao.valor,
            categoria: transacao.categoria_nome,
            data: transacao.data,
            descricao: transacao.descricao,
            tipo: transacao.tipo
        };
    }

    function dataFormatada(data) {
        return new Date(data).toLocaleString('pt-br', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            timeZone: 'UTC'
        });
    }

    function aoEditar(transacao) {
        setEditarTransacao(true);
        setTransacaoSelecionada(transacao);
    }


    return (
        <div className='container__painel'>
            <div>

                <div className='tabela__cabecalho'>
                    <p className='cabecalho__item-data'>Data</p>
                    <p className='cabecalho__item-dia'>Dia da Semanna</p>
                    <p className='cabecalho__item-descricao'>Descricao</p>
                    <p className='cabecalho__item-categoria'>Categoria</p>
                    <p className='cabecalho__item-valor'>Valor</p>
                    <span className='cabecalho__space'></span>
                </div>

                {transacoes.map(transacao => (
                    <LinhaTabela
                        dataFormatada={dataFormatada}
                        key={transacao.id}
                        keyTransacao={transacao.id}
                        data={transacao.data}
                        descricao={transacao.descricao}
                        categoria={transacao.categoria_nome}
                        valor={transacao.valor}
                        tipoTransacao={transacao.tipo}
                        listarTransacoes={listarTransacoes}
                        resumoSaldo={resumoSaldo}
                        aoEditar={() => aoEditar(dadosDaTransacaoEscolhida(transacao))}
                    />
                ))}

            </div>
            {editarTransacao
                && <Modal
                    dataFormatada={dataFormatada}
                    modalNome='Editar Registro'
                    acaoFecharModal={() => setEditarTransacao(false)}
                    transacaoSelecionada={transacaoSelecionada}
                    categoria={categoria}
                    listarTransacoes={listarTransacoes}
                    resumoSaldo={resumoSaldo}
                />
            }
        </div>
    );
}

export default Tabela;