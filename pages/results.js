import { useRouter } from "next/router";
import styles from '../styles/results.module.css';
import Link from "next/link";
import confetti from "canvas-confetti";

const Results = () =>{
const router = useRouter();
const {progressCount, totalQuestions, progressPercentage} = router.query;

const feedbackMessage = () =>{
    if(Number(progressPercentage) <= 50){
        return "Don't give up!\nPractice and you will succeed!";
    }else if(progressPercentage <=90){
        return "Keep learning and you will see improvements!";
    }else{
        return "Congratulations!\nYou got an excellent score!";
    }
}

if (typeof window !== "undefined") {
    if(Number(progressPercentage > 50)){
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
        });
    }
}

return(
        <div className={styles.container}>
            <h1>Your Results</h1>
            <p>You answered correctly to {progressCount} out of {totalQuestions} questions.</p>
            <p id="result">You obtains: {progressPercentage}% {progressPercentage > 50 ? ''  : "😢" }</p>
            <p>{feedbackMessage()}</p>  
            <p>After "Ok" you will be redirected on the categories page</p>
            <Link href={'/categories'}><button className={styles.button}>Ok</button></Link> 
        </div>
    )
}
export default Results;