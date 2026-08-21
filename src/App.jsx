import './App.css'
//! Component has to start with Capital letter

// const title = 'React'; // -> JavaScript string primitive
const list = [
  {
     title: 'JavaScript',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'React',
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

const App = () => (
// JSX - JavaScript XML - combines HTML and JavaScript
    <>
      <div>
        <h1>My Hacker Stories</h1>
      {/* Leaf component -> component which does not render any component */}
        <Search />
        <hr />
        {/* Here we instantiate List component */}
        <List /> 
        <List />
      </div>
    </>
  )


const List = () => 
    // We do not have any business logic here
   (
    <ul>
          {
            list.map((item) => 
              (
                    <Item item={item}/>
                // Item is leaf component, a component which does not render any components
              )
            )
          } 
        </ul>
  )


const Item = ({item}) => (

    <li key={item.objectID}>
      <span>
        <a href={item.url}>
          {item.title}
        </a>
      </span>

      <p id="author">Author: {item.author}</p>
      <p id="comments">Comments: {item.num_comments}</p>
      <p id="points">Points: {item.points}</p>
    </li>
  )


const Search = () =>  {

  const handleChange = (event) => {
    // Task
    //const value = event.target.value

    // console.log(value)

  }

  const onLeave = (event) => {

    console.log(event.target.value)

  }

  return (
    <>
    <div>
      <label htmlFor="search">Search: </label>
      <input onChange={(e) => handleChange(e)} onBlur={onLeave} type="text" id='search'/>
      <button type='submit'>Submit</button>
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