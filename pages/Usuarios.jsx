import { handleSignOut, getData, removeData } from '../firebase/utils'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Modal from '../components/Modal'
import Error from '../components/Error'
import Button from '../components/Button'

import Navbar from '../components/Navbar'
import { useEffect } from 'react'

import Success from '../components/Success'
import style from '../styles/Admin.module.css'

function Users() {
    const { user, userDB, setUserData, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState('')
    const [itemSelect, setItemSelect] = useState('')
    const router = useRouter()

    function push(e) {
        e.preventDefault()
        router.push('/AddUser')
    }
    // function edit(item) {
    //     router.push(`/update/${item}`)
    // }
    function remove(item) {
        setMode('remove')
        setItemSelect(item)
    }
    function removeConfirm() {
        console.log(userDB.forms[itemSelect].state == true);

       if ( userDB.forms[itemSelect].state == true ) {

        // writeUserData(`users/${user.uid}/forms`, { [itemSelect]: false }, setUserSuccess)
        writeUserData(`forms/${itemSelect}`, { state: false }, setUserSuccess)
        getData(`/`, setUserData)
        console.log('pape');

        return
       }
       if ( userDB && userDB.users[user.uid].rol == 'Admin' && userDB.forms[itemSelect].state == false ) {
        removeData(`users/${user.uid}/forms`, setUserData, setUserSuccess)
        removeData(`forms/${itemSelect}`, setUserData, setUserSuccess)
        console.log('eli');
        getData(`/`, setUserData)
      }
    }

    function edit(item) {
        setMode('edit')
        setItemSelect(item)
    }
    function editConfirm() {
        writeUserData(`users/${user.uid}/forms`, { [itemSelect]: true }, setUserSuccess)
        writeUserData(`forms/${itemSelect}`, { state: true }, setUserSuccess)
        getData(`/`, setUserData)
    }

    function x() {
        setMode(null)
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
{   itemSelect !== '' &&  mode == 'remove' &&        <Modal mode={mode} click={x} confirm={removeConfirm} text={`Estas por eliminar a: ${userDB.users[itemSelect].email}`}></Modal>}
{   itemSelect !== '' &&  mode == 'edit' &&        <Modal mode={mode} click={x} confirm={editConfirm} text={`Asignar un rol a: ${userDB.users[itemSelect].email}`}>
<Button style={userDB.users[itemSelect].rol == 'N/A'?'buttonPrimary':'buttonSecondary'}>N/A</Button><Button style={userDB.users[itemSelect].rol == 'Admin'?'buttonPrimary':'buttonSecondary'}>Admin</Button><Button style={userDB.users[itemSelect].rol == 'AdminSec'?'buttonPrimary':'buttonSecondary'}>Admin Sec</Button>
    </Modal>}
     
           
           
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}
        </div>

    )
}

export default WithAuth(Users) 