"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import classNames from "classnames"
import { ChangeEvent, useState } from "react";
import { signinApi } from "@/api/users";


export default function SignInPage() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    // const { login } = ???;
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };



      const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signinApi(loginData).then((data) => {
         //login?
        });
      };
    return (
        <div className={styles.wrapper}>
            <div className={styles.containerEnter}>
                <div className={styles.modalBlock}>
                    <form className={styles.modalFormLogin} action="#">
                        <Link href="/signin">
                            <div className={styles.modalLogo}>
                                <Image width={140} height={21} src="/img/logo_modal.png" alt="logo" />
                            </div>
                        </Link>
                        <input
                            className={classNames(styles.modalInput, styles.login)}
                            type="text"
                            name="login"
                            placeholder="Почта"
                        />
                        <input
                            className={classNames(styles.modalInput, styles.password)}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <button onClick={handleLogin} className={styles.modalBtnEnter}>
                            <Link href="/">Войти</Link>
                        </button>
                        <button className={styles.modalBtnSignup}>
                            <Link href="/signup">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

