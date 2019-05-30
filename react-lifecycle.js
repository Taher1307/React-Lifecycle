//to get the better understanding about the two new methods refer the link given below.
//"https://medium.com/@baphemot/understanding-react-react-16-3-component-life-cycle-23129bc7a705"
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  //This method is only called one time, which is before the initial render. 
  //Since this method is called before render() the Component will not have access to the DOM.
  //And this component is deprecated by react devolopers.
  componentWillMount() {
    console.log("componentWillMount");
  }

  //This method is called once the component is actually mounted to the DOM.
  //Once the component is mounted this method will render it to the browser.
  //This methos will call the tick function for every one sec as given in setInterval to update it's state.
  componentDidMount() {
    //console.log(this, 'this')
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  //This method replaces "componentWillRecieveProps" which is deprecated by react developers.
  //This is a static method and this method will be called in the lifecycle after componentDidMount.
  static getDerivedStateFromProps(props) {
    //console.log(this, 'this')
    console.log('getDerivedStateFromProps' + props);
    return true;
  }

  //This method returns a boolean value if the state or the props of this application change.
  //If the method return false then the program skips the other lifecycle methods and jumps to componentWillUnmount.
  //If it returns true then the state and props will update as per the given condition.
  //Here I've given a condition to return a value just to understand how this method works.
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    if (nextState.date) {
      //console.log('shouldComponentUpdate check');
      return nextState.date.getSeconds() % 5 === 0
    }
    return false;
  }

  //This method replaces "componentWillUpdate" which is deprecated by react developers.
  //Even though it is not static it is recommended to return the value, not update the component.
  //The returned value will be passed to componentDidUpdate as the 3rd parameter.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevProps, prevState);
  }

  //This method is the Update version of componentDidMount().
  //Just like componentDidMount(), the componentDidUpdate() is called after all of the props are updated. 
  componentDidUpdate(prevProps) {
    console.log('componentdidUpdate', prevProps);
  }

  //Right before React unmounts and destroys our component, it invokes componentWillUnmount.
  //This could be cleaning up DOM elements we've created in componentDidMount.
  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
