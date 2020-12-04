/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react';

// function App() {
//   return <h1>Hello Mitchell</h1>;
// }
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    // State holds values returned from server
    this.state = {
      about: null,
      message: null,
      data: null,
    }
  }

  componentDidMount() {
    // Use Fetch to call API. The /test route returns a simple string
    // This call in componentDidMount will only be called once
    fetch('/about').then((res) => {
      // stream the response as JSON
      return res.json()
    }).then((json) => {
      console.log(json)
      const { about } = json // Get a value from JSON object
      this.setState({ about }) // Set a value on state with returned value
    }).catch((err) => {
      // Handle errors
      console.log(err.message)
    })

    // Let's call another API
    this.fetchMessage()
  }

  fetchMessage() {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.
    // This calls a route and passes value in the query string.
    fetch('/food?name=Nutella').then(res => res.json()).then((json) => {
      console.log(">", json)
      this.setState({
        data: json,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  renderMessage() {
    // Used to conditionally render data from server.
    // Returns null if message is null otherwise returns
    // a populated JSX element.
    const { message } = this.state
    if (message === null) {
      return undefined
    }

    return <h1>{message}</h1>
  }

  render_data() {
    if (this.state.data === null) {
      return null
    }
    return this.state.data.items.map((item)=> {
      return <h1>Name: {item.name}</h1>
      return <h3>{item.allergens}</h3>
    }) 
  }

  
  render() {
    const { about, data } = this.state

    return (
      <div className="App">
        <p>
          <strong>About:</strong>
          {about}
        </p>
        <div>{this.renderMessage()}</div>
        <p>
          <button
            type="button"
            onClick={() => {
              this.fetchMessage()
            }}
          >
          Random
          </button>
        </p>
        { this.render_data() }
      </div>
    );
  }
}

export default App;
