import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { hasToken } from '../../services/auth.service'; 
import MyInput from '../../components/MyInput';

import './index.scss';
import { Role } from '../../models/role';
import { roleService } from '../../services/role.service';

export default function EditRolePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [description, setDescricao] = React.useState('');
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        if (!hasToken()) {
            alert('Usuário não logado!');
            navigate('/login');
            return;
        }

        // Carregar o perfil com base no id
        roleService.getRolesById(Number(id)).then(role => {
            setDescricao(role.description);
            setName(role.name);
        }).catch((error: Error) => {
            if (error.cause === 404) {
                alert('Perfil não existe!');
                navigate(-1);
            } else {
                alert('Erro ao carregar o perfil!');
                navigate('/login');
            }
        });
    }, [id, navigate]);

    function goBack() {
        navigate(-1);
    }

    function save() {
        if (!description.trim()) {
            alert('Descrição é obrigatória');
            return;
        }

        const role: Role = { id: Number(id), name, description };
        console.log('Atualizando perfil:', role); 
        
        roleService.update(role).then(() => {
            alert('Perfil atualizado com sucesso!');
            goBack();
        }).catch(error => {
            alert('Erro ao atualizar o perfil ou sua sessão expirou.');
            navigate('/login');
        });
    }

    return (
        <div className='user-page'>
            <header>Perfil Id: {id}</header>
            
            <main style={{ height: 100 }}>
                {/* Inputs de nome e descrição do perfil */}
                <MyInput id='name' label='Nome' value={name} change={setName} />
                <MyInput id='descricao' label='Descrição' value={description} change={setDescricao} />
            </main>

            <footer>
                <button className='goBack' onClick={goBack}>Cancelar</button>
                <button onClick={save}>Salvar</button>
            </footer>
        </div>
    );
}
