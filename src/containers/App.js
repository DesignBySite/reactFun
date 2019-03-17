import React, {Component} from 'react';
import Radium, {StyleRoot} from 'radium';
//Styles
import './App.css';
//Components
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class app extends Component {
  state = {
    persons: [
      { id: Math.floor(Math.random() * 30), name: 'Max', age: 28 },
      { id: Math.floor(Math.random() * 30), name: 'Billy', age: 22 },
      { id: Math.floor(Math.random() * 30), name: 'Kevin', age: 29 }
    ],
    otherState: 'some other value',
    showPersons: true
  };

  //Changes displayed name as you type in input fiels
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState ({persons: persons});
  }

  //Deletes person if you click on paragraph field
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  //Clciking button shows or hides persons
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  
  render () {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}/>
    }

    return (
      <StyleRoot>
        <div>
          <Cockpit 
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            toggle={this.togglePersonsHandler}/>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(app);

