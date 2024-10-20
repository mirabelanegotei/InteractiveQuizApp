import { useRouter } from 'next/router';
import styles from '../../../../styles/questionId.module.css';
import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/questions.json");
  const data = await res.json();

  return {
    props: { quiz: data }
  };
}

const QuestionId = ({ quiz }) => {
  const router = useRouter();
  debugger;
 const { quizId, questionId } = router.query;
  const questionIndex = parseInt(questionId) - 1; 
  const question = quiz[quizId]?.[questionIndex];

  if (!question) {
    return <h2>The question is not found.</h2>;
  }

  const handleAnswer = (selectedId) => {
    const selectedAnswer = question.answers.find(answer => answer.id === selectedId);
    const isCorrect = selectedAnswer && selectedAnswer.isCorrect; 
    
    if (isCorrect) {
      const currentQuestionIndex = quiz[quizId].findIndex(q => q.id === questionId);
      const nextQuestionIndex = currentQuestionIndex + 1;
  
      if (nextQuestionIndex < quiz[quizId].length) {
        const nextQuestionId = quiz[quizId][nextQuestionIndex].id;
        document.querySelectorAll('input[name="answer"]').forEach((radio) => {
          radio.checked = false;
        });
        router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
    } else {
      alert("This was the last question!\nAfter clicking 'OK', you will be redirected to the categories page.");
      router.push('/categories');
      }
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.questionTitle}>{`Question ${question.id}`} - {question.quest}</h1>
      </div>
      <ul className={styles.answerList}>
        {question.answers.map(answer => (
          <li key={answer.id} className={styles.answerItem}>
            <div className={styles.answerBox}>
              <label className={styles.answerLabel}>
                <input type="radio" name="answer" value={answer.id} onChange={() => handleAnswer(answer.id)} />
                <span className={styles.answerText}>{answer.text}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <Link href={'/'}><button className={styles.homeButton}>Home Page</button></Link>
    </div>
  );
    };

export default QuestionId;