import Link from 'next/link';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Welcome to the Quiz</h1>
      <p>Explore different categories and test your knowledge!</p>
      <Link href="/categories">
        <button className={styles.button}>Go to Categories</button>
      </Link>
    </div>
  );
}

export default HomePage;