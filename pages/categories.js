import Link from "next/link";
import styles from '../styles/categories.module.css';

export const getServerSideProps = async () =>{
    const res = await fetch("http://localhost:3000/questions.json");
    const data = await res.json();

    return {
        props: {quiz: data}
    }
}
  
const Categories = ({quiz}) =>{
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