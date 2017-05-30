import React from 'react';
import Categories from '../config'
import {fetchQuestions} from '../actions/action'
import {connect} from 'react-redux'

export class Header extends React.Component {
    constructor (props) {
        super(props);
        this.getQuestions = this.getQuestions.bind(this)
    }

    getQuestions(event){
        const category = event.target.value;
        console.log('category is ' + category);
        this.props.dispatch(fetchQuestions(category,"hard"));

    }

    render(){
        const topics = Object.keys(Categories).map((topic, index) => (
            <li key={index}>
                <button className='topic-button' onClick={this.getQuestions} value={Categories[topic]}>{topic}</button>
            </li>
        ));
        return (
            <section className="header">
                <h1> Quiz App </h1>
                <ul id ='topic-list'>
                    {topics}
                </ul>
                {/*<button onClick={}>Submit</button>*/}
            </section>
        )
    }
}


export default connect()(Header);
