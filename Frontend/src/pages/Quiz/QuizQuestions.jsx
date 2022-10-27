import { useState, useEffect } from "react"
import QuizQuestionComponent_SS from "./QuizQuestionComponent_SS"
import QuizResult from "./QuizResult"

function QuizQuestions(){

    const[questions, setQuestions] = useState([
            {
                "id": 1,
                "questionLine": "What comes after 1 ?",
                "optionA": "2",
                "optionB": "3",
                "optionC": "4",
                "optionD": "5",
                "correctOption": "A"
            },
            {
                "id": 2,
                "questionLine": "What is 2 + 2 ?",
                "optionA": "2",
                "optionB": "3",
                "optionC": "4",
                "optionD": "5",
                "correctOption": "C"
            },
            {
                "id": 3,
                "questionLine": "What is 12 / 6 ?",
                "optionA": "3",
                "optionB": "0",
                "optionC": "9",
                "optionD": "2",
                "correctOption": "D"
            },
            {
                "id": 4,
                "questionLine": "What is 8 % 5 ?",
                "optionA": "3",
                "optionB": "2",
                "optionC": "1",
                "optionD": "1",
                "correctOption": "A"
            }
        ])

    
    const[selectedOptions ,setSelectedOptions] = useState(allNewSelectedOptions())

    const[quizSubmitted, setQuizSubmitted] = useState(false)

    const[resultMarks , setResultMarks] = useState("0")

    function allNewSelectedOptions(){
        const newOptions = []
        for(let i = 0 ; i < questions.length ; i++)
        {
            newOptions.push({
                id: i+1,
                selectedOption: ""
            })
        }

        return newOptions
    }


    function handleChange(id,event){

        const {name,value} = event.target

        setSelectedOptions( oldOptions => oldOptions.map(
            option => option.id == id ? {...option, selectedOption: value} : option
        ))

    }

    const questionElements = questions.map( question => 
        <QuizQuestionComponent_SS 
            key={question.id}
            id={question.id}
            questionLine={question.questionLine} 
            optionA={question.optionA} 
            optionB={question.optionB}
            optionC={question.optionC}
            optionD={question.optionD}
            handleChange={(event) => handleChange(question.id , event)}/>
    )
    
    const resultElements = questions.map( question =>
        <QuizResult
            key={question.id}
            id={question.id}
            questionLine={question.questionLine} 
            optionA={question.optionA} 
            optionB={question.optionB}
            optionC={question.optionC}
            optionD={question.optionD}
            correctOption={question.correctOption}
            selectedOption={selectedOptions.find( el => el.id == question.id).selectedOption}
            />
        )

    
        //console.log(selectedOptions.find( el => el.id == "1").selectedOption)
    function submitQuiz(){
        //console.log(selectedOptions)
        let score = 0;

        for(let i = 0 ; i < questions.length; i++){
            if(questions[i].correctOption == selectedOptions[i].selectedOption)
            {
                score++
               
            }
        }

        setResultMarks(score)
        setQuizSubmitted(true)
        //console.log(resultElements)
    }
    
    return (
        quizSubmitted ?
        (<div>
            <h1>Quiz Result</h1>
            <h3>Yout score is {resultMarks}/{questions.length}</h3>
            {resultElements}
        </div>)
        :
        (<div>
            {questionElements}
            <button onClick={submitQuiz}>Submit Quiz</button>
        </div>)
    )
}

export default QuizQuestions