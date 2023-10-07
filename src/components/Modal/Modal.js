import { useEffect, useState } from 'react';
import botao__fechar from '../../assets/fechar.png';
import axios from '../../service/axios';
import Button from '../Botao/Botao';
import Input from '../Input/Input';
import Selecionar from '../Selecionar/Selecionar';
import './styles.css';

function Modal({
    dataFormatada,
    modalNome,
    acaoFecharModal,
    transacaoSelecionada,
    listarTransacoes,
    resumoSaldo
}) {
    const [entradaAtiva, setEntradaAtiva] = useState(false);
    const [saidaAtiva, setSaidaAtiva] = useState(true);
    const [transacaoId, setTransacaoId] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [descricao, setDescricao] = useState('');
    const token = localStorage.getItem('token');
    const [erroModal, setErroModal] = useState('')

    useEffect(() => {
        try {
            async function buscaCategorias() {
                const response = await axios.get('/categoria', {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                return setCategoria(response.data);
            }
            buscaCategorias();

        } catch (erro) {
            setErroModal('Erro inesperado detectado no MODAL, entre em contato com o suporte')
        }

        if (transacaoSelecionada) {
            transacaoSelecionada.tipo === 'entrada' && ativarEntrada();
            setTransacaoId(transacaoSelecionada.id);
            setValor(`${transacaoSelecionada.valor}`);
            setData(dataFormatada(transacaoSelecionada.data));
            setCategoriaSelecionada(transacaoSelecionada.categoria);
            setDescricao(transacaoSelecionada.descricao);
        };

    }, [transacaoSelecionada, token]);

    function limpaCampos() {
        setValor('');
        setData('');
        setCategoriaSelecionada('');
        setDescricao('');
    }

    function ativarEntrada() {
        setEntradaAtiva(true);
        setSaidaAtiva(false);
        limpaCampos();
    }

    function ativarSaida() {
        setSaidaAtiva(true);
        setEntradaAtiva(false);
        limpaCampos();
    }

    async function aoEnviar(e) {
        e.preventDefault();
        const buscaCategoriaId = categoria.filter(categoria => { return categoria.descricao === `${categoriaSelecionada}` });
        let tipoDaTransacao;

        entradaAtiva ? tipoDaTransacao = 'entrada' : tipoDaTransacao = 'saida';

        limpaCampos();

        if (modalNome === 'Adicionar Registro') {
            await axios.post('/transacao', {
                tipo: tipoDaTransacao,
                descricao,
                valor,
                data,
                categoria_id: buscaCategoriaId[0].id,
                categoria_nome: categoriaSelecionada
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            listarTransacoes();
            resumoSaldo();
            acaoFecharModal();
            return
        }

        await axios.put(`/transacao/${transacaoId}`, {
            tipo: tipoDaTransacao,
            descricao,
            valor: valor,
            data: dataFormatada(data),
            categoria_id: buscaCategoriaId[0].id,
            categoria_nome: categoriaSelecionada
        }, {
            headers: {
                'Authorization': `${token}`
            }
        })

        listarTransacoes();
        resumoSaldo();
        acaoFecharModal();
        return
    }

    return (
        <div className='sombra__modal'>
            <div className='container__modal'>
                <div className='container__titulo'>
                    <h3 className='modal__nome'>{modalNome}</h3>
                    <img
                        className='modal__botaoFechar'
                        src={botao__fechar}
                        alt='botao fechar'
                        onClick={acaoFecharModal}
                    />
                </div>

                <div className='container__botoes'>
                    <Button
                        cor={entradaAtiva ? 'cor__azul' : 'cor__cinza'}
                        tamanho='largo'
                        onClick={() => ativarEntrada()}
                    >
                        Entrada
                    </Button>
                    <Button
                        cor={saidaAtiva ? 'cor__vermelha' : 'cor__cinza'}
                        tamanho='largo'
                        onClick={() => ativarSaida()}
                    >
                        Saída
                    </Button>
                </div>

                <span className='erro'>{erroModal}</span>

                <form className='form' onSubmit={aoEnviar}>
                    <Input
                        modal='modal'
                        etiqueta='Valor'
                        type={transacaoSelecionada ? 'text' : 'number'}
                        name='valor'
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                    <Input
                        modal='modal'
                        etiqueta='Data'
                        type={transacaoSelecionada ? 'text' : 'date'}
                        name='data'
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                    <Selecionar
                        valor={categoriaSelecionada}
                        opcoes={
                            categoria.map(item => (
                                <option
                                    key={item.id}
                                    name='{item.categoria}'
                                >
                                    {item.descricao}
                                </option>
                            ))}
                        aoAlterar={valor => setCategoriaSelecionada(valor)}
                    />
                    <Input
                        modal='modal'
                        etiqueta='Descrição'
                        type='teste'
                        name='descricao'
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <Button type='submit' tamanho='largo' >Confirmar</Button>
                </form>
            </div>
        </div>
    );
}

export default Modal;