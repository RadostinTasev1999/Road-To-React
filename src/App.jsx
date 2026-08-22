import './App.css'
import { useState } from 'react'
//! Component has to start with Capital letter

// const title = 'React'; // -> JavaScript string primitive


const App = () => {
// JSX - JavaScript XML - combines HTML and JavaScript
//! -> The process of moving state from one component to another (from Search -> to App) is called lifting state

const stories = [
  {
     title: 'React',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Angular',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 1
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 2
  }
  ]

const [searchTerm, setSearchTerm] = useState('');
const [checked, setChecked] = useState(false)


const handleCheck = () => {

  setChecked(state => !!state)
}
  
// -> this way we can notify the App component, when a user types into the input field in the Search component.
  const handleSearch = (event) => {

    console.log('input field value is:', event.target.value)
    setSearchTerm(event.target.value)
 
  }

  const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()))
  // substring 'react'
  

  const handleTest = (message) => {
  console.log('Message from child is:', message)
}

// console.log('App component renders!')
   
return (
   <>
      <div>
        <h1>My Hacker Stories</h1>
      {/* Leaf component -> component which does not render any component */}
        <Search search={searchTerm} onSearch={handleSearch} onTest={handleTest}/>
        <hr />
        <CheckBox check={checked} onCheck={handleCheck}/>
        <hr />
        {/* Here we instantiate List component */}
        <List list={filteredStories}/> 
        <hr />
        <Form />

      </div>
    </>
    )
  }


const List = (props) => {
    /* -> this child component receives parameter props
         as object in its function signature which includes
         all the passed attributes as properties

        -> props - immutable data structure
  */

        // console.log('List component renders')
   return (
     <ul>
       {
         props.list.map((item) =>
         (
           <Item key={item.objectID} item={item} />
           // Item is leaf component, a component which does not render any components
         )
         )
       }
     </ul>
    )
  }


const Item = (props) => {

  // console.log('Item component renders')

  return (
    <li>
      <span>
        <a href={props.item.url}>
          {props.item.title}
        </a>
      </span>

      <p id="author">Author: {props.item.author}</p>
      <p id="comments">Comments: {props.item.num_comments}</p>
      <p id="points">Points: {props.item.points}</p>
    </li>
  )
}

const Form = () => {

  const handleSubmit = (e) => {
    
    e.preventDefault();

    console.log('Form has been successfully submitted')
  }

  return (

    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input type="text" id="username" />
        <br />
        <label htmlFor="password">Enter password</label>
        <input type="text" id="password" />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

const CheckBox = (props) => {

  return (
    <>
      <div>
        <label htmlFor="checkbox">
          Check:
          {/*                                                                           false */}
          <input onChange={props.onCheck} type="checkbox" id="checkbox" value={props.check}  />
        </label>
      </div>
    </>
  )
}
    
  

// -> This is a controlled component
const Search = (props) =>  {

  //console.log('Search component renders!')


  // props.onTest('Hello from Search component')

  

  return (
    <>
    <div>
      <label htmlFor="search">Search: </label>
      {/* -> this input field is a controlled component */}
      <input onChange={props.onSearch} type="text" id='search' value={props.search}/>
      {/* <button type='submit'>Submit</button> */}
    </div>
    </>
    )
}


export default App


/*
    -> Rule of thumb:
        -> If a variable does not need anything fromwithin the function component body:
              ex: parameters, then define it outside of the component which avoids
              re-defining it on every function call

  */