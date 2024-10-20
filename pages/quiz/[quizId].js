import { useRouter } from "next/router";
import styles from '../../styles/quizId.module.css';
import Link from "next/link";

export const getServerSideProps = async () =>{
        const res = await fetch("http://localhost:3000/questions.json");
        const data = await res.json();

    return {
        props: {quiz: data}
    }
}

const QuizId = ({quiz}) => {

    const router = useRouter();
    const {quizId} = router.query;

  const questions = quiz[quizId];
        
return(
    <div className={styles.container}>
        <h1>Quiz - {quizId}</h1>
        <p>This quiz contains {questions.length} questions.</p>
        {questions.length > 0 ? (
        <Link href={`/quiz/${quizId}/question/${questions[0].id}`}>
            <button className={styles.button}>Start Quiz</button></Link>
        ):(<p>No questions available for this quiz.</p>)}
    </div>)
}
export default QuizId;
