import Link from "next/link";
import styles from '../styles/categories.module.css';
import { useEffect, useState } from "react";
  
const Categories = () =>{
    const [quiz, setQuiz] = useState(null);
    
    useEffect(()=>{
        const fetchData = async () =>{
            const storageData = localStorage.getItem('quizes');
            debugger;
            debugger;
            if(storageData) {
              const quizes = JSON.parse(storageData);
    
              setQuiz({categories: quizes});
            } else {
                const res = await fetch("/api/questions");
                const data = await res.json();
                
                localStorage.setItem('quizes', JSON.stringify(data.categories));
                setQuiz(data);
            }
        }
        fetchData();
    },[]);

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