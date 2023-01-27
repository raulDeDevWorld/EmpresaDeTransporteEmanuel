import { handleSignOut, getData, removeData, writeUserData } from '../firebase/utils'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Modal from '../components/Modal'
import Button from '../components/Button'

import Error from '../components/Error'
import Navbar from '../components/Navbar'

import { useEffect } from 'react'

import Success from '../components/Success'
import style from '../styles/Admin.module.css'

function Users() {
    const { user, userDB, setUserData, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState(false)
    const [itemSelect, setItemSelect] = useState('')
    const [filter, setFilter] = useState('')

    const [filterInput, setFilterInput] = useState('Alfabetico')

    const [forms, setForms] = useState([])

    const router = useRouter()

    function push(e) {
        e.preventDefault()

        if (userDB && userDB.users[user.uid] && userDB.users[user.uid].rol == 'N/A') {
            setUserSuccess('N/A')
            return
        }
        if (userDB && userDB.users[user.uid] == undefined) {
            setUserSuccess('Eliminado')
            return
        }
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

        if (userDB.forms[itemSelect].state == true) {
            writeUserData(`forms/${itemSelect}`, { state: false }, setUserSuccess)
            getData(`/`, setUserData)
            console.log('pape');

            return
        }
        if (userDB && userDB.users[user.uid].rol == 'Admin' && userDB.forms[itemSelect].state == false) {
            // removeData(`users/${user.uid}/forms`, setUserData, setUserSuccess)
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

    function autor(item) {
        setMode('autor')
        setItemSelect(item)
    }

    function handlerOnChange(e) {
        // e.target.value
        setFilter(e.target.value)
    }
    function x() {
        setMode(null)
    }
    function signOut(e) {
        e.preventDefault()
        handleSignOut()
    }
    function handlerFilterInput(e, data) {
        setFilterInput(data)

        if (data == 'Fecha') {
            userDB.forms && setForms(Object.values(userDB.forms).sort((a, b) => new Date(b.date) - new Date(a.date)))
        }

    }

    return (
        <div className={style.container}>
            <Navbar></Navbar>

            {userDB && userDB.users[user.uid] !== 'Admin' && <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Admin{router.pathname}</h4>

                <input className={style.filter} onChange={handlerOnChange} placeholder='Buscar Por Placa' />

                <Button style={filterInput == 'Fecha' ? 'buttonPrimary' : 'buttonSecondary'} click={(e) => handlerFilterInput(e, 'Fecha')}>Fecha</Button>
                <Button style={filterInput == 'Alfabetico' ? 'buttonPrimary' : 'buttonSecondary'} click={(e) => handlerFilterInput(e, 'Alfabetico')}>Alfabetico</Button>

                {userDB && userDB.users[user.uid] && userDB.users[user.uid].rol === 'Admin' &&
                    <ul className={style.list}>
                        {filterInput == 'Alfabetico' && userDB && userDB.forms && Object.keys(userDB.forms).map((item, i) => {
                            if (userDB.forms[item] && userDB.forms[item].placa && userDB.forms[item].placa.includes(filter)) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item}`} >
                                        <a className={` ${userDB.forms[item].state == false ? style.papelera : style.link}`}>{item}</a>
                                    </Link>
                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(userDB.forms[item].autor)}>{new Date(userDB.forms[item].date).getDate()}/{new Date(userDB.forms[item].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item].date).getMonth() + 1}` : new Date(userDB.forms[item].date).getMonth() + 1}</span>
                                        {userDB.forms[item].state == false
                                            ? <Image src="/Restore.svg" width="25" height="25" alt="User" onClick={() => papelera(item)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                    </div>
                                </div>
                            }
                            if (filter == '' && userDB.forms[item] && userDB.forms[item].placa && userDB.forms[item].placa) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item}`} >
                                        <a className={` ${userDB.forms[item].state == false ? style.papelera : style.link}`}>{item}</a>
                                    </Link>

                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(userDB.forms[item].autor)}>{new Date(userDB.forms[item].date).getDate()}/{new Date(userDB.forms[item].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item.id].date).getMonth() + 1}` : new Date(userDB.forms[item.id].date).getMonth() + 1}</span>
                                        {userDB.forms[item].state == false
                                            ? <Image src="/Restore.svg" width="25" height="25" alt="User" onClick={() => papelera(item)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                    </div>
                                </div>
                            }
                        }
                        )}


                        {filterInput == 'Fecha' && forms.length > 0 && forms.map((item, i) => {


                            if (userDB.forms && userDB.forms[item.id] && userDB.forms[item.id].placa && userDB.forms[item.id].placa.includes(filter)) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item.id}`} >
                                        <a className={` ${userDB.forms[item.id].state == false ? style.papelera : style.link}`}>{item.id}</a>
                                    </Link>
                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(item.autor)}>{new Date(userDB.forms[item.id].date).getDate()}/{new Date(userDB.forms[item.id].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item.id].date).getMonth() + 1}` : new Date(userDB.forms[item.id].date).getMonth() + 1}</span>
                                        {userDB.forms[item.id].state == false
                                            ? <Image src="/Restore.svg" width="25" height="25" alt="User" onClick={() => papelera(item.id)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item.id)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item.id)} />
                                    </div>
                                </div>
                            }




                            if (filter == '' && userDB.forms && userDB.forms[item.id] && userDB.forms[item.id].placa) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item.id}`} >
                                        <a className={` ${userDB.forms[item].state == false ? style.papelera : style.link}`}>{item}</a>
                                    </Link>
                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(item.autor)}>{new Date(userDB.forms[item.id].date).getDate()}/{new Date(userDB.forms[item.id].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item.id].date).getMonth() + 1}` : new Date(userDB.forms[item.id].date).getMonth() + 1}</span>
                                        {userDB.forms[item.id].state == false
                                            ? <Image src="/Restore.svg" width="25" height="25" alt="User" onClick={() => papelera(item.id)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item.id)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item.id)} />
                                    </div>
                                </div>
                            }




                        }
                        )}




                    </ul>
                }

                {userDB && userDB.users[user.uid] && userDB.users[user.uid].rol == 'AdmSe' &&

                    <ul className={style.list}>




                        {filterInput == 'Alfabetico' && userDB.users && userDB.users[user.uid].forms && Object.keys(userDB.users[user.uid].forms).map((item, i) => {
                            if (userDB.forms[item] && userDB.forms[item].placa && userDB.forms[item].placa.includes(filter) && userDB.forms[item].state == true) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item}`} >
                                        <a className={` ${userDB.forms[item].state == false ? style.papelera : style.link}`}>{item}</a>
                                    </Link>
                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(userDB.forms[item].autor)}>{new Date(userDB.forms[item].date).getDate()}/{new Date(userDB.forms[item].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item].date).getMonth() + 1}` : new Date(userDB.forms[item].date).getMonth() + 1}</span>
                                        {userDB.forms[item].state == false
                                            ? <Image src="/Config.svg" width="24" height="25" alt="User" onClick={() => papelera(item)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                    </div>
                                </div>
                            }
                            if (filter == '' && userDB.forms[item] && userDB.forms[item].placa && userDB.forms[item].placa && userDB.forms[item].state == true) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item}`} >
                                        <a className={` ${userDB.forms[item].state == false ? style.papelera : style.link}`}>{item}</a>
                                    </Link>

                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(userDB.forms[item].autor)}>{new Date(userDB.forms[item].date).getDate()}/{new Date(userDB.forms[item].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item].date).getMonth() + 1}` : new Date(userDB.forms[item].date).getMonth() + 1}</span>
                                        {userDB.forms[item].state == false
                                            ? <Image src="/Config.svg" width="24" height="25" alt="User" onClick={() => papelera(item)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item)} />
                                    </div>
                                </div>
                            }
                        }
                        )}


                        {filterInput == 'Fecha' && forms.length > 0 && forms.map((item, i) => {


                            if (filter !== '' && userDB.forms && userDB.forms[item.id] && userDB.forms[item.id].placa && userDB.users[user.uid].forms[item.id] && userDB.forms[item.id].placa.includes(filter) && userDB.forms[item].state == true) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item.id}`} >
                                        <a className={` ${userDB.forms[item.id].state == false ? style.papelera : style.link}`}>{item.id}</a>
                                    </Link>
                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(item.autor)}>{new Date(userDB.forms[item.id].date).getDate()}/{new Date(userDB.forms[item.id].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item.id].date).getMonth() + 1}` : new Date(userDB.forms[item.id].date).getMonth() + 1}</span>
                                        {userDB.forms[item.id].state == false
                                            ? <Image src="/Config.svg" width="24" height="25" alt="User" onClick={() => papelera(item.id)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item.id)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item.id)} />
                                    </div>
                                </div>
                            }




                            if (filter == '' && userDB.users[user.uid].forms[item.id] && userDB.forms[item.id].state == true) {
                                return <div className={style.items} key={i}>
                                    <Link href="validator/[User]" as={`validator/${item.id}`} >
                                        <a className={` ${userDB.forms[item.id].state == false ? style.papelera : style.link}`}>{item.id}</a>
                                    </Link>
                                    <div className={style.items}>
                                        <span className={style.rol} onClick={() => autor(item.autor)}>{new Date(userDB.forms[item.id].date).getDate()}/{new Date(userDB.forms[item.id].date).getMonth() + 1 < 10 ? `0${new Date(userDB.forms[item.id].date).getMonth() + 1}` : new Date(userDB.forms[item.id].date).getMonth() + 1}</span>
                                        {userDB.forms[item.id].state == false
                                            ? <Image src="/Config.svg" width="24" height="25" alt="User" onClick={() => papelera(item.id)} />
                                            : <Image src="/Edit.svg" width="25" height="25" alt="User" onClick={() => edit(item.id)} />}
                                        <Image src="/Delete.svg" width="25" height="25" alt="User" onClick={() => remove(item.id)} />
                                    </div>
                                </div>
                            }
                        }
                        )}

                    </ul>
                }


                {userDB && userDB.users[user.uid] && userDB.users[user.uid].rol == 'N/A' &&

                    <ul className={style.list}>
                        NOTIFICACIÓN: <br />
                        Estimado usuario su cuenta no esta verificada, contactese por favor con el administrador, GRACIAS...

                    </ul>
                }
                {userDB && userDB.users[user.uid] == undefined &&

                    <ul className={style.list}>
                        NOTIFICACIÓN: <br />
                        Estimado usuario su cuenta ha sido eliminada, contactese por favor con el administrador, GRACIAS...

                    </ul>
                }

                <button className={style.add} onClick={push}>+</button>
            </main>}
            {mode == 'remove' && <Modal mode={mode} click={x} confirm={removeConfirm} text={`Estas por eliminar a: ${itemSelect.toUpperCase()}`}></Modal>}
            {mode == 'papelera' && <Modal mode={mode} click={x} confirm={papeleraConfirm} text={`Estas por restaurar a: ${itemSelect.toUpperCase()}`}></Modal>}
            {mode == 'autor' && <Modal mode={mode} click={x} confirm={x} text={userDB.users[itemSelect] ? <span>Este formulario fue llenado por: <br />   {userDB.users[itemSelect].email}</span> : 'El usuario que creo este formulario ha sido Eliminado'}></Modal>}
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}
            {success == 'N/A' && <Error>Su Cuenta No Esta Verificada</Error>}
            {success == 'Eliminado' && <Error>Su Cuenta ha sido eliminada</Error>}


        </div>

    )
}

export default WithAuth(Users) 