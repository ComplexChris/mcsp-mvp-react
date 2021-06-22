import React, { Component } from "react";
import Homepage from './children/home'
import Quiz from './children/quiz'
import ShowResults from './children/results'
import LeaderBoard from './children/leaderboard'

const raw_categories = require('./Categories JSON.js');
console.log( "RAW", raw_categories)

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialize state.
    this.state = {
      isLoading:false,
      user_name: "",
      user_token: "",
      current_quiz_id: 0,
      quiz_master: {
        response_code: -1,
        results: []
      },
      page: "HOME",    // Pages: HOME, QUIZ, RESULTS
      form_inputs : {
        category:'Any',
        difficulty:'easy',
        user_name: ""
      },
      form_defaults: {
        categories: raw_categories,
        difficulties: ['easy', 'medium', 'hard']
      },
      test_results: { 1234:{started:1234, score:0, total_questions:10, category:'Any', difficulty:'hard', percentage:0} }
    };
    this.state_defaults = {...this.state}
  }

  setCategoryOld( obj ){
    this.setState( obj )
  }
  change_form (key, val) {
    this.setState( {form_inputs: {...this.state.form_inputs, [key]:val}}, ()=>{
      // console.log("New State: ", this.state)
    } )
  }

  do_fetch(url, callBack){
    //
    console.log("URL: ", url);
    fetch( url )
      .then((response) => response.json())
      .then((data) => this.setState( {'quiz_master':data}, callBack ));
  }
  do_post(quiz_data){
    fetch('/api/submit_quiz', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( quiz_data )
    }).then(res => res.json())
      .then(res => console.log(res));
  }

  submit_form(e){
    // Starts the quiz
    this.setState( {
      isLoading: true
      }, ()=> {
        setTimeout(() => {
          this.init_quiz()
        }, 4200);
      } )
    e.preventDefault();
  }
  init_quiz(){
    // console.log('A name was submitted: ', this.state);
    const test = this.do_fetch( this.create_URL(), ()=> {
      if( this.state.quiz_master.response_code !== 0){
        alert("Sorry pal, I couldn't make you a quiz right now.");
        return;
      }
      const now = Date.now() ;
      const temp_state = { ...this.state.test_results }
      temp_state[ now ] = {
        ...this.state.form_inputs,
        totalTime:0,
        score:0,
        total_questions:this.state.quiz_master.results.length
      }
      this.setState({
        test_results: {...temp_state},
        current_quiz_id: now,
        page:'QUIZ'}
      ) } )
  }

  submit_quiz( score, raw_data ){
    // Grades quiz and resets state defaults
    console.log("QUIZ SUBMITTED: ", score)

    const current_quiz = this.state.test_results[ this.state.current_quiz_id ];
    this.state.test_results[ this.state.current_quiz_id ] = {
      ...current_quiz,
      totalTime: Date.now() - this.state.current_quiz_id ,
      score: score,
      percentage: Math.ceil((score/this.state.quiz_master.results.length)*100)
    }
    this.do_post( this.state.test_results[ this.state.current_quiz_id ] )

    //const current_question = this.state.current_quiz_id;
    //this.reset_state( score )
    const quiz_master = {
      response_code: 99,
      results: raw_data.questions,
      their_answers: raw_data.answered_questions,
      score
    }
    this.setState({
      'page':'RESULTS',
      quiz_master,
  })
  }

  reset_state( score ){
    // Resets the state to defaults but keeps the submitted test cached
    const new_state = {...this.state_defaults, } ;
    new_state.test_results = { ...this.state.test_results }

    console.log("NEW STATE: ", new_state)
    this.setState( {
      ...new_state
    }, () => {
      this.state_defaults = {...this.state}
      this.setState({'page':'HOME'})
    } ) ;
  }

  create_URL(){
    let link = "https://opentdb.com/api.php?amount=2"
    const conv = (key) => this.state.form_defaults.categories[key]
    Object.keys( this.state.form_inputs ).map( (key) => {
      if(key!=="user_name"){
        const val = this.state.form_inputs[key]
        link += `&${key}=${ (key=='category') ? conv(val) : val }`
      }
    } )
    return link
  }

  get_quiz(){
    // https://opentdb.com/api.php?amount=10
  }

  componentDidMount() {
    console.clear()
  }

  getPage(){
    switch( this.state.page) {
      case "HOME":
        // Can do additional stuff if page was "HOME"
      default:
        return (
            <Homepage isLoading={this.state.isLoading} root_state={this.state} change_form={this.change_form.bind(this) }  submit_form={this.submit_form.bind(this)} />
      )
      case "QUIZ":
        return <Quiz questions={this.state.quiz_master.results} submit_quiz={this.submit_quiz.bind(this)} />

      case "RESULTS":
        const reset_all = () => { this.reset_state() }
        const { test_results, quiz_master, current_quiz_id  } = this.state
        return <ShowResults goHome={ reset_all.bind(this) }  results={test_results[current_quiz_id] } quiz_master={quiz_master}   />
  }
}

getLeaderBoard(){
  return(
    (this.state.page=='HOME') ?
      <LeaderBoard /> :
      <div/>
  )
}

  render() {

    console.log("APP.js RENDERED: ", this.state)
    return (
      <div className={'app_container'} >
        { this.getPage() }
        { this.getLeaderBoard() }
      </div>
    )
  }
}
