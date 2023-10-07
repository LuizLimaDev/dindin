import './styles.css';
import logo from '../../assets/Logo.svg';
import avatar from '../../assets/avatar.svg';
import sair from '../../assets/sair.svg';
import { useNavigate } from 'react-router-dom'

function Cabecalho() {
    const usuario = localStorage.getItem('usuario');
    const navigate = useNavigate()

    function sairConta() {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className='cabecalho'>
            <img className='logo__cabecalho' src={logo} alt='logo' />

            <div className='container__menu'>
                <img src={avatar} alt='logo' />
                <h3 className='menu__nome'>{usuario}</h3>
                <img
                    className='menu__deslogar'
                    src={sair}
                    alt='logo'
                    onClick={sairConta}
                />
            </div>
        </header>
    );
}

export default Cabecalho;