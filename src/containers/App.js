import React, {Component} from 'react';
import './App.css';
import styles from './App.module.css';
import Person from '../components/Persons/Person/Person';
import Radium, {StyleRoot} from 'radium';

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

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  render () {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
      <div>
        {
          this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })
        }
      </div>
      );
      btnClass = styles.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(styles.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push( styles.bold );
    }


    return (
      <StyleRoot>
        <div className={styles.App}>
          <h1>Hi, I'm a react app.</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button 
          className={btnClass}
            onClick={this.togglePersonsHandler}>Switch Name</button>
            {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(app);

