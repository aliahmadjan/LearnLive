import { useState } from "react"
import QuizQuestions from "./QuizQuestions"
import "./Quiz.css"

function Quiz(){

    const[quizTaken,setQuizTaken] = useState(false)

    function takeQuiz(){
        setQuizTaken( oldValue => true)
    }

    return (
        quizTaken ? 
        <QuizQuestions />
        :
        <div className="container">
            <button onClick={takeQuiz}>Take Quiz</button>
        </div>
    )
}

export default Quiz