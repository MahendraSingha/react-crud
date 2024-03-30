import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Update(props) {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        age: '',
        email: '',
        gender: ''
    })
    const toggle = () => props.setEditModal(!props.editModal)
    const [disabled, setDisabled] = useState(true)



    // const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8500/profile/${props.id}`)
            .then((res) => {
                // console.log(res.data, 'update_data')
                setValues(res.data)
            })
            .catch(err => console.log(err, 'Update_backend_err'))
    }, [])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleEdit = () => {
        setDisabled(false)
    }
    const handleUpdate = () => {
        axios.put(`http://localhost:8500/profile/${props.id}`, values)
            .then((res) => {
                // console.log(res.data, 'update_data')
                // window.location.reload()
                toggle()
            })
            .catch(err => console.log(err, 'upadate_backend_error'))
        // console.log(values, 'values')
    }


    return (
        <>
            {/* <div>Update {id}</div> */}
            <div>
                <Modal isOpen={props.editModal}
                    toggle={toggle}
                    centered fade size='lg' backdrop>
                    <ModalHeader
                        toggle={toggle}
                    >Edit Details</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor='name'>Name: </label>
                            <input id='name' type='text' name='name' value={values.name} onChange={(e) => handleChange(e)} disabled={disabled} /><br /><br />
                            <label htmlFor='surname'>Surname: </label>
                            <input id='surname' type='text' name='surname' value={values.surname} onChange={(e) => handleChange(e)} disabled={disabled} /><br /><br />
                            <label htmlFor='age'>Age: </label>
                            <input id='age' type='text' name='age' value={values.age} onChange={(e) => handleChange(e)} disabled={disabled} /><br /><br />
                            <label htmlFor='email'>Email: </label>
                            <input id='email' type='text' name='email' value={values.email} onChange={(e) => handleChange(e)} disabled={disabled} /><br /><br />
                            <input id='male' type='radio' name='gender' value='male' checked={values.gender === 'male'} onChange={(e) => handleChange(e)} disabled={disabled} />
                            <label htmlFor='male'>Male</label>
                            <input id='female' type='radio' name='gender' value='female' checked={values.gender === 'female'} onChange={(e) => handleChange(e)} disabled={disabled} />
                            <label htmlFor='female'>Female</label>
                            <input id='not willing to say' type='radio' name='gender' value='not willing to say' checked={values.gender === 'not willing to say'} onChange={(e) => handleChange(e)} disabled={disabled} />
                            <label htmlFor='not willing to say'>Not willing to say</label>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {
                            disabled ?
                                <button onClick={() => handleEdit()} className='btn btn-success'>Edit</button>
                                : <button onClick={() => handleUpdate()} className='btn btn-primary'>Update</button>
                        }
                        <button onClick={() => { toggle() }} className='btn btn-danger'>Close</button>
                    </ModalFooter>
                </Modal>
            </div>
        </>

    )
}

export default Update