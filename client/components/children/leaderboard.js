import React, { Component } from "react";
import PropTypes from 'prop-types';


export default class LeaderBoard extends Component {
    constructor(props){
        super(props);
        this.state = {...props, scores:[]}
        this.getData()
    }
    getData(){
        fetch( '/api/highscores' )
            .then((response) => response.json())
            .then((data) => {
                console.log("DATA: ", data)
                this.setState({scores:data[0]})
            } );
    }

    componentDidMount(){

    }

    render(){
    //console.log("Categories.js PROPS: ", props)
    return (
        <div className={'leaderboard_container'} >
                <h1>Top 10 current high scores:</h1>
            <div className={'leaderboard_wrapper'}>
                {this.state.scores.map( (entry, index)=>{
                    const phrase1 = `${index+1}: ${entry.user_name} got ${entry.score_percent} percent in ${entry.total_time/1000} seconds`
                    const phrase2 = `\t  Category: ${entry.category} - Difficulty: ${entry.difficulty}`
                    return(
                        <div className='score_row' key={"BLAH"+index}> {phrase1}<br/>{phrase2} <br/><hr/></div>
                    )
                })}
            </div>
        </div>
        )
    }
}


// export default LeaderBoard;
