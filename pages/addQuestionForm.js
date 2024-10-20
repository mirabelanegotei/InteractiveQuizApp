import { useState, useEffect } from 'react';
import styles from '../styles/addQuestionForm.module.css';

const AddQuestionForm = ({addNewQuestion}) => {
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleAnswerOptionChange = (index, value) => {
    const newAnswerOptions = [...answerOptions];
    newAnswerOptions[index] = value;
    setAnswerOptions(newAnswerOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!question || !correctAnswer || answerOptions.some(option => option === '')) {
      alert("Complete all fields!");
      return;
    }

    const newId = (questions.length > 0 ? Math.max(...questions.map(q => parseInt(q.id))) + 1 : 1).toString();
    const newQuestion = {
      id: newId,
      quest: question,
      answers: answerOptions.map((option, index)=>({
        text: option,
        id: (index + 1).toString(),
        isCorrect: option === correctAnswer,
      })),
    };

    setQuestion('');
    setAnswerOptions(['', '', '', '']);
    setCorrectAnswer('');

    if(addNewQuestion) {
      addNewQuestion(newQuestion);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="question">Question:</label>
          <input
            className={styles.input}
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Answer Options:</label>
          {answerOptions.map((option, index) => (
            <input
              className={styles.input}
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleAnswerOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>
        <div>
          <label className={styles.label} htmlFor="correctAnswer">Correct Answer:</label>
          <input
            className={styles.input}
            type="text"
            id="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
