 'use client';
 import styles from "./error.module.css"


import { useEffect } from 'react';

// type ErrorType={
// error: string,
// reset:any,
// }

export default function Error({ error, reset }) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorBlock}>
      <h2>Что-то пошло не так! 😭</h2>
      <button className={styles.errorButton} onClick={reset}>Попробовать снова</button>
    </div>
  );
}