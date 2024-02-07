import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {

    const intervalId = setInterval(() => {
      const future = Date.parse("June 13, 2024 00:00:00");
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


  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    promo: "",
    mail: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/postReservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Réservation ajoutée avec succès !");
        // Réinitialiser le formulaire après avoir soumis les données
        setFormData({
          name: "",
          firstName: "",
          promo: "",
          mail: ""
        });
      } else {
        console.error("Erreur lors de l'ajout de la réservation :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };






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
        <h2>RéSERVEZ VOTRE ENTRée</h2>
        <form onSubmit={handleSubmit} id="form">
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} />
          <label htmlFor="firstName">Prénom</label>
          <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} />
          <label htmlFor="promo">Promotion</label>
          <input type="text" name="promo" placeholder="Promotion" value={formData.promo} onChange={handleChange} />
          <label htmlFor="mail">Email</label>
          <input type="email" name="mail" placeholder="Email" value={formData.mail} onChange={handleChange} />
          <button type="submit">Réserver</button>
        </form>
      </main>
    </>
  );
}
