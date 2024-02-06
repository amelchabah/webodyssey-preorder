import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {

    const intervalId = setInterval(() => {
      const future = Date.parse("June 13, 2024 18:00:00");
      const now = new Date();
      const diff = future - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);

  }, []);





  return (
    <>
      <header className={styles.header}>
        <h1>Web Odyssey</h1>
        <div id="timer" className={styles.timerctn}>
          <div className={styles.time}>{timeLeft.days}<span>jours</span></div>
          <span>:</span>
          <div className={styles.time}>{timeLeft.hours}<span>heures</span></div>
          <span>:</span>
          <div className={styles.time}>{timeLeft.minutes}<span>minutes</span></div>
          <span>:</span>
          <div className={styles.time}>{timeLeft.seconds}<span>secondes</span></div>
        </div>
        <Link href="#form" className={styles.button}>Réserver</Link>
      </header>
      <main className={styles.main}>
        <form action="" id="form">
          <input type="text" placeholder="Nom" />
          <input type="text" placeholder="Prénom" />
          <input type="text" placeholder="Promotion" />
          <input type="email" placeholder="Email" />
          <button type="submit">Réserver</button>
        </form>
      </main>
    </>
  );
}
