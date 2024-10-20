import { useRouter } from 'next/router';
import styles from '../../../../styles/questionId.module.css';
import { useEffect, useState } from 'react';

const QuestionId = () => {
  const router = useRouter();
  const { quizId, questionId } = router.query;

  const [quiz, setQuiz] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storageData = localStorage.getItem('quizes');

    if (storageData) {
      const quizes = JSON.parse(storageData);
      const category = quizes.find(cat => cat.id === quizId);
      if (category) {
        setQuiz(category);
      } else {
        setError("Quiz not found.");
      }
    } else {
      setError("No quiz data available.");
    }
    setLoading(false);
  }, [quizId]);

  const questions = quiz.questions || []; 
  const currentQuestion = questions.find(q => q.id === questionId);

  const totalQuestions = questions.length;
  const progressPercentage = totalQuestions > 0 ? (progressCount / totalQuestions) * 100 : 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentQuestion) {
    return <h2>The question is not found!</h2>;
  }

  const nextHandler = () => {
    setIsCorrect(false);
    setSelectedAnswerId(null);
    setCorrectAnswer("");

    const radioBtn = document.querySelectorAll('input[name="answer"]');
    radioBtn.forEach((radio) => {
      radio.checked = false;
      radio.disabled = false;
    });

    const currentQuestionIndex = questions.findIndex(q => q.id === questionId);
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      const nextQuestionId = questions[nextQuestionIndex].id;
      router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
    } else {
      router.push({
        pathname: '/results',
        query: {
          progressCount,
          totalQuestions,
          progressPercentage: progressPercentage.toFixed(0),
        }
      });
    }
  }

  const handleAnswer = (selectedId) => {
    const selectedAnswer = currentQuestion.answers.find(answer => answer.id === selectedId);
    const isCorrectAnswer = selectedAnswer && selectedAnswer.isCorrect;

    setCorrectAnswer(currentQuestion.answers.find(answer => answer.isCorrect)?.text);
    setSelectedAnswerId(selectedId);
    setIsCorrect(true);

    const radioBtn = document.querySelectorAll('input[name="answer"]');
    radioBtn.forEach((radio) => {
      radio.disabled = true;
    });

    if (isCorrectAnswer) {
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
        {isCorrect && <span className={styles.correctAnswer}>Correct Answer: {correctAnswer}<br /></span>}
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }} />
          <span className={styles.progressText}>{`${progressPercentage.toFixed(0)}%`}</span>
        </div>
        {isCorrect && <button type='button' className={styles.nextButton} onClick={nextHandler}>Next</button>}
      </form>
    </div>
  );
};

export default QuestionId;