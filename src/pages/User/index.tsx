import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userService } from '../../services/user.service';
import { hasToken } from '../../services/auth.service';
import { User } from '../../models/user';

import MyInput from '../../components/MyInput';

import './index.scss';
import { roleService } from '../../services/role.service';
import { Role } from '../../models/role';

export default function UserPage() {
    const navigate = useNavigate();
    const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]); // Estado para as seleções múltiplas de perfis

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [roles, setRoles] = useState<Role[]>([]); // Estado para armazenar os perfis (roles)

    useEffect(() => {
        if (!hasToken()) {
            alert('Usuário não logado!');
            navigate('/login');
        }

        fetchRoles();
    }, [navigate]);

    // Função para buscar os perfis (roles)
    const fetchRoles = () => {
        roleService.getRoles()
            .then(list => setRoles(list)) // Atualiza o estado com a lista de perfis recebida
            .catch(() => {
                alert('Sua sessão expirou!');
                navigate('/login');
            });
    };

    function goBack() {
        navigate(-1);
    }

    function handleProfileChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const options = Array.from(e.target.selectedOptions, option => option.value); // Pega os valores selecionados
        setSelectedProfiles(options); // Atualiza o estado com as seleções
    }

    function save() {
        if (name.trim() === '') {
            alert('Nome do usuário é obrigatório');
            return;
        }
        if (username.trim() === '') {
            alert('Login do usuário é obrigatório');
            return;
        }
        if (password.trim() === '') {
            alert('Senha do usuário é obrigatória');
            return;
        }
        if (password !== confirmPass) {
            alert('Senha não confere');
            return;
        }

        const user: User = { name, username, password, roles: selectedProfiles }; // Inclui os perfis selecionados no objeto
    

        userService.create(user)
            .then(() => {
                alert('Usuário salvo com sucesso!');
                goBack();
            })
            .catch((error: any) => {
                if (error?.response?.status === 400) {
                    alert('Usuário já existe');
                } else {
                    alert('Sua sessão expirou!');
                    navigate('/login');
                }
            });
    }

    return (
        <div className='user-page'>
            <header>Novo Usuário</header>

            <main>
                <MyInput id='name' label='Nome' value={name} change={setName} />
                <MyInput id='username' label='Login' value={username} change={setUsername} />
                <MyInput id='password' label='Senha' type='password' value={password} change={setPassword} />
                <MyInput id='confirmPass' label='Confirmar Senha' type='password' value={confirmPass} change={setConfirmPass} />

                <div className='select-profile-count'>
                    <label htmlFor="profileCount">Selecionar Perfis</label>
                    <select
                        id="profileCount"
                        multiple // Permite múltiplas seleções
                        value={selectedProfiles}
                        onChange={handleProfileChange} // Manipula múltiplas seleções
                    >
                        {roles.map(role => (
                            <option key={role.name} value={role.name}>
                                {role.name} - {role.description}
                            </option>
                        ))}
                    </select>
                </div>
            </main>

            <footer>
                <button className='goBack' onClick={goBack}>Cancelar</button>
                <button onClick={save}>Salvar</button>
            </footer>
        </div>
    );
}
