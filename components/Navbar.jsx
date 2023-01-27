import { handleSignOut } from '../firebase/utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { WithAuth } from '../HOCs/WithAuth'

import Button from '../components/Button'
import style from '../styles/Navbar.module.css'
import { useUser } from '../context/Context'

export default function Navbar() {
    const router = useRouter()


    const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()

    function logout() {
        handleSignOut()
    }
    function redirect(rute) {
        router.push(rute)
    }
    console.log(user)
    console.log(userDB)
  return (
    <header className={style.header}>
    <p>Bienvenido</p>
    <div className={style.containerButtons}>

        {user && userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol == 'Admin' &&
            <>
                <Button style='buttonSecondary' click={() => redirect('/Usuarios')}>
                    Usuarios
                </Button>
                <img src="/Users.svg" className={style.icon} alt="power" onClick={() => redirect('/Usuarios')} />
                <Button style='buttonSecondary' click={() => redirect('/Formularios')}>
                    Formularios
                </Button>
                <img src="/home.svg" className={style.icon} alt="power" onClick={() => redirect('/Formularios')} />
            </>}
        <Button style='buttonSecondary' click={logout}>
            Cerrar Sesion
        </Button>
        <img src="/power.svg" className={style.icon} alt="power" onClick={logout} />
    </div>
</header>
  )}