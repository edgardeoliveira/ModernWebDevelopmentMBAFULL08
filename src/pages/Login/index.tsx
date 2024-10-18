import { useNavigate } from 'react-router-dom'

import MyInput from '../../components/MyInput'

import * as authService from '../../services/auth.service'

import './index.scss'

export default function LoginPage() {

    const navigate = useNavigate()

    let username = ''
    let password = ''

    function signIn() {
        authService.login(username, password).then(isLogged => {
            if (isLogged) navigate('/home')
            else alert('Login/senha inválido(a)')
        }).catch(error => {
            console.error(error)
            alert('Login/senha inválido(a)')
        })
    }

    return (
        <div className='login-page'>
            <header>Página de Acesso</header>
            
            <main>
                <MyInput id='username' label='Login' change={value => username = value} />
                <MyInput id='password' label='Senha' change={value => password = value} type='password' />
            </main>

            <footer>
                <button onClick={signIn}>Entrar</button>
            </footer>
        </div>
    )
}