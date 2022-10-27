import { useState } from "react"
import "./QuizResult.css"

function QuizResult(props){

    //console.log(props.selectedOption)

    return(
        <div className="question-container">
            <h2>{`Q${props.id}) ` }{props.questionLine}</h2>
            <div className="options-container">
                <h3 
                    className={`${props.correctOption=="A" ? "correct-option" : ""} 
                    ${props.selectedOption=="A" && props.correctOption!="A" ? "wrong-option" : ""}
                    ${props.selectedOption=="A" && props.correctOption=="A" ? "orange" : ""}`}>
                        {`A) `} {props.optionA}
                </h3>
                <h3 
                    className={`${props.correctOption=="B" ? "correct-option" : ""}
                    ${props.selectedOption=="B" && props.correctOption!="B" ? "wrong-option" : ""}
                    ${props.selectedOption=="B" && props.correctOption=="B" ? "orange" : ""}`}>
                        {`B) `} {props.optionB}
                </h3>
                <h3 
                    className={`${props.correctOption=="C" ? "correct-option" : ""}
                    ${props.selectedOption=="C" && props.correctOption!="C" ? "wrong-option" : ""}
                    ${props.selectedOption=="C" && props.correctOption=="C" ? "orange" : ""}`}>
                        {`C) `} {props.optionC}
                </h3>
                <h3 
                    className={`${props.correctOption=="D" ? "correct-option" : ""}
                    ${props.selectedOption=="D" && props.correctOption!="D" ? "wrong-option" : ""}
                    ${props.selectedOption=="D" && props.correctOption=="D" ? "orange" : ""}` }>
                        {`D) `} {props.optionD}
                </h3>
            </div>
        </div>

    )
}

export default QuizResult