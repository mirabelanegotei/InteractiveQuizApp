import { useRouter } from 'next/router';
import styles from '../../../../styles/questionId.module.css';
import { useState } from 'react';

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/questions.json");
  const data = await res.json();

  return {
    props: { quiz: data.categories }
  };
}

const QuestionId = ({ quiz }) => {

  const router = useRouter();
  const { quizId, questionId } = router.query;

  const [isCorrect, setIsCorrect] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const [correctAnswer, setCorectAnswer]= useState('');
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const category = quiz.find(cat => cat.id === quizId); 
  const questions = category ? category.questions : []; 
  const currentQuestion = questions.find(q => q.id === questionId);

  const totalQuestions = questions?.length || 0;
  const progressPercentage = totalQuestions > 0 ? (progressCount/totalQuestions)* 100 : 0;

  if (!currentQuestion) {
    return <h2>The questions is not found!</h2>;
  }

  const nextHandler = () =>{
    setIsCorrect(false);
    setSelectedAnswerId(null);
    setCorectAnswer("");

    const radioBtn = document.querySelectorAll('input[name="answer"]');
    radioBtn.forEach((radio) => {
          radio.checked = false;
          radio.disabled = false;
    });

    const currentQuestionIndex = questions.findIndex(q => q.id === questionId);
    const nextQuestionIndex = currentQuestionIndex + 1;
        
  if (nextQuestionIndex < questions.length) 
    {
      const nextQuestionId = questions[nextQuestionIndex].id;
      router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
    } 
    else
    {
      router.push({pathname: '/results',
        query: {
          progressCount: progressCount,
          totalQuestions: totalQuestions,
          progressPercentage: progressPercentage.toFixed(0),
        } });
    }
  }

  const handleAnswer = (selectedId) => {
    const selectedAnswer = currentQuestion.answers.find(answer => answer.id === selectedId);
    const isCorrectAnswer = selectedAnswer && selectedAnswer.isCorrect; 

    setCorectAnswer(currentQuestion.answers.find(answer=>answer.isCorrect === true)?.text);
    setSelectedAnswerId(selectedId);

    setIsCorrect(true);

    const radioBtn = document.querySelectorAll('input[name="answer"]');
    radioBtn.forEach((radio) => {
        radio.disabled = true;
    });

    if (isCorrectAnswer) 
    {
        setProgressCount((prev) => prev + 1);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1 className={styles.questionTitle}>{`Question ${currentQuestion.id}`} - {currentQuestion.quest}</h1>
      </div>
      <form className={styles.form}>
        <ul className={styles.answerList}>
          {currentQuestion.answers.map(answer => (
            <li key={answer.id} className={styles.answerItem}>
              <div className={styles.answerBox}>
                <label className={`${styles.answerLabel} ${
                    selectedAnswerId === answer.id
                      ? answer.isCorrect
                        ? styles.correct
                        : styles.incorrect
                      : styles.default
                  }`}>
                  <input type="radio" name="answer" value={answer.id} onChange={() => handleAnswer(answer.id)} />
                  <span className={styles.answerText}>{answer.text}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
        {isCorrect && <span className={styles.correctAnswer}>Correct Answer: {correctAnswer}<br></br></span>}
        <div className={styles.divBtn}>
        </div>
        <div className={styles.progressBarContainer}>
          <div
           className={styles.progressBar}
           style={{ width: `${progressPercentage}%` }}
          />
          <span className={styles.progressText}>{`${progressPercentage.toFixed(0)}%`}</span>
        </div>
        {isCorrect && <button type='submit' className={styles.nextButton} onClick={nextHandler}>Next</button>}
      </form>
    </div>
  );
};

export default QuestionId;