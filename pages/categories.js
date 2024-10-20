import Link from "next/link";
import styles from '../styles/categories.module.css';

const categories = [
    { title: 'Nature', id: 'Nature' },
    { title: 'History', id: 'History' },
    { title: 'Geography', id: 'Geography' },
    { title: 'Math', id: 'Math' }
];
  
const Categories = () =>{
    return(
        <div className={styles.div}>
            <ul>
                {categories.map(category=>(
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