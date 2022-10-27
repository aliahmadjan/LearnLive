import { useState } from "react"
import './QuizQuestionComponent.css'

function QuizQuestionComponent(props){
    return (
        <div className="question-container">
            <h2>Enter Question {props.id}</h2>
            <textarea placeholder="Enter the question" className="question-line" name="questionLine" value={props.questionLine} onChange={props.onChange}/>
            <div className="options-container">
                <label htmlFor="option-a">a: </label>
                <input placeholder="Option A" type="text" className="question-options" id="optionA" name="optionA" value={props.optionA} onChange={props.onChange} />
                <label htmlFor="option-b">b: </label>
                <input placeholder="Option B" type="text" className="question-options" id="optionB" name="optionB" value={props.optionB} onChange={props.onChange} />
                <label htmlFor="option-c">c: </label>
                <input placeholder="Option C" type="text" className="question-options" id="optionC" name="optionC" value={props.optionC} onChange={props.onChange} />
                <label htmlFor="option-d">d: </label>
                <input placeholder="Option D" type="text" className="question-options" id="optionD" name="optionD" value={props.optionD} onChange={props.onChange} />
            </div>
            <div>
                <label htmlFor="correctOption">Select the correct answer for the above question   </label>
                <select
                    id="correctOption"
                    name="correctOption"
                    value={props.correctOption}
                    onChange={props.onChange}
                >
                        <option value="">Select</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>    
                        <option value="D">D</option>
                </select>
            </div>
        </div>
    )
}

export default QuizQuestionComponent