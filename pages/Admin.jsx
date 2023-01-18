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

import Success from '../components/Success'
import style from '../styles/Admin.module.css'

function Admin() {
    const { userDB, setUserData, setUserSuccess, success } = useUser()
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
        removeData(`${itemSelect}`, setUserData, setUserSuccess)
        getData(setUserData)
    }
    function x() {
        setMode(!mode)
    }
    function signOut(e) {
        e.preventDefault()
        handleSignOut()
    }

    return (
        <div className={style.container}>
            <Navbar></Navbar>

            <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Administrador</h4>

                {userDB && <ul className={style.list}>
                    {Object.keys(userDB).map((item, i) =>
                        <div className={style.items} key={i}>
                            <Link href="validator/[User]" as={`validator/${item}`} >
                                <a className={style.link}>{item}</a>
                            </Link>
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
            <Modal mode={mode} click={x} confirm={removeConfirm} text={`Estas por eliminar a: ${itemSelect.toUpperCase()}`}></Modal>
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}
        </div>

    )
}

export default WithAuth(Admin) 