import './styles.css';

function Selecionar({ valor, opcoes, aoAlterar }) {
    return (
        <div className='container__selecionar'>
            <label
                className='select__etiqueta'
                htmlFor='categorias'
            >
                Categoria
            </label>
            <select
                className='formulario__selecionar'
                name='categorias'
                value={valor}
                onChange={e => aoAlterar(e.target.value)}
                required
            >
                <option value=''></option>
                {opcoes}
            </select>
        </div>
    );
}

export default Selecionar;