import { useState } from "react"
import QuizQuesionsInfo from "./QuizQuestionsInfo"
import "./QuizInfo.css"
import { Button } from "@mui/material"
import QuizIcon from '@mui/icons-material/Quiz';


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
            <input type="text" name="noOfQuestions" height="200%"value={details.noOfQuestions} onChange={handleChange}/>
            <Button
            onClick={makeQuiz}
              variant="contained"
              startIcon={<QuizIcon />}
              sx={{ mt: 2 }}
              
             >
                Make Quiz
            </Button>
           
        </div>
    )
}

export default QuizInfo