"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import classNames from "classnames"
import { ChangeEvent, useState } from "react";
import { signinApi } from "@/api/users";
import { useAppDispatch } from "@/components/hooks";
import { setUser } from "@/store/features/userSlice";


export default function SignInPage() {
    const dispatch = useAppDispatch()
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };


     
      const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(loginData);
        signinApi(loginData).then((data) => {
         return dispatch(setUser(data))
        
        })
        .then(()=>{
            //сделать получение токена
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
                            type="email"
                            name="email"
                            placeholder="Почта"
                            onChange={handleInputChange}
                        />
                        <input
                            className={classNames(styles.modalInput, styles.password)}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            onChange={handleInputChange}
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

