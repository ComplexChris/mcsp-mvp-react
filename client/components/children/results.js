import React from 'react';


function make_question(question, question_index, their_answer, amount){
  const choices = question.structure ;
  const correct = question.correct_answer
  console.log("MAKING QUESTION... ", question_index, correct, question, choices )
  return(
      <div id={`Question-${question_index}`} key={`Question-${question_index}`} >
          <form key={question_index} id={question_index} className={'question_container'}  >
              <h6>{ `Question ${question_index+1} out of ${amount} (${ (their_answer==correct) ? 'CORRECT':'INCORRECT' })` }</h6> <br/>
              <p>{ question.question }</p> <br/>
              {/* Iterate over every option choice */}
              {choices.map( (text, index) => {
                  const checked = (their_answer == text) ? {checked:true, className:'user_answer'} : {checked:false}
                  const cName = ( correct == text ) ? {className:'correct_answer'} : {}
                  const temp = {...checked, ...cName} ;
                  return(
                      <div key={`${question_index}-${index}`}>
                          <input type="radio" {...temp} id={index} name={`${question.type}_question`} parent={question_index} value={text} readOnly={true} required/>
                          <label {...temp} htmlFor={index}> {text} </label>
                      </div>
                  )
                })
              }
              <br/>
          </form>
          <hr/> <br/>
      </div>
  )
}

const ShowResults = props => {
  //console.log("Categories.js PROPS: ", props)
  console.log("RESULTS PROPS: ", props)
  const amount = props.quiz_master.results.length
  const percentage = Math.ceil( (props.quiz_master.score/amount)*100 )
  return (
    <div className={'quiz_container'} >
        {/* {this.state.questions} */}
        {/* { Map function to iterate over Array of all questions} */ }
        <h1> {`${(percentage<70)?'FAILED':'PASSED'} - You got ${props.quiz_master.score} out of ${amount} (%${percentage})`} </h1>
        {
            props.quiz_master.results.map( (question, index) => {
              const their_answer = props.quiz_master.their_answers[index]
              return (make_question(question, index, their_answer, amount ))
            } )
        }
        <input type="button" value="Back" className="submit_button"  onClick={props.goHome.bind(this)}/>
    </div>
  )
};


export default ShowResults;
