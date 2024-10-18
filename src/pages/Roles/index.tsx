import React from 'react';
import MyInput from '../../components/MyInput';
import HeaderButton from '../../components/HeaderButton'
import { useNavigate } from 'react-router-dom'
import { roleService } from '../../services/role.service';
import { Role } from '../../models/role';

export default function RolesPage() {
  const navigate = useNavigate()
  const [roles, setRoles] = React.useState<Role[]>([])

  function logOut() {
        navigate(-1)
}

function fetchRoles() {
  roleService.getRoles()
      .then(list => setRoles(list))
      .catch(error => {
          alert('Sua sessão expirou!')
          navigate('/login')
      })
}

React.useEffect(() => {
  fetchRoles()
}, [])

function goToCreatePerfil() {
  navigate('/perfil/create')
}

function update(id: number) {
  navigate(`/perfil/${id}/edit`)
}

function remove(id: number) {
  roleService.delete(id).then(isDeleted => {
      if (!isDeleted) alert('Perfil não encontrado')
      fetchRoles()
  })
}

  return (
    <div >
    <header>
        <HeaderButton text='Sair' click={logOut} />

        Perfil
        <HeaderButton text="Novo" click={goToCreatePerfil} />
    </header>

    <main>
                { roles.map(role => (
                    <div key={role.name} className='list-item'>
                        <div>{role.name}</div>
                        <div>{role.description}</div>
                        <div>
                            <button className='editButton' onClick={() => update(role.id!)}>Editar</button>
                            <button className='delButton' onClick={() => remove(role.id!)}>Remover</button>
                        </div>
                    </div>
                ))}
            </main>

    </div>
  );
}
