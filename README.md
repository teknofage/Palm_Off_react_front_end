# React Express Front End Starter 

This project is a front end project meant to work with the Express backend [here](https://github.com/teknofage/Palm_Off_react_express_server). 

The goal of this project is to provide a front end for the Palm OFF API.

With Palm OFF, users can quickly search a food product using text, or a barcode, and determine whether it contains any potential allergens or palm oil derivatives. The API also returns information about whether the producer uses sustainable pal oil sources.

## Getting started 

This project is made up two parts. The React front end client and the Express backend server. 

Install and run this project: 

- `npm install`
- `npm start`

View the project at: [http://localhost:3000](http://localhost:3000)

### Proxy Server 

This project is viewed at http://localhost:3000 but it sends messages and communicates with the backend through it's proxy server on port: 4000. 

Look at [package.json](package.json). Line 10: 

`"proxy": "http://localhost:4000"`

Network requests made from this project will come from this address. 

Look at the Express server project. In `server.js` at the end of file you'll find: 

```JS
const port = 4000
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))
```

This project runs on port: 4000. 

You'll need to have both projects running at the same time! Launch the Palm OFF Express server first using terminal. Open another terminal navigate to this folder and launch this project. 

## Launching

You'll need to run both the server and the React Front end at the same time. Open each in a separate terminal. 

Launch the server: 

`nodemon server.js`

Launch the React front end:

`npm start`



Look at 'App.js'. Here 

does the work of making a request to the server. 

You need to examine this and make sure it's doing the following: 

- Calling the correct route
  - Keep your eye on the terminal for errors the catch block will print any error messages 
- Make sure you are passing the correct parameters. 
  - GET - query vars can be added to the URL


**Your Express server will make the request to the API and respond with JSON.** 

**Why**? Using an intermediary or proxy server input a service and your endpoint allows you to modify and polish the data that is passed on. You can use this technique to aggrate data from several different services. 

