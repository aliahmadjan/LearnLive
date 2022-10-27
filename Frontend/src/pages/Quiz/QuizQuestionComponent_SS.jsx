import { useState } from "react"
import './QuizQuestionComponent_SS.css'

function QuizQuestionComponent_SS(props){


    return(
                <fieldset className="question-container">
                    <h3> {props.questionLine}</h3>
                    <legend>Question {props.id}</legend>
                    
                    <div className="options-container">
                        <div>
                            <input 
                                type="radio"
                                //id="A"
                                value="A"
                                name={props.id}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="A"> {`A) `}   {props.optionA}</label>
                            <br />
                        </div>
                        <div>
                            <input 
                                type="radio"
                                //id="B"
                                value="B"
                                name={props.id}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="B">{`B) `}   {props.optionB}</label>
                            <br />
                        </div>
                        <div>
                            <input 
                                type="radio"
                                //id="C"
                                value="C"
                                name={props.id}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="C">{`C) `}   {props.optionC}</label>
                            <br />
                        </div>
                        <div>
                            <input 
                                type="radio"
                                //id="D"
                                value="D"
                                name={props.id}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="D">{`D) `}   {props.optionD}</label>
                            <br />
                        </div>
                    </div>
                

                </fieldset>

    )
}

export default QuizQuestionComponent_SS