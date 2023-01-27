import { onAuth, signUpWithEmail, withGoogle } from '../firebase/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '../context/Context'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Error from '../components/Error'
import style from '../styles/Auth.module.css'

function Login() {
    const { user, setUserProfile, setUserSuccess, success } = useUser()
    const router = useRouter()

    function signUpWithGoogle(e) {
        e.preventDefault()
        withGoogle()
    }

    function signUpWithEmailAndPassword(e) {
        e.preventDefault()
        if (e.target.form[0].value.length < 3 || e.target.form[1].value.length < 3) {
            setUserSuccess('complete')
            return
        }
        const email = e.target.form[0].value
        const password = e.target.form[1].value
        signUpWithEmail(email, password)
    }

    useEffect(() => {
        onAuth(setUserProfile)
        if (user) router.replace('/Formularios')
    }, [user, success, setUserProfile, router]);

    return (
        <div className={style.container}>
            <main className={style.main}>
                <h1 className={style.title}>Empresa De Transporte Emanuel</h1>
                <Image src="/User.svg" width="100" height="100" alt="User" />
                <h4 className={style.subtitle}>Administrador</h4>
                <form className={style.form}>
                    <h4 className={style.subtitle}>REGISTRATE</h4>
                    <label>
                        Email:
                        <input className={style.input} type="text" placeholder="example@gmail.com" />
                    </label>
                    <label>
                        Contraseña:
                        <input className={style.input} type="password" placeholder="contraseña" />
                    </label>
                    <div className={style.buttonsContainer}>
                        <Button style='buttonPrimary' click={signUpWithEmailAndPassword}>Registrarme</Button>
                        {/* <Button style='buttonPrimary' click={signUpWithGoogle}>Continuar con Google</Button> */}
                    </div>
                    <div className={style.linkForm}>Ya tienes una cuenta? <Link href="/" ><a className={style.link}>Iniciar Sesion</a></Link></div>
                </form>
            </main>
            {success == 'complete' && <Error>Llene todo el formulario</Error>}
        </div>
    )
}

export default WithoutAuth(Login)