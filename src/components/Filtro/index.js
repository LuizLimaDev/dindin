import { useEffect, useState } from "react"
import imagemFiltro from "../../assets/filtrar.svg"
import "./styles.css"
import Etiqueta from "../Etiqueta"
import axios from "../../service/axios"

function Filtro({transacoes, setTransacoes, listarTransacoes}) {
    const [abrirFiltro, setAbrirFiltro ] = useState(false)
    const [categorias, setCategorias] = useState([])
    // const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([])
    const [limparFiltros, setLimparFiltros] = useState(false)
    
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

                setCategorias(response.data)
            }
            buscaCategorias();

        } catch (erro) {
            console.log(erro);
        }
    }, [abrirFiltro])


    async function limpezaDeFiltros() {
        setLimparFiltros(true)
       
        await listarTransacoes()
    }

    async  function aplicarFiltros(){
        let categoriasSelecionadas = [];

        categorias.forEach(categoria => {
            if(categoria.checked) {
                categoriasSelecionadas.push(categoria.descricao)
            } 
        })

        if(!categoriasSelecionadas.length) {
            await listarTransacoes()
            return
        }

        const transacoesSeleciodadas = transacoes.filter(
            transacao => categoriasSelecionadas.includes(transacao.categoria_nome)
        )

        setTransacoes([...transacoesSeleciodadas])

        console.log(
            "categoria : ", categoriasSelecionadas,
            "transacao: ", transacoesSeleciodadas,
            "transacoes: ", transacoes
            );
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
                    categoria={categoria}
                    titulo={categoria.descricao} 
                    categorias={categorias}
                    // setCategoriasSelecionadas={setCategoriasSelecionadas}
                    // categoriasSelecionadas={categoriasSelecionadas}
                    limparFiltros={limparFiltros}
                    setLimparFiltros={setLimparFiltros}
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