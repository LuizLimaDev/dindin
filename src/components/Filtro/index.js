import { useEffect, useState } from "react";
import imagemFiltro from "../../assets/filtrar.svg";
import axios from "../../service/axios";
import Etiqueta from '../Etiqueta/index';
import "./styles.css";

function Filtro({transacoes, setTransacoes, listarTransacoes}) {
    const [abrirFiltro, setAbrirFiltro ] = useState(false)
    const [categorias, setCategorias] = useState([])    
    const token = localStorage.getItem('token');

    useEffect(() => {
        try {
            async function buscaCategorias() {
                const response = await axios.get('/categoria', {
                    headers: {
                        Authorization: `${token}`
                    }
                });

                const listaDeCategorias = response.data
                listaDeCategorias.forEach(categoria => categoria.checked = false)

                setCategorias(listaDeCategorias)
            }

            if (abrirFiltro) {
                buscaCategorias();
            }

        } catch (erro) {
            console.log(erro);
        }
    }, [abrirFiltro])

    async function limpezaDeFiltros() {
        const categoriasCarregadas = [...categorias]

        categoriasCarregadas.forEach(categoria => categoria.checked = false)

        setCategorias([...categoriasCarregadas])
        listarTransacoes()
    }

    async  function aplicarFiltros(){
        const transacoesAdicionadas = await listarTransacoes()
        setTransacoes([...transacoesAdicionadas])

        const categoriasSelecionadas = []
        
        categorias.forEach(categoria => {
            if (categoria.checked) {
                categoriasSelecionadas.push(categoria.descricao)
            }
        })

        if (!categoriasSelecionadas.length) {
            listarTransacoes()
            return
        }

        const transacoesFiltradas = transacoesAdicionadas.filter(
            transacoes => categoriasSelecionadas.includes(transacoes.categoria_nome)
        )
        
        setTransacoes([...transacoesFiltradas]);
    }

    return (
        <div className="container__filtro">

        <button 
        onClick={() => setAbrirFiltro(!abrirFiltro)}
        className="botao__filtrar"
        >
            <img src={imagemFiltro} alt="filtrar" />
            Filtrar
        </button>

        {abrirFiltro && 
        <div className="area__filtro">
            <strong>Categoria</strong>

            <div className="container__etiquetas">
                {categorias.map((categoria) => (
                    <Etiqueta 
                        key={categoria.id}
                        checked={categoria.checked}
                        titulo={categoria.descricao}
                        id={categoria.id}
                        categorias={categorias}
                        setCategorias={setCategorias}
                    />
                ))}
            </div>

            <div className="container__botoes">
                <button className="limpar__filtro" onClick={() => limpezaDeFiltros()}>
                    Limpar filtro
                </button>
                <button className="aplicar__filtro" onClick={() => aplicarFiltros()}>
                    Aplicar filtro
                </button>
            </div>

        </div>
        }
        </div>
    )
}

export default Filtro