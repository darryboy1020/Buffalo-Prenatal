import React, { useState, useEffect } from 'react'
import ContentLoader from './pages/ContentLoader'
import { HOME_YAML, SURVEY_YAML } from './pages/PageNames'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

const App = () => {
  const [state, setState] = useState({
    data: [],
    id: 0,
    message: 'test',
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  })

  useEffect(() => {
    getDataFromDb()
    if (!state.intervalIsSet) {
      let interval = setInterval(getDataFromDb, 1000)
      setState((prevState) => ({ ...prevState, intervalIsSet: interval }))
    }

    return () => {
      if (state.intervalIsSet) {
        clearInterval(state.intervalIsSet)
        setState((prevState) => ({ ...prevState, intervalIsSet: null }))
      }
    }
  }, [state])

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  // componentDidMount() = () => {
  //   this.getDataFromDb();
  //   if (!this.state.intervalIsSet) {
  //     let interval = setInterval(this.getDataFromDb, 1000);
  //     this.setState({ intervalIsSet: interval });
  //   }
  // }

  // // never let a process live forever
  // // always kill a process everytime we are done using it
  // componentWillUnmount() = () =>  {
  //   if (this.state.intervalIsSet) {
  //     clearInterval(this.state.intervalIsSet);
  //     this.setState({ intervalIsSet: null });
  //   }
  // }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  const getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) =>
        setState((prevState) => ({ ...prevState, data: res.data }))
      )
  }

  // our put method that uses our backend api
  // to create new query into our data base
  const putDataToDB = (message) => {
    let currentIds = state.data.map((data) => data.id)
    let idToBeAdded = 0
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    })
  }

  // our delete method that uses our backend api
  // to remove existing database information
  const deleteFromDB = (idTodelete) => {
    parseInt(idTodelete)
    let objIdToDelete = null
    state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id
      }
    })

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    })
  }

  // our update method that uses our backend api
  // to overwrite existing data base information
  const updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null
    parseInt(idToUpdate)
    state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id
      }
    })

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    })
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  const { data } = state

  const handleChange = (e, field) => {}
  return (
    <div>
      <ul>
        {data.length <= 0
          ? 'NO DB ENTRIES YET'
          : data.map((dat) => (
              <li style={{ padding: '10px' }} key={data.message}>
                <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                <span style={{ color: 'gray' }}> data: </span>
                {dat.message}
              </li>
            ))}
      </ul>
      <div style={{ padding: '10px' }}>
        <input
          type='text'
          onChange={
            (e) => {
              console.log(e.target.value)
              setState((prevState) => ({
                ...prevState,
                message: e.target.value,
              }))
            }
            // setState((prevState) => ({ ...prevState, message: e.target.value }))
          }
          placeholder='add something in the database'
          style={{ width: '200px' }}
        />
        <button onClick={() => putDataToDB(state.message)}>ADD</button>
      </div>
      <div style={{ padding: '10px' }}>
        <input
          type='text'
          style={{ width: '200px' }}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              idToDelete: e.target.value,
            }))
          }
          placeholder='put id of item to delete here'
        />
        <button onClick={() => deleteFromDB(state.idToDelete)}>DELETE</button>
      </div>
      <div style={{ padding: '10px' }}>
        <input
          type='text'
          style={{ width: '200px' }}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              idToUpdate: e.target.value,
            }))
          }
          placeholder='id of item to update here'
        />
        <input
          type='text'
          style={{ width: '200px' }}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              updateToApply: e.target.value,
            }))
          }
          placeholder='put new value of the item here'
        />
        <button onClick={() => updateDB(state.idToUpdate, state.updateToApply)}>
          UPDATE
        </button>
      </div>
    </div>
  )
}

export default App
