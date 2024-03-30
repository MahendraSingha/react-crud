import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'


function AddUser() {

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    name: "",
    age: "",
    surname: "",
    email: "",
    image: '',
    gender: "not willing to say"
  })
  // const [selected, setSelected] = useState('not willing to say')
  // const [image, setImage] = useState(null)


  function handleChange(e) {
    // if (e.target.type === 'file') {
    //   // setState({ ...state, [e.target.name]: URL.createObjectURL(e.target.files[0]) })
    // } else {
    //   let value = e.target.value;
    //   // setSelected(value)
    //   setState({
    //     ...state,
    //     [e.target.name]: value
    //   })

    let value = e.target.value;
    // setSelected(value)
    setState({
      ...state,
      [e.target.name]: value
    })


    // console.log(state, 'state')
    // console.log(selected, 'selected')
    // console.log(e.target.files, 'img_file_1')
    // console.log(URL.createObjectURL(e.target.files[0]), 'img_file_2')
    // setImage(URL.createObjectURL(e.target.files[0]))

  }

  // console.log(state)
  function postData(event) {
    console.log(state, 'state123')
    event.preventDefault()
    axios.post(`http://localhost:8500/profile`, state)
      .then((res) => {
        // console.log(res.data, 'add_user')
        swal("Good job!", "Added data successfully!", "success");
        navigate("/")
      })
      .catch((error) => console.log(error, 'add_user_backendError'))
  }

  function format(e) {
    if (e.target.value < 0) {
      e.target.value = Math.abs(e.target.value)
    } else if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2)
    }
  }

  return (
    <div style={{ margin: '10rem' }}>
      <form onSubmit={postData} autoComplete="off"  >
        <label style={{ width: '64px' }}>Name:</label>
        <span style={{ margin: '5px' }}></span>
        <input type="text" id="name" name="name" onChange={(e) => handleChange(e)} required /><br /><br />
        <label style={{ width: '64px' }}>Age:</label>
        <span style={{ margin: '5px' }}></span>
        <input type="number" step='1' onInput={(e) => format(e)} id="age" name="age" onChange={(e) => handleChange(e)} onWheel={(e) => e.target.blur()} required /><br /><br />
        <label style={{ width: '64px' }}>Surname:</label>
        <span style={{ margin: '5px' }}></span>
        <input type="text" id="surname" name="surname" onChange={(e) => handleChange(e)} required /><br /><br />
        <label style={{ width: '64px' }}>Email:</label>
        <span style={{ margin: '5px' }}></span>
        <input type="email" id="email" name="email" onChange={(e) => handleChange(e)} required /><br /><br />
        {/* <div>
          <label style={{ width: '64px' }}>Image:</label>
          <span style={{ margin: '5px' }}></span>
          <input type="file" id="image" name="image" onChange={(e) => handleChange(e)} required /><br />
          <img src={state.image} style={{ width: '10%', height: '10%', marginLeft: '85px' }} />
        </div> */}
        <br /><br />
        <label>Male </label>
        <input type="radio" id="male" name="gender" value='male' onChange={(e) => handleChange(e)} />
        <span style={{ margin: '20px' }}></span>
        <label>Female </label>
        <input type="radio" id="female" name="gender" value='female' onChange={(e) => handleChange(e)} />
        <span style={{ margin: '20px' }}></span>
        <label>Not willing to say</label>
        <input defaultChecked type="radio" id="not willing to say" name="gender" value='not willing to say' onChange={(e) => handleChange(e)} /><br /><br />
        <button type='submit' className='btn btn-success' style={{ marginLeft: '62px' }}>Submit</button>
        <span style={{ margin: '5px' }}></span>
        <button className='btn btn-dark' onClick={() => navigate("/")}>Go Back</button>
      </form>
    </div>
  )
}

export default AddUser