import { useState, useEffect } from 'react'
import axios from 'axios'

const useDatabase = () => {
  // our first get method that uses our backend api to
  // fetch data from our data base
  const getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData').then((data) => data.json())
  }

  // our put method that uses our backend api
  // to create new query into our data base
  const putDataToDB = (data) => {
    console.log(data)
    axios.post('http://localhost:3001/api/putData', data)
  }

  // our delete method that uses our backend api
  // to remove existing database information
  const deleteFromDB = (idTodelete) => {
    parseInt(idTodelete)
    let objIdToDelete = null
    // state.data.forEach((dat) => {
    //   if (dat.id == idTodelete) {
    //     objIdToDelete = dat._id
    //   }
    // })

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
    // state.data.forEach((dat) => {
    //   if (dat.id == idToUpdate) {
    //     objIdToUpdate = dat._id
    //   }
    // })

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    })
  }

  useEffect(() => {
    console.log('in db hook')
  }, [])

  const service = {
    getDataFromDb,
    putDataToDB,
    deleteFromDB,
    updateDB,
  }

  return service
}

export default useDatabase