import './style.css'
import Imput from '../../components/Input/Input'
import Botao from '../../components/Botao/Botao'
import api from '../../service/axios'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/Logo.svg'

export default function Login() {
    const navigate = useNavigate();

    const [errorUsuario, setErrorUsuario] = useState('')

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
    })

    const [confrmarSenha, setConfirmarSenha] = useState('')

    function input(e) {
        const chave = e.target.name;
        const valor = e.target.value;
        setForm({ ...form, [chave]: valor })
    }

    const submit = async (e) => {
        e.preventDefault();

        if (form.senha !== confrmarSenha) {
            setErrorUsuario('senha e confirmar senha estao diferente')
            return
        }

        try {
            await api.post('/usuario', form);
            navigate("/");
        } catch (error) {
            setErrorUsuario(error.response.data.mensagem)
        }
    }

    return (
        <>
            <div className='background'>

                <img className='logo' src={logo} alt='logo' />

                <div className='cadastro-tela'>
                    <div className='cadastro-formulario'>

                        <h1 className='cadastro-formulario-titulo'>Cadastro</h1>

                        <form onSubmit={submit}>
                            <Imput
                                etiqueta='nome'
                                type='text'
                                name='nome'
                                value={form.nome}
                                onChange={input}
                            />

                            <Imput
                                etiqueta='email'
                                type='text'
                                name='email'
                                value={form.email}
                                onChange={input}
                            />

                            <Imput
                                etiqueta='senha'
                                type='password'
                                name='senha'
                                value={form.senha}
                                onChange={input}
                            />

                            <Imput
                                etiqueta='confirmar senha'
                                type='password'
                                name='confirmar'
                                value={confrmarSenha}
                                onChange={e => setConfirmarSenha(e.target.value)}
                            />

                            <p className='cadastro-formulario-errosenha erro' >{errorUsuario}</p>

                            <Botao children='Cadastrar' />
                        </form>

                        <Link className='cadastro-formulario-link' to={'/'}>Já tem cadastro? Clique aqui!</Link>
                    </div>
                </div>

            </div>
        </>
    )
}