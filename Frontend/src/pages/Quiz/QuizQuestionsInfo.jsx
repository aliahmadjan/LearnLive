import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Button } from "@mui/material"
import QuizIcon from '@mui/icons-material/Quiz';

function QuizQuesionsInfo(props){

    const[questions, setQuestions] = useState(allNewQuestions())

    function allNewQuestions(){

        const newQuestions = []

        for(let i = 0 ; i < props.noOfQuestions ; i++){
            newQuestions.push({
                id: i+1,
                questionLine: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctOption: ""  
            })
        }
        
        return newQuestions
    }

    function handleChange(id,event){

        const { name, value } = event.target

        //console.log(name,value)
        setQuestions( oldQuestions => {
            return oldQuestions.map(question => question.id === id ? {...question,[name]: value} : question)
        })
    }

    function createQuiz(){
       console.log(questions)
    }

    const questionElements = questions.map( question => 
        <QuizQuestionComponent 
            key={question.id}
            id={question.id}
            questionLine={question.questionLine} 
            optionA={question.optionA} 
            optionB={question.optionB}
            optionC={question.optionC}
            optionD={question.optionD}
            correctOption={question.correctOption}
            onChange={(event) => handleChange(question.id,event)}/>)


    
    return (
        <div className="container">
            {questionElements}
            <Button
            onClick={createQuiz}
              variant="contained"
              startIcon={<QuizIcon />}
              sx={{ mt: 2 }}
              
             >
                Create 
            </Button>
        </div>
    )
}

export default QuizQuesionsInfo