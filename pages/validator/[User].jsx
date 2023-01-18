import { getSpecificData } from '../../firebase/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useUser } from '../../context/Context.js'
import style from '../../styles/User.module.css'

function User() {

    const { userDB, specificData, setUserSpecificData } = useUser()
    const router = useRouter()

    useEffect(() => {
        const query = router.query.User
        getSpecificData(`forms/${query}`, setUserSpecificData)
    });

    return (
        <div className={style.container}>
            {specificData && <main>
                <div className={style.box}>
                    <div className={style.image}>
                        <Image src="/logo.png" width="400" height="116" alt="Escudo" ></Image>
                    </div>
                    {specificData && <p className={style.paragraph}> <strong>VALIDACIÓN DE<br />HOJA DE RUTA</strong> <br />Autorizado por: {specificData.autorizadoPor}</p>}
                </div>

                <table className={style.table}>
                    {specificData && <tbody>
                        <tr>
                            <td>N° de preimpreso: {specificData.preimpreso}</td>
                        </tr>
                        <tr>
                            <td>N° de trámite: {specificData.tramite}</td>
                        </tr>
                        <tr>
                            <td>Estado: {specificData.estado}</td>
                        </tr>
                        <tr>
                            <td>Vigencia: {specificData.vigencia}</td>
                        </tr>
                        <tr>
                            <td>Traspaso ó N° RA/ACL: {specificData.traspaso}</td>
                        </tr>
                        <tr>
                            <td>Movilidad Placa:  {specificData.placa}</td>
                        </tr>
                        <tr>
                            <td>Porteador: {specificData.porteador}</td>
                        </tr>
                        <tr>
                            <td>Fecha de registro en sistema: {specificData.fecha}</td>
                        </tr>
                        <tr>
                            <td>Autoriza al registro:  {specificData.autoriza}</td>
                        </tr>
                        <tr>
                            <td>Solicitado por: {specificData.solicitado}</td>
                        </tr>
                        <tr>
                            <td>Comprar a su proveedor: {specificData.proveedor}</td>
                        </tr>
                        <tr>
                            <td>Para ser utilizada en: {specificData.uso}</td>
                        </tr>
                        <tr>
                            <td>Origen del transporte: {specificData.origen}</td>
                        </tr>
                        <tr>
                            <td>Destino del transporte: {specificData.destino}</td>
                        </tr>
                        <tr>
                            <td>Ruta del transporte: {specificData.ruta}</td>
                        </tr>
                        <tr>
                            <td>Sustancia: {specificData.sustancia}</td>
                        </tr>
                    </tbody>}
                </table>

            </main>}
        </div>
    )
}

export default User