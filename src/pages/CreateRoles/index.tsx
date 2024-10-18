import React from 'react';
import MyInput from '../../components/MyInput';
import HeaderButton from '../../components/HeaderButton'
import { useNavigate } from 'react-router-dom'
import { Role } from '../../models/role'
import { roleService } from '../../services/role.service';

export default function CreateRolesPage() {

    const navigate = useNavigate()

    const [name, setName] = React.useState('')
    const [description, setDescricao] = React.useState('')

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === null || name.trim() === '') {
            alert('Nome do perfil é obrigatório')
            return
        }
        if (description === null || description.trim() === '') {
            alert('Descricao do perfil é obrigatório')
            return
        }
            const role: Role = { name, description }

            roleService.create(role).then(saved => {
                alert('Perfil salvo com sucesso!')
                goBack()
            }).catch((error: Error) => {
                if (error.cause === 400) {
                    alert('Perfil já existe')
                } else {
                    alert('Sua sessão expirou!')
                    navigate('/login')
                }
            })
    }



  return  (    
  
  <div className='user-page'>
  <header>Novo Perfil</header>
  
  <main>
      <MyInput id='nameP' label='Nome' value={name} change={setName} />
      <MyInput id='DescricaoP' label='Descricao' value={description} change={setDescricao} />

  </main>

  <footer>
      <button className='goBack' onClick={goBack}>Cancelar</button>
      <button onClick={save}>Salvar</button>
  </footer>
</div>
)
    }