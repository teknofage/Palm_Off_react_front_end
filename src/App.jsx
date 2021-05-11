/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react';
import BarcodeReader from 'react-barcode-reader';
import buddies from './images/buddies.jpeg';
import { Link, navigate} from '@reach/router';
import axios from 'axios';

// import './login.html'
// import './sign-up.html'

import './App.css';

const list_of_palm_oil_derivatives = [
  "ascorbyl palmitate",
  "cetyl palmitate",
  "cetyl alcohol", 
  "decyl glucoside",
  "elaeis guineensis",
  "emulsifier 422", 
  "emulsifier 430", 
  "emulsifier 431", 
  "emulsifier 432", 
  "emulsifier 433", 
  "emulsifier 434", 
  "emulsifier 435", 
  "emulsifier 436", 
  "emulsifier 470", 
  "emulsifier 471", 
  "emulsifier 472", 
  "emulsifier 473", 
  "emulsifier 474", 
  "emulsifier 475", 
  "emulsifier 476", 
  "emulsifier 477", 
  "emulsifier 478", 
  "emulsifier 481", 
  "emulsifier 482", 
  "emulsifier 483", 
  "emulsifier 493", 
  "emulsifier 494", 
  "emulsifier 495", 
  "ethylhexylglycerin", 
  "fractionated palm oil", 
  "FPO", 
  "FPKO", 
  "glyceryl stearate", 
  "hydrated palm glycerides", 
  "lauryl glucoside",
  "octyl palmitate",
  "palmolein",
  "palmate", 
  "palmitate",
  "palmitoyl",
  "palmityl alcohol",
  "palmitoleic",
  "palm oil", 
  "palm kernel",
  "palm kernel oil", 
  "palm fruit oil",
  "palm stearine",
  "palm stearate",
  "PKO", 
  "partially hydrogenated palm oil", 
  "PHPKO",
  "retinyl palmitate",
  "sodium dodecyl sulfate", 
  "sodium dodecyl sulphate", 
  "sodium kernelate",
  "sodium laureth sulfate",
  "sodium laureth sulphate",
  "sodium lauryl lactylate",
  "sodium lauryl sulfate", 
  "sodium lauryl sulphate",
  "steareath 2",
  "steareath 20",
  "sulfoacetate",
  "vitamin a palmitate",
  ]

  const list_of_food_producers_wwf_po_scores = [
    {name: "ferrero", rspoMember: "Yes", score2020: 21.5}, 
    {name: "mars", rspoMember: "Yes", score2020: 17.25},
    {name: "nestle", rspoMember: "Yes", score2020: 21.5},
    ]

  // const list_of_fully_sustainable_supply_chains_2019 = [
  //   "conagra",
  //   "ferrero",
  //   "general mills",
  //   "hershey", 
  //   "kellogg",
  //   "kraft heinz",
  //   "mars",
  //   "pepsico",
  //   "smucker's",
  // ]

  function findBrand(brand) {
    // console.log("Brand before: ", brand)
    brand = brand.toLowerCase().replace("(", "").replace(")", "").replace(/\./g, "").replace(",", "")
    for (let i = 0; i < list_of_food_producers_wwf_po_scores.length; i += 1) {
      const foodProducer = list_of_food_producers_wwf_po_scores[i]
      // console.log("Brand after: ", brand)
      // console.log("Name of brand in list of Producers: ", foodProducer.name)
      if(brand.includes(foodProducer.name)) {
        return foodProducer
      }
    }
    return {name: "No brand listed, or no brand match.", rspoMember: "Not enough data", score2020: "Not enough data"} 

  }  

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
      result: 'No result',
    }
    this.handleChange = this.handleChange.bind(this);
    this.fetchMessage = this.fetchMessage.bind(this);
    this.fetchLogout = this.fetchLogout.bind(this);
    this.fetchLogin = this.fetchLogin.bind(this);
    this.fetchSignup = this.fetchSignup.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  renderBarcode(){
 
    return(
      <div>
        <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
  

  componentDidMount() {
    // Use Fetch to call API. The /test route returns a simple string
    // This call in componentDidMount will only be called once
    fetch('/about').then((res) => {
      // stream the response as JSON
      return res.json()
    }).then((json) => {
      // console.log(json)
      const { about } = json // Get a value from JSON object
      this.setState({ about }) // Set a value on state with returned value
      
    }).catch((err) => {
      // Handle errors
      // console.log(err.message)
    })

    // Let's call another API
    this.fetchMessage()
  }

  fetchMessage() {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.
    // This calls a route and passes value in the query string.
    const name = this.state.foodName
    fetch(`/food?name=${name}`)
      .then(res => res.json())
      .then((json) => {
      // console.log(">", json)    

      // console.log(`Updated json: `, updatedJson);
      if ( json.error ) {
        this.setState({ 
            data: json
        })
      } else {
        let updatedJson = json.items.map(jsonItem => {
          const {rspoMember, score2020} = findBrand(jsonItem.brand)
          console.log("RSPO Member? ", rspoMember, "Score 2020 ", score2020)
          jsonItem = {...jsonItem, 
            palmOilMatches: this.findPalmOilIngredients(this.formatIngredients(jsonItem.ingredients)), 
            rspoMember,
            score2020
          }
          // console.log("*********")
          // console.log("jsonItem: ", jsonItem)
          return jsonItem;
        })  
        this.setState({
            data: updatedJson,
        })
      }
      
    }).catch((err) => {
      console.log("Error Message: ", err.message)
    })
  }

  fetchSignup() {
    fetch(`/sign-up`)
    .then((res) => {
      return <p>Hello Cao!</p>
    })
  }
  

  fetchLogin() {
    fetch(`/login`)
    .then(res.render`/login`)
  }

  fetchLogout() {
    fetch(`/logout`)
    .then(res.render`/logout`)
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
    // console.log(`Ingredients before split: `, ingredients)

    // formatting ingredients
    if(ingredients == null){
      return [];
    }

    let lower_derivatives = ingredients && ingredients.toLowerCase().replace("(", "").replace(")", "")
    let lower_derivatives_arr = lower_derivatives && lower_derivatives.split(",")
    lower_derivatives_arr = lower_derivatives_arr.map(item => {
      return item.trim()
    })

    // console.log(`Ingredients after split:`, lower_derivatives_arr)
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
    const {data} = this.state
    if (data === null || data.error) {
      return null
    }
    return data.map((item)=> {
      // console.log("ITEM:",item)
      const nutrients = item.nutrients.map((nutrient)=> {
        return <li>Name: {nutrient.name} Per 100g: {nutrient.per_100g}</li>
      })
      // parsing an object
      const diet_label_keys = Object.keys(item.diet_labels)
      // parsing an array
      const diet_labels = diet_label_keys.map((diet_label)=> {
        return <p>{item.diet_labels[diet_label].name}: {item.diet_labels[diet_label].is_compatible ? "Yes" : "No" }</p>
      })

      // parsing an object
      const diet_flag_keys = Object.keys(item.diet_flags)
      // parsing an array
      const diet_flags = diet_flag_keys.map((diet_flag)=> {
        return <p>{item.diet_flags[diet_flag].name}: {item.diet_flags[diet_flag].is_compatible ? "Yes" : "No" }</p>
      })

      return (
        <div>
          <div className="item-name">
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
            <p>Contains Following Palm Oil Ingredients and/or Derivatives: {item.palmOilMatches.join(", ")}</p>
          </div>
          <div class="rspo-membership">
            <p>Is Producer a Member of the Roundtable for Sustainable Palm Oil (RSPO)?: {item.rspoMember}</p>
          </div>
          <div class="wwf-po-2020-scores">
            <p>How did the WWF rate this company in terms of upholding its commitments to eliminating deforestation from its palm oil supply chain in 2020?: {item.score2020} / 22</p>
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
          <div class="diet-flags">
            <ul>Diet Flags: {diet_flags}</ul>
          </div>
        </div>
      )
    }) 

    // return this.state.data.items.map((item)=> {
    //   return <h3>Allergens: {item.allergens}</h3>
    //   return <h3>Ingredients: {item.ingredients}</h3>
    //   return <h3>Contains Palm Oil: {item.palm_oil_ingredients.true}</h3>
    //   return <h3>Diet Labels: {item.diet_labels}</h3>
    //   return <h3>Diet Flags: {item.diet_flags}</h3>
    //   return <h3>Gluten Free: {item.gluten}</h3>
    //   return <h3>Gluten Free: {item.name}</h3>
    // }
    // )
  }

  
  render() {
    const { about, data } = this.state
    console.log("Bend the knee!", data)
    return (
      <div className="App">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
        <ul>
          {/* <span className="input-group-btn">
              <button onClick={this.fetchLogout}
              className="btn btn-primary">Logout</button>
            </span> */}
           
           <span className="input-group-btn">
              <Link to="/login"><button className="btn btn-primary">Login</button></Link>
            </span>
         
          <span className="input-group-btn">
              <button onClick={this.fetchSignup}
              className="btn btn-primary">Signup</button>
            </span>
          </ul>
      </div>
    </nav>
        <p>
          <strong>Palm Off:</strong>
          {about}
        </p>
        <div>
          <img src={buddies} alt="orange buddies" />
        </div>
        <div>{this.renderMessage()}</div>
          <div className="input-group"> 
            <span className="input-group-addon">Insert name of food product here. More precise searches result in more selectively filtered results.
            </span>
            <input type="text" value= {this.state.foodName} onChange={this.handleChange} className="form-control" placeholder="nutella" />
            <span className="input-group-btn">
              <button onClick={this.fetchMessage}
              className="btn btn-primary">Search</button>
            </span>
            <div>
            {/* How's my driving? Call 0891-50-50-50 */}
            {/* if/else statement with double boolean, : is else */}
              {data && data.error ? <p>{data.error}</p> : null}
            </div>
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
