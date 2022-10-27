import { useState } from "react"
import QuizQuesionsInfo from "./QuizQuestionsInfo"
import "./QuizInfo.css"

const QuizInfo =() => {

    const[details,setDetails] = useState({
        noOfQuestions: 1,
        isMade: false
    })

    function handleChange(event){
        const{name,value} = event.target
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                [name]: value
            }
        })
    }

    function makeQuiz(){
        setDetails( oldDetails => {
            return {
                ...oldDetails,
                isMade: !oldDetails.isMade
            }
        })
    }

    console.log("jeekekek")
    return (
        details.isMade ? 
        <QuizQuesionsInfo noOfQuestions={details.noOfQuestions}/>
        :
        <div className="container">
            <h2>Fill Out Details</h2>
            <h3>Enter the number of questions</h3>
            <input type="text" name="noOfQuestions" value={details.noOfQuestions} onChange={handleChange}/>
            <button onClick={makeQuiz}>Make Quiz</button>
        </div>
    )
}

export default QuizInfo