// Basic component to create the quiz page
import React, { Component, useCallback } from "react";
import PropTypes from 'prop-types';


export default class Quiz extends Component {
    constructor(props) {
        super(props);

        // Initialize state.
        this.state = {
            questions: props.questions,
            current_question: 0,
            answered_questions: {},
            submit_quiz: props.submit_quiz
        };
    }

    set_answer(e){
        const question_index = Number.parseInt( e.nativeEvent.path[2].id)
        const {value:answer} = e.target
        this.state.answered_questions[question_index] = answer
    }

    navigate(val, e ){
        // Callback for handling question submission
        if(val=="Finish"){
            this.finish()
        }
        else if(val=="Next"){
            this.setState( {current_question : this.state.current_question + 1 } );
        }
        e.preventDefault();
    }
    back(e){
        this.setState( {current_question : this.state.current_question - 1 } );
        e.preventDefault();
    }

    finish(){
        // Complete the Quiz
        const score = this.check_answer()
        this.state.submit_quiz( score, this.state );
    }

    check_answer(){
        let points = 0
        for(let key in this.state.answered_questions){
            points += (this.state.answered_questions[key] == this.state.questions[key].correct_answer ) ? 1 : 0 ;
        }
        return points;
    }

    getChoices(question, questions_index){
        let structure = this.state.questions[ questions_index].structure
        if ( !structure ) {
            const correct_index = Math.floor(Math.random() * ( (question.incorrect_answers.length +1 ) - 0 + 1) + 0)
            structure = [...question.incorrect_answers]
            structure.splice(correct_index, 0, question.correct_answer)
            this.state.questions[ questions_index].structure = structure
        }
        return structure
    }

    make_question(question, question_index){
        const choices = this.getChoices(question, question_index)
        const [ value, callBack ] = (this.state.current_question < this.state.questions.length-1) ?
                        ["Next", this.navigate.bind(this)] : ["Finish", this.finish.bind(this)]
        return(
            <div onChange={ this.set_answer.bind(this) } >
                <form key={question_index} id={question_index} className={'question_container'} onSubmit={ this.navigate.bind(this, value) } >
                    <h6>{ `Question ${this.state.current_question+1} out of ${this.state.questions.length}` }</h6> <br/>
                    <p>{ question.question }</p> <br/>
                    {/* Iterate over every option choice */}
                    {choices.map( (text, index) => {
                        const checked = (this.state.answered_questions[ question_index ] == text) ? {defaultChecked:true} : {}
                        return(
                            <div key={index}>
                                <input type="radio" {...checked} id={index} name={`${question.type}_question`} parent={question_index} value={text}  required/>
                                <label htmlFor={index}> {text} </label>
                            </div>
                        )
                        })
                    }
                    <br/>
                    <div className="submit_button_container">
                        {(this.state.current_question>0) ?
                            <button type="button" value="Previous" className="submit_button left"  onClick={this.back.bind(this)}>Previous</button>
                            : <p/>
                        }
                        {<button type="submit" value={value} className="submit_button right"  >{value}</button>}
                    </div>
                </form>
            </div>
        )
    }

    render() {
        console.log("QUIZ.js RENDERED: ", this.state)
        const question_index = this.state.current_question
        return (
        <div className={'quiz_container'} >
            {/* {this.state.questions} */}
            {/* { Map function to iterate over Array of all questions} */ }
            {
                // this.state.questions.map( (question, index) => this.make_question(question, index) )
                (question_index < 0 || question_index > this.state.questions.length-1) ?
                    "End of Test" :
                    this.make_question(this.state.questions[question_index], question_index)
            }

        </div>
        )
    }
}


Quiz.propTypes = {
    currentQuestion: PropTypes.object,
    selectQuestion: PropTypes.func,
    categories: PropTypes.array,
    answeredQuestions: PropTypes.array
};
