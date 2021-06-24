// Basic component to create the home page

import React from 'react';
import PropTypes from 'prop-types';

function showButton(isLoading){
    return(
        (isLoading) ?
        <div>
            <p className='loader'><img src="https://icons8.com/preloaders/preloaders/1486/Hourglass.gif" alt="just a sec"  width="30" /> Great choice! Give me just a sec.. </p>
            {/* <div className={'question_container'}>Great choice! Give me just a sec...</div> */}
        </div>
            :
            <div>
                <input type="submit" value="Submit" className="submit_action"  ></input> <br/> <br/>
                <div className={'question_container'}>Hit 'Submit' and lets test your wits!</div>
            </div>

    )
}

const Homepage = props => {
    const {form_inputs, form_defaults} = props.root_state
    const cats = Object.keys( form_defaults.categories ) ;
    const diffs = form_defaults.difficulties ;
    const change = (e)=>props.change_form(e.target.name, e.target.value)
    return (
        <div className={'form_container'}>
            <form onSubmit={props.submit_form}>
                <h1 className="welcome_banner">Welcome to the super awesome mega Quiz app!</h1>

                { createOption( {name:'category', value:form_inputs.category, vals:cats, text:"Choose your Category "}, props.change_form) } <br/>
                { createOption( {name:'difficulty', value:form_inputs.difficulty, vals:diffs, text:"Choose your Difficulty "}, props.change_form) } <br/>

                <label htmlFor="quantity" className={"input_fields"}>
                    Quantity (Between 1 and 50): <input value={form_inputs.amount} className='input_box' name="amount" id="amount" type="number" min="1" max="50" onChange={ change }  />
                </label>
                <br/>
                <label htmlFor="user_name" className={"input_fields"}>
                    Thy name? <input className='input_box' type="text" id="user_name" name="user_name" placeholder="Bob Saget, I hope?"  onChange={ change } required/>  <br/>
                </label><br/ >

                <br/>
                {showButton(props.isLoading)}
            </form>
        </div>
    );
};

const test = (e) => {
    console.log( "VALUE: ", e.target.value)
}

const createOption = (options, callBack) => {
    return(
        <label className={"input_fields"}>
            {options.text}
            <select className='input_box' name={options.name} value={options.value} onChange={ (e)=>callBack(e.target.name, e.target.value) }>
                {options.vals.map( cat => <option key={cat}> {cat} </option> ) }
            </select>
        </label>

    )
}


Homepage.propTypes = {
    currentQuestion: PropTypes.object,
    selectQuestion: PropTypes.func,
    categories: PropTypes.array,
    answeredQuestions: PropTypes.array
};


export default Homepage;
