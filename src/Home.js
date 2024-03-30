import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Update from './Update';
import swal from 'sweetalert';
// import state from 'sweetalert/typings/modules/state';

function Home() {

  const [info, setInfo] = useState([])
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [getDataForModal, setGetDataForModal] = useState()
  const [editModal, setEditModal] = useState(false)
  const [id, setId] = useState()
  const [searchVal, setSearchVal] = useState("")
  const [img, setImg] = useState('')

  // console.log(info, 'info123')


  const navigate = useNavigate()


  useEffect(() => {
    axios.get(`http://localhost:8500/profile`)
      .then((res) => {
        // console.log(res.data)
        setInfo(res.data.reverse())
      })
      .catch((res) => console.log(res.message))
  }, [editModal])

  //call delete function
  const deleteItem = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8500/profile/${id}`)
            .then((res) => {
              // console.log('deletedArray', res.data)
              const dataAfterDeleted = info.filter((dltItem) => dltItem.id !== id)
              setInfo(dataAfterDeleted)
              // console.log('dataAfterDeleted', dataAfterDeleted)
              //swal
              swal("Deleted successfully!", {
                icon: "success",
              });
            })
            .catch((res) => console.log('deletedArrayError', res.message))
        }
      })
      .catch(() => {
        swal("Error!", "Failed to delete!", "error");
      })
  }

  const showModal = (id) => {
    // setModal(true)
    axios.get(`http://localhost:8500/profile/${id}`)
      .then((res) => {
        console.log(res.data, 'modal_data')
        setGetDataForModal(res.data)
      })
      .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    // setSearchVal(e.target.value)
    // console.log(searchVal, '678')
    axios.get(`http://localhost:8500/profile`)
      .then((res) => {
        if (e.target.value === "") {
          setInfo([...res.data])
        } else {
          const result = res.data.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.surname.toLowerCase().includes(e.target.value.toLowerCase()))
          console.log(result, 'result')
          setInfo([...result])
        }
      })
      .catch(err => console.log(err))
  }
  const genderChange = (e) => {
    axios.get(`http://localhost:8500/profile`)
      .then((res) => {
        // console.log(res.data, '200res')
        if (e.target.value === 'male') {
          const genderRes = res.data.filter((item) => item.gender === 'male')
          setInfo(genderRes)
        } else if (e.target.value === 'female') {
          const genderRes = res.data.filter((item) => item.gender === 'female')
          setInfo(genderRes)
        } else if (e.target.value === 'not willing to say') {
          const genderRes = res.data.filter((item) => item.gender === 'not willing to say')
          setInfo(genderRes)
        } else {
          setInfo(res.data)
        }
      })
      .catch(err => console.log(err, 'Home_backend_err'))
  }

  const dropdownChange = (e) => {
    axios.get(`http://localhost:8500/profile`)
      .then((res) => {
        // console.log(res.data, 'drop_data')
        if (e.target.value === '0-25') {
          const ageRes = res.data.filter((item) => item.age >= 0 && item.age <= 25)
          setInfo(ageRes)
        } else if (e.target.value === '26-50') {
          const ageRes = res.data.filter((item) => item.age >= 26 && item.age <= 50)
          setInfo(ageRes)
        } else if (e.target.value === 'above 50') {
          const ageRes = res.data.filter((item) => item.age > 50)
          setInfo(ageRes)
        } else {
          setInfo(res.data)
        }
      })
  }

  const dropdownWithOrderOfAge = (e) => {
    axios.get(`http://localhost:8500/profile`)
      .then((res) => {
        // console.log(res.data, 'age_oreder_sec')
        if (e.target.value === 'ascending') {
          const ascendingRes = res.data.sort((a, b) => a.age - b.age)
          // console.log(ascendingRes, 'ascendingRes')
          setInfo(ascendingRes)
        } else if (e.target.value === 'descending') {
          const descendingRes = res.data.sort((a, b) => b.age - a.age)
          // console.log(descendingRes, 'descendingRes')
          setInfo(descendingRes)
        } else {
          setInfo(res.data)
        }

      })
      .catch((err) => console.log(err, 'home_backend_error'))
  }

  return (
    <>
      <div className="App">
        {/* search by name/surname...... */}
        <div style={{ marginTop: '2rem' }}>
          <label>Search by Name or Surname:</label>
          <span style={{ margin: '5px' }}></span>
          <input type='text' placeholder='search here...' onChange={(e) => handleChange(e)} /><br /><br />
          {/* search by gender........ */}
          <label>Filter by Gender:</label>
          <span style={{ margin: '5px' }}></span>
          {/* Male */}
          <label>Male</label>
          <span style={{ margin: '2px' }}></span>
          <input type='radio' name='gender' value='male' onChange={(e) => genderChange(e)} />
          <span style={{ margin: '5px' }}></span>
          {/* Female */}
          <label>Female</label>
          <span style={{ margin: '2px' }}></span>
          <input type='radio' name='gender' value='female' onChange={(e) => genderChange(e)} />
          <span style={{ margin: '5px' }}></span>
          {/* Not willing to say */}
          <label>Not Willing To Say</label>
          <span style={{ margin: '2px' }}></span>
          <input type='radio' name='gender' value='not willing to say' onChange={(e) => genderChange(e)} />
          <span style={{ margin: '5px' }}></span>
          {/* All */}
          <label>All</label>
          <span style={{ margin: '2px' }}></span>
          <input type='radio' name='gender' value='all' onChange={(e) => genderChange(e)} defaultChecked />
        </div><br />
        {/* search by age through drop-down...... */}
        <div>
          <label htmlFor='age'>Filter by age: </label>
          <span style={{ margin: '1px' }}></span>
          <select name='age' id='age' onChange={(e) => dropdownChange(e)}>
            <option value='default'>select age-range</option>
            <option value='0-25'>0 - 25</option>
            <option value='26-50'>26 - 50</option>
            <option value='above 50'>Above 50</option>
          </select>
        </div><br />
        {/* listing order with ascending/descending */}
        <div>
          <label>Listing Order:</label>
          <span style={{ margin: '1px' }}></span>
          <select name='age' id='age' onChange={(e) => dropdownWithOrderOfAge(e)}>
            <option value='default-order'>default order</option>
            <option value='ascending'>ascending</option>
            <option value='descending'>descending</option>
          </select>
        </div>
        {/* table..... */}
        <table border={1} bgcolor='lightblue' align='center' width='80%' style={{ marginTop: '5rem' }}>
          <thead>
            <tr>
              <th>Serial_No</th>
              <th>NAME</th>
              <th>SURNAME</th>
              <th>AGE</th>
              <th>EMAIL</th>
              <th>GENDER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {info &&
              info.map((elem, index) => {
                return (
                  <tr key={elem.id}>
                    <td>{index + 1}</td>
                    <td>{elem.name}</td>
                    <td>{elem.surname}</td>
                    <td>{elem.age}</td>
                    <td>{elem.email}</td>
                    <td>{elem.gender}</td>
                    <td>
                      <button className='btn btn-warning'>
                        <Link to={`/view/${elem.id}`} style={{ textDecoration: 'none' }}>View</Link>
                      </button>
                      <button style={{ marginLeft: '5px' }}
                        onClick={() => {
                          showModal(elem.id)
                          toggle()
                          setImg(elem.image)
                        }}
                        className='btn btn-secondary'>View In Modal</button>
                      <button style={{ marginLeft: '5px' }} onClick={() => {
                        setEditModal(!editModal)
                        setId(elem.id)
                      }} className='btn btn-primary'>
                        {/* <Link>Edit</Link> */}
                        Edit
                      </button>
                      <button style={{ marginLeft: '5px' }} onClick={() => { deleteItem(elem.id) }} className='btn btn-danger'>DELETE</button>
                    </td>
                  </tr>

                )
              })
            }
          </tbody>
        </table><br /><br />
        <button onClick={() => navigate("/add-user")} className='btn btn-success'>Add User</button>
      </div>
      <div>
        <div style={{ marginBottom: '20px' }}></div>
        {
          getDataForModal &&
          <Modal isOpen={modal} toggle={toggle} centered fade size='lg' backdrop>
            <ModalHeader toggle={toggle}>
              User Details
              {/* <span>
                <img src={getDataForModal.image} style={{ height: '20%', width: '40%' }} />
              </span> */}
            </ModalHeader>
            <ModalBody>
              <ul>
                <li>Name: {getDataForModal.name}</li>
                <li>Surname: {getDataForModal.surname}</li>
                <li>Age: {getDataForModal.age}</li>
                <li>Email: {getDataForModal.email}</li>
              </ul>
            </ModalBody>
          </Modal>}
        {
          editModal && <Update setEditModal={setEditModal} editModal={editModal} id={id} />
        }
      </div>
    </>
  );
}

export default Home