import { useState } from "react"
import QuizQuestions from "./QuizQuestions"
import "./Quiz.css"
import { Button } from "@mui/material"
import QuizIcon from '@mui/icons-material/Quiz';

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
            <Button
            onClick={takeQuiz}
              variant="contained"
              startIcon={<QuizIcon />}
              sx={{ mt: 2 }}
              
             >
                Attempt Quiz
            </Button>
        </div>
    )
}

export default Quiz