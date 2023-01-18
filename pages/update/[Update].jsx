import { writeUserData, getSpecificData } from '../../firebase/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useUser } from '../../context/Context'
import { WithAuth } from '../../HOCs/WithAuth'
import Button from '../../components/Button'
import Error from '../../components/Error'
import Success from '../../components/Success'
import style from '../../styles/AddUser.module.css'

function AddUser() {

    const { userDB, setUserSuccess, success } = useUser()
    const { specificData, setUserSpecificData } = useUser(null)
    const router = useRouter()

    function save(e) {
        e.preventDefault()
        const object = {
            preimpreso: e.target.form[0].value.length > 0 ? e.target.form[0].value : specificData.preimpreso,
            tramite: e.target.form[1].value.length > 0 ? e.target.form[1].value : specificData.tramite,
            estado: e.target.form[2].value.length > 0 ? e.target.form[2].value : specificData.estado,
            vigencia: e.target.form[3].value.length > 0 ? e.target.form[3].value : specificData.vigencia,
            traspaso: e.target.form[4].value.length > 0 ? e.target.form[4].value : specificData.traspaso,
            placa: e.target.form[5].value.length > 0 ? e.target.form[5].value : specificData.placa,
            porteador: e.target.form[6].value.length > 0 ? e.target.form[6].value : specificData.porteador,
            fecha: e.target.form[7].value.length > 0 ? e.target.form[7].value : specificData.fecha,
            autoriza: e.target.form[8].value.length > 0 ? e.target.form[8].value : specificData.autoriza,
            solicitado: e.target.form[9].value.length > 0 ? e.target.form[9].value : specificData.solicitado,
            proveedor: e.target.form[10].value.length > 0 ? e.target.form[10].value : specificData.proveedor,
            uso: e.target.form[11].value.length > 0 ? e.target.form[11].value : specificData.uso,
            origen: e.target.form[12].value.length > 0 ? e.target.form[12].value : specificData.origen,
            destino: e.target.form[13].value.length > 0 ? e.target.form[13].value : specificData.destino,
            ruta: e.target.form[14].value.length > 0 ? e.target.form[14].value : specificData.ruta,
            sustancia: e.target.form[15].value.length > 0 ? e.target.form[15].value : specificData.sustancia,
            id: e.target.form[16].value.length > 0 ? e.target.form[16].value : specificData.id,
            autorizadoPor: e.target.form[17].value.length > 0 ? e.target.form[17].value : specificData.autorizadoPor,
        }
        writeUserData(object, setUserSuccess)
    }

    useEffect(() => {
        const query = router.query.Update
        console.log(query)
        getSpecificData(query, setUserSpecificData)
    }, [specificData]);

    return (

        <div className={style.container}>
            {specificData && <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Administrador</h4>

                <form className={style.form}>
                    <h4 className={style.subtitle}>AÑADIR NUEVO USUARIO</h4>
                    <label>
                        N° de preimpreso:
                        <input className={style.input} type="text" placeholder={`${specificData.preimpreso}`} defaultValue={`${specificData.preimpreso}`} />
                    </label>
                    <label>
                        N° de trámite:
                        <input className={style.input} type="text" placeholder={`${specificData.tramite}`} defaultValue={`${specificData.tramite}`}/>
                    </label>
                    <label>
                        Estado:
                        <input className={style.input} type="text" placeholder={`${specificData.estado}`} defaultValue={`${specificData.estado}`}/>
                    </label>
                    <label>
                        Vigencia:
                        <input className={style.input} type="text" placeholder={`${specificData.vigencia}`} defaultValue={`${specificData.vigencia}`}/>
                    </label>
                    <label>
                        Traspaso ó N° RA/ACL:
                        <input className={style.input} type="text" placeholder={`${specificData.traspaso}`} defaultValue={`${specificData.traspaso}`}/>
                    </label>
                    <label>
                        Movilidad Placa:
                        <input className={style.input} type="text" placeholder={`${specificData.placa}`} defaultValue={`${specificData.placa}`}/>
                    </label>
                    <label>
                        Porteador:
                        <input className={style.input} type="text" placeholder={`${specificData.porteador}`} defaultValue={`${specificData.porteador}`}/>
                    </label>
                    <label>
                        Fecha de registro en sistema:
                        <input className={style.input} type="text" placeholder={`${specificData.fecha}`} defaultValue={`${specificData.fecha}`}/>
                    </label>
                    <label>
                        Autoriza al registro:
                        <input className={style.input} type="text" placeholder={`${specificData.autoriza}`} defaultValue={`${specificData.autoriza}`}/>
                    </label>
                    <label>
                        Solicitado por:
                        <input className={style.input} type="text" placeholder={`${specificData.solicitado}`} defaultValue={`${specificData.solicitado}`}/>
                    </label>
                    <label>
                        Comprar a su proveedor:
                        <input className={style.input} type="text" placeholder={`${specificData.proveedor}`} defaultValue={`${specificData.proveedor}`}/>
                    </label>
                    <label>
                        Para ser utilizada en:
                        <input className={style.input} type="text" placeholder={`${specificData.uso}`} defaultValue={`${specificData.uso}`}/>
                    </label>
                    <label>
                        Origen del transporte:
                        <input className={style.input} type="text" placeholder={`${specificData.origen}`} defaultValue={`${specificData.origen}`}/>
                    </label>
                    <label>
                        Destino del transporte:
                        <input className={style.input} type="text" placeholder={`${specificData.destino}`} defaultValue={`${specificData.destino}`}/>
                    </label>
                    <label>
                        Ruta del transporte:
                        <input className={style.input} type="text" placeholder={`${specificData.ruta}`} defaultValue={`${specificData.ruta}`}/>
                    </label>
                    <label>
                        Sustancia:
                        <input className={style.input} type="text" placeholder={`${specificData.sustancia}`} defaultValue={`${specificData.sustancia}`}/>
                    </label>
                    <label>
                        ID:
                        <input className={style.input} type="text" placeholder={`${specificData.id}`} defaultValue={`${specificData.id}`}/>
                    </label>
                    <label>
                        Autorizado por:
                        <input className={style.input} type="text" placeholder={`${specificData.autorizadoPor}`} defaultValue={`${specificData.autorizadoPor}`}/>
                    </label>
                    <div className={style.buttonsContainer}>
                        <Button style='buttonPrimary' click={save}>Guardar</Button>
                    </div>

                </form>
            </main>}
            {success == 'save' && <Success>Correcto</Success>}
            {success == 'repeat' && <Error>Verifica e intenta de nuevo</Error>}

        </div>
    )
}

export default WithAuth(AddUser) 