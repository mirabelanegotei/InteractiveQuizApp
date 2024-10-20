import { useRouter } from "next/router";
import styles from '../../styles/quizId.module.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalDialog from "@/public/modalDialog";
import AddQuestionForm from "../addQuestionForm"; 

const QuizId = () => {
  const router = useRouter();
  const { quizId } = router.query;

  const [modalMessage, setModalMessage] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  useEffect(() => {
    if (!quizId) return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        if(!response){
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        let quizData = data.categories;
        const currenQuiz = quizData.find(el => el.id === quizId);
        if(currenQuiz){
          setQuiz(currenQuiz); 
        }else
        {  
          setError("Quiz not found");
        }
      } catch (error) {
        setError("Failed to load quiz data.");
      } finally{
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const startHandler = () => {
    setModalMessage("Are you sure to start the quiz?");
    setIsModal(true);
  };

  const confirmModal = () => {
    setIsModal(false);
    router.push(`/quiz/${quizId}/question/${quiz.questions[0].id}`);
  };

  const cancelModal = () => {
    setIsModal(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const addNewQuestion = async (newQuestion) => {
    try {
      const copyQuiz = JSON.parse(JSON.stringify(quiz));
      const sortedQuestions = quiz.questions.sort((a, b) => b.id - a.id);
      const newId = Number(sortedQuestions[0].id) + 1;
  
      const updatedQuestion = {
        ...newQuestion,
        id: newId.toString(),
      };
      copyQuiz.questions.push(updatedQuestion);
  
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId, updatedQuiz: copyQuiz }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update quiz');
      }
      const result = await response.json();
      setQuiz(copyQuiz);
  
      alert('Question added successfully!');
    } catch (error) {
      console.error('Error updating quiz:', error);
      alert('Failed to add new question.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Quiz - {quizId}</h1>
      <p>This quiz contains {quiz.questions?.length} questions.</p>
      {quiz?.questions?.length > 0 ? (
        <button className={styles.button} onClick={startHandler}>
          Start Quiz
        </button>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
      <Link href={"/categories"}>
        <button className={styles.button}>Back to categories</button>
      </Link>
      <button className={styles.button} onClick={toggleFormVisibility}>
        {isFormVisible ? 'Hide Add Question Form' : 'Add New Question'}
      </button>
      {isFormVisible && (
          <AddQuestionForm quizId={quizId} addNewQuestion={addNewQuestion} />)}

      {isModal && (
        <ModalDialog
          message={modalMessage}
          onConfirm={confirmModal}
          onCancel={cancelModal}
        />
      )}
    </div>
  );
};

export default QuizId;