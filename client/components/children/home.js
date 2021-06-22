// Basic component to create the home page

import React from 'react';
import PropTypes from 'prop-types';


const Homepage = props => {
    console.log("PROPS: ", props);
    const {form_inputs, form_defaults} = props.root_state
    console.log("Defaults: ", form_defaults)
    const cats = Object.keys( form_defaults.categories ) ;
    const diffs = form_defaults.difficulties ;
    return (
        <div className={'form_container'}>
            <form onSubmit={props.submit_form}>
                { createOption( {name:'category', value:form_inputs.category, vals:cats, text:"Choose your Category "}, props.change_form) } <br/>
                { createOption( {name:'difficulty', value:form_inputs.difficulty, vals:diffs, text:"Choose your Difficulty "}, props.change_form) } <br/>
                <br/>
                <input type="submit" value="Submit" className="submit_action"  ></input> <br/> <br/>
                <div className={'question_container'}>Hit 'Submit' and lets test your wits!</div>
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
            <select name={options.name} value={options.value} onChange={ (e)=>callBack(e.target.name, e.target.value) }>
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
