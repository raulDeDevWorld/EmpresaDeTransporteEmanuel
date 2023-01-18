import { handleSignOut, getData, removeData } from '../firebase/utils'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Modal from '../components/Modal'
import Error from '../components/Error'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'

import Success from '../components/Success'
import style from '../styles/Admin.module.css'

function Users() {
    const {user, userDB, setUserData, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState(false)
    const [itemSelect, setItemSelect] = useState('')
    const router = useRouter()

    function push(e) {
        e.preventDefault()
        router.push('/AddUser')
    }
    function edit(item) {
        router.push(`/update/${item}`)
    }
    function remove(item) {
        setMode(!mode)
        setItemSelect(item)
    }
    function removeConfirm() {
        removeData(`users/${itemSelect}`, setUserData, setUserSuccess)
        getData(setUserData)
    }
    function x() {
        setMode(!mode)
    }
    function signOut(e) {
        e.preventDefault()
        handleSignOut()
    }

    useEffect(() => {
        userDB && userDB.users[user.uid].rol !== 'Admin' && router.push('/Formularios')
     }, [userDB])

    return (
        <div className={style.container}>
            <Navbar></Navbar>

            <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Admin{router.pathname}</h4>

                {userDB && <ul className={style.list}>
                    {Object.keys(userDB.users).map((item, i) =>
                        <div className={style.items} key={i}>
                            <Link href="validator/[User]" as={`validator/${item}`} >
                                <a className={style.link}>{userDB.users[item].email}</a>
                            </Link>
                            <span>{userDB.users[item].rol}</span>
                            <div>
                                <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />
                                <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                            </div>
                        </div>
                    )}
                </ul>}

                {/* <button className={style.logout} onClick={signOut}>Cerrar Sesión</button>
                <button>+</button>
                <button>Users</button>
                <button className={style.add} onClick={push}>Añadir</button> */}
            </main>
{   itemSelect !== '' &&        <Modal mode={mode} click={x} confirm={removeConfirm} text={`Estas por eliminar a: ${userDB.users[itemSelect].email}`}></Modal>}
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}
        </div>

    )
}

export default WithAuth(Users) 