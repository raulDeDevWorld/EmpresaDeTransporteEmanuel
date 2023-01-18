import { handleSignOut, getData, removeData, writeUserData } from '../firebase/utils'
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
    const { user, userDB, setUserData, setUserSuccess, success } = useUser()
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

    function papelera(item) {
        setMode('papelera')
        setItemSelect(item)
    }
    function papeleraConfirm() {
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

    // useEffect(() => {
    //    userDB && userDB.users[user.uid] !== 'Admin' && router.push('/Usuarios')
    // }, [userDB])

    return (
        <div className={style.container}>
            <Navbar></Navbar>

            {userDB && userDB.users[user.uid] !== 'Admin' && <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Admin{router.pathname}</h4>




                {userDB && userDB.users[user.uid] && userDB.users[user.uid].rol == 'Admin' &&

                    <ul className={style.list}>

                        {Object.keys(userDB.forms).map((item, i) =>

                            <div className={style.items} key={i}>
                                <Link href="validator/[User]" as={`validator/${item}`} >
                                    <a className={` ${userDB.forms[item].state == false ? style.papelera : style.link}`}>{item}</a>
                                </Link>
                                <div>
                                    {userDB.forms[item].state == false
                                        ? <Image src="/Config.svg" width="24" height="25" alt="User" onClick={() => papelera(item)} />
                                        : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />}
                                    <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                </div>
                            </div>



                        )}

                    </ul>

                }



                {userDB && userDB.users[user.uid] && userDB.users[user.uid].rol == 'AdminSec' &&

                    <ul className={style.list}>

                        {userDB.users[user.uid].forms && Object.keys(userDB.users[user.uid].forms).map((item, i) => {

                            return userDB.forms[item].state == true
                                && <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item}`} >
                                        <a className={style.link}>{item}</a>
                                    </Link>
                                    <div>
                                        <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                    </div>
                                </div>
                        }
                        )}
                    </ul>
                }

                {userDB && userDB.users[user.uid] && userDB.users[user.uid].rol == 'NoVerificado' &&

                    <ul className={style.list}>
                        NOTIFICACIÓN: <br />
                        Estimado usuario su cuenta no esta verificada, contactese por favor con el administrador, GRACIAS...

                    </ul>
                }



                {/* <button className={style.logout} onClick={signOut}>Cerrar Sesión</button>
                <button>+</button>
                <button>Users</button>*/}
                <button className={style.add} onClick={push}>+</button>
            </main>}
            {mode == 'remove' && <Modal mode={mode} click={x} confirm={removeConfirm} text={`Estas por eliminar a: ${itemSelect.toUpperCase()}`}></Modal>}
            {mode == 'papelera' && <Modal mode={mode} click={x} confirm={papeleraConfirm} text={`Estas por restaurar a: ${itemSelect.toUpperCase()}`}></Modal>}
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}
        </div>

    )
}

export default WithAuth(Users) 