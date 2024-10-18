import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { hasToken } from '../../services/auth.service';
import MyInput from '../../components/MyInput';
import { userService } from '../../services/user.service';
import { roleService } from '../../services/role.service'; 
import { Role } from '../../models/role'; 

import './index.scss';

export default function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [roles, setRoles] = React.useState<Role[]>([]); 
    const [selectedProfiles, setSelectedProfiles] = React.useState<string[]>([]); 

    React.useEffect(() => {
        if (!hasToken()) {
            alert('Usuário não logado!');
            navigate('/login');
            return;
        }

        
        userService.getById(Number(id)).then(user => {
            setName(user.name);
            setUsername(user.username);
            setSelectedProfiles(user.roles || []); 
        }).catch((error: Error) => {
            if (error.cause === 404) {
                alert('Usuário não existe!');
                navigate(-1);
            } else {
                alert('Erro ao carregar o usuário!');
                navigate('/login');
            }
        });

        
        roleService.getRoles().then(fetchedRoles => {
            setRoles(fetchedRoles); 
        }).catch(error => {
            alert('Erro ao carregar os papéis!');
            navigate('/login');
        });
    }, [id, navigate]); 

    function goBack() {
        navigate(-1);
    }

    function handleProfileChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedProfiles(options);
    }

    function save() {
        if (!name.trim()) {
            alert('Nome do usuário é obrigatório');
            return;
        }

        const user = {
            id: Number(id),
            name,
            username,
            roles: selectedProfiles 
        };

        userService.update(user).then(saved => {
            alert('Usuário salvo com sucesso!');
            goBack();
        }).catch(error => {
            alert('Sua sessão expirou!');
            navigate('/login');
        });
    }

    return (
        <div className='user-page'>
            <header>Usuário Id: {id}</header>
            
            <main>
                <MyInput id='name' label='Nome' value={name} change={setName} />
                <MyInput id='username' label='Login' value={username} change={setUsername} />

                <div className='user-page'>
                    <label htmlFor="profileCount">Selecionar Perfis</label>
                    <select
                        id="profileCount"
                        multiple 
                        value={selectedProfiles}
                        onChange={handleProfileChange} 
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
