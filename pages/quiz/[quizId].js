import { useRouter } from "next/router";
import styles from '../../styles/quizId.module.css';
import Link from "next/link";
import { useState } from "react";
import ModalDialog from "@/public/modalDialog";

export const getServerSideProps = async () =>{
        const res = await fetch("http://localhost:3000/questions.json");
        const data = await res.json();

    return {
        props: {quiz: data.categories}
    }
}

const QuizId = ({quiz}) => {

    const router = useRouter();
    const {quizId} = router.query;

    const category = quiz.find((categ) => categ.id === quizId); 
    const questions = category ? category.questions : [];

    const [modalMessage,setModalMessage]=useState('');
    const [isModal,setIsModal] = useState(false);

    const startHandler = () =>{
    setModalMessage("Are you sure to start the quiz?");
    setIsModal(true);
  }
  const confirmModal  = () =>{
    setIsModal(false);
    router.push(`/quiz/${quizId}/question/${questions[0].id}`);
  };
  const cancelModal = ()=>{
    setIsModal(false);
  };

return(
    <div className={styles.container}>
        <h1>Quiz - {quizId}</h1>
        <p>This quiz contains {questions.length} questions.</p>
        {questions.length > 0 ? (
            <button className={styles.button} onClick={startHandler}>Start Quiz</button>
        ):(<p>No questions available for this quiz.</p>)}
        <Link href={"/categories"}><button className={styles.button}>Back to categories</button></Link>
        {isModal && <ModalDialog message={modalMessage} onConfirm={confirmModal} onCancel={cancelModal}/>}
    </div>)
}
export default QuizId;