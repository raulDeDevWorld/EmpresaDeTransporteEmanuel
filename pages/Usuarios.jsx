import { handleSignOut, getData, removeData, writeUserData } from '../firebase/utils'
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
    const [rol, setRol] = useState('')
    const [filter, setFilter] = useState('')

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


        if (userDB && userDB.users[user.uid] && userDB.users[user.uid].rol == 'Admin') {
            setItemSelect('')
            removeData(`users/${itemSelect}/`, setUserData, setUserSuccess)
            console.log('eli');
            getData(`/`, setUserData)
            console.log('admin');

        }
    }

    function edit(item) {
        setRol(userDB.users[item].rol)
        setMode('edit')
        setItemSelect(item)
    }
    function editRol(data) {
        setRol(data)
    }
    function editConfirm() {
        writeUserData(`users/${itemSelect}/`, { rol, }, setUserSuccess)
        getData(`/`, setUserData)
    }

    function x() {
        setMode(null)
    }
    function signOut(e) {
        e.preventDefault()
        handleSignOut()
    }
    console.log(rol)
    function handlerOnChange(e) {
        // e.target.value
        setFilter(e.target.value)
    }
    useEffect(() => {
        userDB && userDB.users[user.uid] && userDB.users[user.uid].rol !== 'Admin' && router.push('/Formularios')
    }, [userDB])

    return (
        <div className={style.container}>
            <Navbar></Navbar>

            {userDB && userDB.users && <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Admin{router.pathname}</h4>
                <input className={style.filter} onChange={handlerOnChange} placeholder='Buscar Por Email' />
                {userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol == 'Admin' && <ul className={style.list}>
                    {Object.keys(userDB.users).map((item, i) => {
                        if (userDB.users[item].email.includes(filter) && user.uid !== item) {
                            return <div className={style.items} key={i}>
                                <Link href="#" >
                                    <a className={style.link}>{userDB.users[item].email}</a>
                                </Link>
                                <div className={style.items}>
                                    <span className={style.rol}>{userDB.users[item].rol}</span>

                                    <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />
                                    <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                </div>
                            </div>
                        }

                        if (filter == '' && user.uid !== item) {
                            return <div className={style.items} key={i}>
                                <Link href="validator/[User]" as={`validator/${item}`} >
                                    <a className={style.link}>{userDB.users[item].email}</a>
                                </Link>
                                <div className={style.items}>
                                    <span className={style.rol}>{userDB.users[item].rol}</span>
                                    <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />
                                    <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                </div>
                            </div>
                        }
                    }
                    )}
                </ul>}
                {userDB && userDB.users[user.uid] == undefined &&

                    <ul className={style.list}>
                        NOTIFICACIÓN: <br />
                        Estimado usuario su cuenta ha sido eliminada, contactese por favor con el administrador, GRACIAS...

                    </ul>
                }
            </main>}
            {itemSelect !== '' && mode == 'remove' && <Modal mode={mode} click={x} confirm={removeConfirm} text={`Estas por eliminar a: ${userDB.users[itemSelect].email}`}></Modal>}
            {itemSelect !== '' && mode == 'edit' && <Modal mode={mode} click={x} confirm={editConfirm} text={`Asignar un rol a: ${userDB.users[itemSelect].email}`}>
                <Button style={rol == 'N/A' ? 'buttonPrimary' : 'buttonSecondary'} click={() => editRol('N/A')}>N/A</Button>
                <Button style={rol == 'Admin' ? 'buttonPrimary' : 'buttonSecondary'} click={() => editRol('Admin')}>Admin</Button>
                <Button style={rol == 'AdmSe' ? 'buttonPrimary' : 'buttonSecondary'} click={() => editRol('AdmSe')}>Admin Sec</Button>
            </Modal>}
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}
        </div>
    )
}

export default WithAuth(Users) 