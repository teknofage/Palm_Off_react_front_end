/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react';
import BarcodeReader from 'react-barcode-reader';
import buddies from './images/buddies.jpeg'; 

// function App() {
//   return <h1>Hello Mitchell</h1>;
// }
import './App.css';

const list_of_palm_oil_derivatives = [
  "palm oil", 
  "palm kernel oil", 
  "PKO", 
  "partially hydrogenated palm oil", 
  "PHPKO", 
  "fractionated palm oil", 
  "FPO", 
  "FPKO", 
  "palmate", 
  "sodium laureth sulphate", 
  "elaeis guineensis", 
  "glyceryl stearate", 
  "hydrated palm glycerides", 
  "cetyl palmitate", 
  "decyl glucoside", 
  "lauryl glucoside", 
  "sodium lauryl sulfate", 
  "ascorbyl palmitate",
  "retinyl palmitate",
  "ethylhexylglycerin",
  "glyceryl stearate",
  ]

class App extends Component {
  constructor(props) {
    super(props)

    // State holds values returned from server
    this.state = {
      about: null,
      message: null,
      data: null,
      foodName: "", 
      foodLink: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.fetchMessage = this.fetchMessage.bind(this);
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
    var name = this.state.foodName
    fetch(`/food?name=${name}`).then(res => res.json()).then((json) => {
      console.log(">", json)

      let updatedJson = json.items.map(jsonItem => {
        jsonItem = {...jsonItem, palmOilMatches: this.findPalmOilIngredients(this.formatIngredients(jsonItem.ingredients))}
        return jsonItem;
      })      

      console.log("Updated json: ", updatedJson);

      this.setState({
        data: updatedJson,
      })
      
    }).catch((err) => {
      console.log(err.message)
    })
  }

  findPalmOilIngredients = (inputDerivatives) => {
    let matches = new Set();

    inputDerivatives.forEach(inputItem => {
      list_of_palm_oil_derivatives.forEach(constItem => {
        if(inputItem === constItem){
          matches.add(inputItem)
        }
      })
    })

    return Array.from(matches);
  }

  formatIngredients = (ingredients) => {
    console.log(`Ingredients before split: `, ingredients)

    // formatting ingredients
    if(ingredients == null){
      return [];
    }

    let lower_derivatives = ingredients && ingredients.toLowerCase().replace("(", "").replace(")", "")
    let lower_derivatives_arr = lower_derivatives && lower_derivatives.split(",")
    lower_derivatives_arr = lower_derivatives_arr.map(item => {
      return item.trim()
    })

    console.log(`Ingredients after split:`, lower_derivatives_arr)
    return lower_derivatives_arr;
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
  
  handleChange(event) {
    this.setState({foodName: event.target.value});
  }

  render_data() {
    if (this.state.data === null) {
      return null
    }
    return this.state.data.map((item)=> {
      console.log("ITEM:",item)
      const nutrients = item.nutrients.map((nutrient)=> {
        return <li>Name: {nutrient.name} Per 100g: {nutrient.per_100g}</li>
      })
      // parsing an object
      const diet_label_keys = Object.keys(item.diet_labels)
      // parsing an array
      const diet_labels = diet_label_keys.map((diet_label)=> {
        return <p>{item.diet_labels[diet_label].name}: {item.diet_labels[diet_label].is_compatible ? "Yes" : "No" }</p>
      })

      return (
        <div>
          <div class="item-name">
            <p>Product Name: {item.name}</p>
          </div>
          <div class="brand">
            <p>Brand: {item.brand}</p>
          </div>
          {/* <h3>Allergens: {item.allergens}</h3> */}
          <div class="item-ingredients">
            <p>Ingredients: {item.ingredients}</p>
          </div>
          <div class="palm-oil-ingredients">
            <p>Contains Following Palm Oil Ingredients: {item.palmOilMatches.join(", ")}</p>
          </div>
          {/* diet labels object needs to be converted */}
          {/* <h3>Diet Labels: {item.diet_labels}</h3> */}
          {/* diet flags object needs to be converted */}
          {/* <h3>Diet Flags: {item.diet_flags}</h3> */}
          {/* <h3>Gluten Free: {item.gluten}</h3> */}
          {/* <h3>Gluten Free: {item.name}</h3> */}
          <div class="nutrients">
            <ul>Nutrients: {nutrients}</ul>
          </div>
          <div class="diet-labels">
            <ul>Diet Labels: {diet_labels}</ul>
          </div>
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
          <strong>Palm Off:</strong>
          {about}
        </p>
        <div>
          <img src={buddies} alt="orange buddies" />
        </div>
        <div>{this.renderMessage()}</div>
          <div className="input-group"> 
            <span className="input-group-addon">insert query prefix here
            </span>
            <input type="text" value= {this.state.foodName} onChange={this.handleChange} className="form-control" placeholder="nutella" />
            <span className="input-group-btn">
              <button onClick={this.fetchMessage}
              className="btn btn-primary">Search</button>
            </span>
          </div>
          <div>{this.renderMessage()}</div>
          <div className="link-input"> 
            {/* <span className="link-input-group">insert link to food product here
            </span>
            <input type="link" value= {this.state.foodLink} onChange={this.handleChange} class="form-control" placeholder="nutella" />
            <span className="link-input-btn">
              <button onClick={this.fetchMessage}
              className="btn btn-primary">Search</button>
            </span> */}
          </div>
        { this.render_data() }
      </div>
    );
  }
}

export default App;
