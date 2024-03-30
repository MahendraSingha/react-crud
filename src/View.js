import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

function View() {
  const [data, setData] = useState()

  const { id } = useParams()
  // console.log("data", data)
  // const location = useLocation()
  // console.log(location.pathname.charAt(location.pathname.length - 1))
  // console.log(location.pathname.split('').at(-1))

  useEffect(() => {
    axios.get(`http://localhost:8500/profile/${id}`)
      .then((res) => {
        // console.log("ddddd", res.data)
        setData(res.data)
      })
      .catch((err) => console.log(err, 'View_backend_error'))
  }, [])


  return (
    <div>
      {data &&
        <ul>
          <li><strong>Name: {data.name} </strong></li>
          <li><strong>Surname: {data.surname}</strong> </li>
          <li><strong>Age: {data.age}</strong> </li>
          <li><strong>Email: {data.email}</strong> </li>
        </ul>
      }
    </div>

  )
}

export default View