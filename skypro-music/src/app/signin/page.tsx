import Image from "next/image";
import Link from "next/link";



export default function SignInPage() {
    return (
        <div className="wrapper">
            <div className="container-enter">
                <div className="modal__block">
                    <form className="modal__form-login" action="#">
                        <Link href="/signin">
                            <div className="modal__logo">
                                <Image width={140} height={21} src="/img/logo_modal.png" alt="logo" />
                            </div>
                        </Link>
                        <input
                            className="modal__input login"
                            type="text"
                            name="login"
                            placeholder="Почта"
                        />
                        <input
                            className="modal__input password"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <button className="modal__btn-enter">
                            <Link href="/">Войти</Link>
                        </button>
                        <button className="modal__btn-signup">
                            <Link href="/signup">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

