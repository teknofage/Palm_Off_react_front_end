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
      this.formatIngredients(json.items[0].ingredients)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  formatIngredients = (p_o_derivatives) => {
    console.log(`Ingredients before split: `, p_o_derivatives)

    // formatting ingredients

    let lower_derivatives = p_o_derivatives && p_o_derivatives.toLowerCase().replace("(", "").replace(")", "")
    let lower_derivatives_arr = lower_derivatives && lower_derivatives.split(",")
    lower_derivatives_arr = lower_derivatives_arr.map(item => {
      return item.trim()
    })

    console.log(`Ingredients after split:`, lower_derivatives_arr)
    return this.state.map(lower_derivatives_arr)
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
      const nutrients = item.nutrients.map((nutrient)=> {
        return <li>Name: {nutrient.name} Per 100g: {nutrient.per_100g}</li>
      })
      // parsing an object
      const diet_label_keys = Object.keys(item.diet_labels)
      // parsing an array
      const diet_labels = diet_label_keys.map((diet_label)=> {
        return <p>{item.diet_labels[diet_label].name}: {item.diet_labels[diet_label].is_compatible ? "Yes" : "No" }</p>
      })
      const list_of_palm_oil_derivatives = ["palm oil", "palm", "palm kernel oil", "PKO", "partially hydrogenated palm oil", "PHPKO", "fractionated palm oil", "FPO", "FPKO", "palmate", "sodium laureth sulphate", "elaeis guineensis", "glyceryl stearate", "hydrated palm glycerides", "cetyl palmitate"]
      // const p_o_derivatives = item.ingredients
      
      let arr1 = list_of_palm_oil_derivatives
      let arr2 = lower_derivatives_arr

      function arrayMatch(arr1, arr2) {
        var arr = [];
        // arr1 = arr1.toString().split(',').map(Number);
        // arr2 = arr2.toString().split(',').map(Number);
        console.log(arr1);
        // for array1
        for (var i in arr1) {
            if(arr2.indexOf(arr1[i]) !== -1)
            arr.push(arr1[i]);
        }
        console.log(arr);
     
        return arr.sort((x,y) => x-y);
        }
     
        console.log(arrayMatch(arr1, arr2)); 



      return (
        <div>
          <h2>Name: {item.name}</h2>
          {/* <h3>Allergens: {item.allergens}</h3> */}
          <p>Ingredients: {item.ingredients}</p>
          {/* <h3>Contains Palm Oil: {item.palm_oil_ingredients.true}</h3> */}
          {/* diet labels object needs to be converted */}
          {/* <h3>Diet Labels: {item.diet_labels}</h3> */}
          {/* diet flags object needs to be converted */}
          {/* <h3>Diet Flags: {item.diet_flags}</h3> */}
          {/* <h3>Gluten Free: {item.gluten}</h3> */}
          {/* <h3>Gluten Free: {item.name}</h3> */}
          <h3>Brand: {item.brand}</h3>
          <ul>Nutrients: {nutrients}</ul>
          <div>Diet Labels: {diet_labels}</div>
        </div>
      )
    }) 

    return this.state.data.items.map((item)=> {
      return <h3>Allergens: {item.allergens}</h3>
      return <h3>Ingredients: {item.ingredients}</h3>
      return <h3>Contains Palm Oil: {item.palm_oil_ingredients.true}</h3>
      return <h3>Diet Labels: {item.diet_labels}</h3>
      return <h3>Diet Flags: {item.diet_flags}</h3>
      return <h3>Gluten Free: {item.gluten}</h3>
      return <h3>Gluten Free: {item.name}</h3>
    }
    )
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
