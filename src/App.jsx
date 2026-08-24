import './App.css'
import { useState,useEffect } from 'react'
// import { useEffect } from 'react'
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

  const useStorageState = (key,initialState) => {
    // key -> 'search' initialState -> 'React'
    
    const [value, setValue] = useState(localStorage.getItem(key) || initialState); // 'React' 

    useEffect(() => {
      localStorage.setItem(key,value); // { search: 'React'}
    },[value,key])

    return [value, setValue]
  }

const [searchTerm, setSearchTerm] = useStorageState('search', 'React'); // searchTerm -> 'React'
// const [applyTerm, setApplyTerm] = useStorageState('other-search','Angular'); // 'Angular'

// const [applyTerm, setApplyTerm] = useStorageState('Angular'); // applyTerm -> 'React'
// const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search') ?? 'React');
const [checked, setChecked] = useState(false)
const [_id,setId] = useState(1)
const [showData, setShowData] = useState(false)

//! Form Handler
const handleSubmit = (e) => {

  e.preventDefault();
  
  if (_id !== '' && _id > 0 && _id <= 10) {
    
    setShowData(true)
    console.log('Data component can be shown.')

  }


}

//! Input change handler
const handleChange = (e) => {

console.log('Input value is:', e.target.value)

setId(e.target.value)
setShowData(false)
}


const handleCheck = () => {

  setChecked(state => !!state)
}
  
// -> this way we can notify the App component, when a user types into the input field in the Search component.
  const handleSearch = (event) => {

    // console.log('input field value is:', event.target.value)
    setSearchTerm(event.target.value)

    // localStorage.setItem('search',event.target.value);
 
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
        <Form submit={handleSubmit} change={handleChange} id={_id} />
        <hr />
        {
          showData && (
            <DataDisplayer id={_id} />
          )
        }
        
      </div>
    </>
    )
  }

  const DataDisplayer = ({ id }) => {

    const [data,setData] = useState(null);

    useEffect(() => {

      const fetchData = async() => {

        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        const newData = await response.json();
        setData(newData)
      }

      fetchData()

    },[id])

    if (data) {
      return <div>Data is {data.name}</div>;
    } else{
      return null;
    }

    

  }

const List = ({ list }) => 
    /* -> this chi ld component receives parameter props
         as object in its function signature which includes
         all the passed attributes as properties

        -> props - immutable data structure
  */

        // console.log('List component renders')
    (
     <ul>
       {
          list.map(({objectID, ...items}) =>
         (
           <Item
              key={objectID}
              {...items}
            />
           // Item is leaf component, a component which does not render any components
         )
         )
       }
     </ul>
    )
  /*
    {
     title: 'React',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  }
  */


const Item = ({ url,title,author,num_comments,points }) => 
/*
  {
     title: 'React',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  }
*/
 (
    <li>
      <span>
        <a href={url}>
          {title}
        </a>
      </span>

      <p id="author">Author: {author}</p>
      <p id="comments">Comments: {num_comments}</p>
      <p id="points">Points: {points}</p>
    </li>
  )


const Form = ({ submit,change,id }) => {

  

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="_id">
          Enter ID:
          <input onChange={change} type="text" name='_id' id='_id' value={id}/>
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

const CheckBox = ({ onCheck, check }) => 
 (
    <>
      <div>
        <label htmlFor="checkbox">
          Check:
          {/*                                                                           false */}
          <input onChange={onCheck} type="checkbox" id="checkbox" value={check}  />
        </label>
      </div>
    </>
  )

    
  

// -> This is a controlled component
// -> We destructure the   props object in the component's function signature
const Search = ({ search,onSearch }) => (
    <>
    <div>
      <label htmlFor="search">Search: </label>
      {/* -> this input field is a controlled component */}
      <input onChange={onSearch} type="text" id='search' value={search}/>
      {/* <button type='submit'>Submit</button> */}
    </div>
    </>
    )



export default App


/*
    -> Rule of thumb:
        -> If a variable does not need anything fromwithin the function component body:
              ex: parameters, then define it outside of the component which avoids
              re-defining it on every function call

  */