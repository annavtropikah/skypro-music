
"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import classNames from "classnames"
import { ChangeEvent, useState } from "react";
import { signupApi } from "@/api/users";


export default function SignUpPage() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        username: "",
      });
    //   const { login } =???


      const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };


      const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signupApi(loginData).then(() => {
        //   login()
        });
      };




    return (
    
        <div className={styles.wrapper}>
            <div className={styles.containerSignup}>
                <div className={styles.modalBlock}>
                    <form className={styles.modalFormLogin}>
                        <Link href="/signup">
                            <div className={styles.modalLogo}>
                                <Image width={140} height={21}  src="/img/logo_modal.png" alt="logo" />
                            </div>
                        </Link>
                        <input
                            className={classNames(styles.modalInput, styles.login)}
                            type="text"
                            name="login"
                            placeholder="Логин"
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.modalInput}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.modalInput}
                            type="password"
                            name="password"
                            placeholder="Повторите пароль"
                            onChange={handleInputChange}
                        />
                        <button  onClick={handleRegister} className={styles.modalBtnSignupEnt}>
                            <Link href="/">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
