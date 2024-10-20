import Link from "next/link";
import styles from '../styles/categories.module.css';
import { useEffect, useState } from "react";
  
const Categories = () =>{
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data = await res.json();
        setQuiz(data); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (!quiz || !quiz.categories || quiz.categories.length === 0) {
      return <div>Nu s-au găsit categorii.</div>;
  }
  
  return(
      <div className={styles.div}>
          <ul>
              {quiz.categories.map(category=>(
                <li className={styles.list} key={category.id}>
                <Link href={`/quiz/${category.id}`}> <button className={styles.button}>
                {category.title}
                </button></Link></li>
              ))}
          </ul>
      </div>
  )
}

export default Categories;