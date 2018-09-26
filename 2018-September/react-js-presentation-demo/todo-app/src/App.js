import React, { Component } from 'react';
import './App.css';

import Note from './components/Note';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      notes: []
    }

    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
  }

  /*set focus to input when the component mounts*/
  componentDidMount() {
    this.textInput.focus();
  }

  /*set focus to input every update*/
  componentDidUpdate() {
    this.textInput.focus();
  }

  /*update the current text state*/
  onInputChangeHandler(event) {
    this.setState({
      text: event.target.value
    });
  }

  /*add to notes when button is clicked*/
  onClickHandler() {
    this.addToNotes();
    this.textInput.focus();
  }

  /*add to notes when "Enter" is pressed*/
  onKeyPressHandler(event) {
    if(event.key === "Enter") {
      this.addToNotes();
    }
  }

  /*add the current text state to the notes array*/
  addToNotes() {
    if(!/\S/.test(this.state.text)) { return } //returns if input does not contain characters

    const date = new Date().toLocaleTimeString();

    this.setState({
      text: '',
      notes: [...this.state.notes, {note: this.state.text, date: date}] // ES6 Spread operator
    });

    /*could also use this*/
    // this.setState({
    //   text: '',
    //   notes: this.state.notes.concat(["new"])
    // });
  }

  deleteHandler(event, index) {
    const notes = this.state.notes; //we assign this.state.notes to notes
                                    //before splicing to maintain state immutability
    
    notes.splice(index, 1); //removes the element starting at first argument ("index")
                            //second argument determines how many elements 
                            //should be removed starting from "index"

    this.setState({         //assign the new array to our notes state
      notes: notes
    });
  }

  render() {
    let notes = this.state.notes.map((note, index) => {
      return <Note key={index} text={note.note} date={note.date} onClickHandler={(event) => this.deleteHandler(event, index)}/>
    });

    return (
      <div className="container">
        <div className="header"> React Todo App </div>
        {notes}
        <button className="btn" onClick={this.onClickHandler}>+</button>
        <input
          type="text"
          className="textInput"
          value={this.state.text}
          ref={(ref) => this.textInput = ref}
          onChange={this.onInputChangeHandler}
          onKeyPress={this.onKeyPressHandler}
        />
      </div>
    );
  }
}

export default App;