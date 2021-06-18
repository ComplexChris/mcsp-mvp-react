import React, { Component } from "react";
import categories_raw from "./Categories JSON";
import Homepage from './children/home'

const raw_categories = require('./Categories JSON.js');
console.log( "RAW", raw_categories)

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialize state.
    this.state = {
      user_name: "",
      user_token: "",
      quiz_master: {},
      page: "home",
      form_inputs : {
        category:'Any', 
        difficulty:'easy',
      },
      form_defaults: {
        categories: raw_categories,
        difficulties: ['easy', 'medium', 'hard']
      },
      test_results: {},
      categories_raw
    };
  }

  setCategoryOld( obj ){
    this.setState( obj )
  }
  change_form (key, val) {
    this.setState( {form_inputs: {...this.state.form_inputs, [key]:val}}, ()=>{
      console.log("New State: ", this.state)
    } )
  }
  submit_form(e){
    console.log('A name was submitted: ', this.state);
    this.componentDidMount();
    e.preventDefault();
  }

  get_quiz(){
    // https://opentdb.com/api.php?amount=10
  }

  do_fetch(url){
    //
    fetch("/api/tweets")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  componentDidMount() {
    fetch("/api/tweets")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
    <div id={'container'} >
      <Homepage root_state={this.state} change_form={this.change_form.bind(this) }  submit_form={this.submit_form.bind(this)} />
    </div>
    )
  }
}
