import { writeUserData } from '../firebase/utils'
import Image from 'next/image'
import { useUser } from '../context/Context'
import { WithAuth } from '../HOCs/WithAuth'
import Button from '../components/Button'
import Error from '../components/Error'
import Success from '../components/Success'
import style from '../styles/AddUser.module.css'

function AddUser() {
    const { user, setUserSuccess, success } = useUser()

    function save(e) {
        e.preventDefault()
        if (
            e.target.form[0].value.length < 3 || e.target.form[1].value.length < 3 ||
            e.target.form[2].value.length < 3 || e.target.form[3].value.length < 3 ||
            e.target.form[4].value.length < 3 || e.target.form[5].value.length < 3 ||
            e.target.form[6].value.length < 3 || e.target.form[7].value.length < 3 ||
            e.target.form[8].value.length < 3 || e.target.form[9].value.length < 3 ||
            e.target.form[10].value.length < 3 || e.target.form[11].value.length < 3 ||
            e.target.form[12].value.length < 3 || e.target.form[13].value.length < 3 ||
            e.target.form[14].value.length < 3 || e.target.form[15].value.length < 3 ||
            e.target.form[16].value.length < 3 || e.target.form[17].value.length < 3) {
            console.log('error')
            setUserSuccess('complete')
            return
        }

        const object = {
            preimpreso: e.target.form[0].value,
            tramite: e.target.form[1].value,
            estado: e.target.form[2].value,
            vigencia: e.target.form[3].value,
            traspaso: e.target.form[4].value,
            placa: e.target.form[5].value,
            porteador: e.target.form[6].value,
            fecha: e.target.form[7].value,
            autoriza: e.target.form[8].value,
            solicitado: e.target.form[9].value,
            proveedor: e.target.form[10].value,
            uso: e.target.form[11].value,
            origen: e.target.form[12].value,
            destino: e.target.form[13].value,
            ruta: e.target.form[14].value,
            sustancia: e.target.form[15].value,
            id: e.target.form[16].value.trim(),
            autorizadoPor: e.target.form[17].value,
            state: true,
            date: new Date(),
            autor: user.uid
        }
        writeUserData(`/forms/${object.id}`, object, setUserSuccess)
        writeUserData(`users/${user.uid}/forms`, { [object.id]: true}, setUserSuccess)

    }

    return (

        <div className={style.container}>
            <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Administrador</h4>

                <form className={style.form}>
                    <h4 className={style.subtitle}>AÑADIR NUEVO USUARIO</h4>
                    <label>
                        N° de preimpreso:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        N° de trámite:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Estado:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Vigencia:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Traspaso ó N° RA/ACL:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Movilidad Placa:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Porteador:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Fecha de registro en sistema:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Autoriza al registro:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Solicitado por:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Comprar a su proveedor:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Para ser utilizada en:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Origen del transporte:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Destino del transporte:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Ruta del transporte:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Sustancia:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        ID:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <label>
                        Autorizado por:
                        <input className={style.input} type="text" placeholder="" />
                    </label>
                    <div className={style.buttonsContainer}>
                        <Button style='buttonPrimary' click={save}>Guardar</Button>
                    </div>
                </form>

            </main>
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'complete' && <Error>Llene todo el formulario</Error>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}

        </div>

    )
}

export default WithAuth(AddUser) 