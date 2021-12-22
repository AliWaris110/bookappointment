import { parseISO } from 'date-fns'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select'

import { createNewService } from '../../redux-store/actions/auth'
import { getAllServiceTypes } from '../../redux-store/actions/auth'
const CreateService = () => {
  const checkBtn = useRef()
  const form = useRef()
  const [successful, setSuccessful] = useState(false)
  const [loadingBookingService, setLoadingBookingService] = useState(false)
  const [title, setTitle] = useState('')
  const [venue, setVenu] = useState('')
  const [location, setLocation] = useState('')
  const [typeId, setTypeId] = useState('')
  const [allTypes, setAllTypes] = useState([])
  const [checkState, setCheckState] = useState()
  const [serviceBorder,setServiceBorder]=useState(false)
  const dispatch = useDispatch()

  ////////form fileds handleChange Events//////


  const onChangeVenue = (e) => {
    let venue = e.target.value
    setVenu(venue)
  }
  const onChangeLocation = (e) => {
    let location = e.target.value
    setLocation(location)
  }
  const onChangeServiceType = (e) => {
    setServiceBorder(false)
    let serviceType = e.target.value
    setTitle(serviceType)
    const getIdByName=serviceType==='Select Service'?'':allTypes.find(i=>i.typeName===serviceType).id
    setTypeId(getIdByName)
  }

  const handleCreateService = (e) => {
    e.preventDefault()
    setLoadingBookingService(true)
    setSuccessful(false)
    if (typeId==='') {
      e.preventDefault();
      setLoadingBookingService(false)
      setServiceBorder(true)
    }
    else if(checkBtn.current.context._errors.length === 0){
      setServiceBorder(false);
      dispatch(createNewService(title,venue,location,typeId))
      .then((response)=>{
        console.log('createService1: ',response)
        alert('Service Created Successfully!')
        setCheckState(response)
        setSuccessful(true)
        window.location.pathname='/admin/createservice/';
        window.location.reload();
      })
      .catch((ErrorResponse)=>{
        console.log('error in catch: ',ErrorResponse)
        setLoadingBookingService(true);
        setSuccessful(false);
        if(ErrorResponse){
          alert('This service already exists')
          setLoadingBookingService(false)
          setServiceBorder(true);
          return;
        }
      })

    }
    else{
      setLoadingBookingService(false)
    }
  }

  useEffect(() => {
    dispatch(getAllServiceTypes())
      .then((response) => {
       setAllTypes([...response])
        
      })
      .catch((ErrorResponse) => {
        console.log(
          'Error in dispatching Service Types: ',
          ErrorResponse
        )
      })
  }, [])

 console.log("typeID: ",typeId)
  ////rendering all types////

  return (
    <>
      <div className="add-user-panel">
        <h1>Create New Service</h1>
        <Form ref={form} onSubmit={handleCreateService}>
          {!successful && (
            <>
              <div className="form-group">
                <label className="role__label">Select Service Type</label>
                <Select
                  onChange={(item,index)=>onChangeServiceType(item,index)}
                  className={`form-control ${serviceBorder? 'service-border':''}`}
                  name="servicetype"
                >
                  <option>Select Service</option>
                  {allTypes.map((item, index) => (
                    <option value={item.typeName} key={index}>
                     {item.typeName}
                    </option>
                  ))}

                  {/* <option>mod</option> */}
                </Select>
              </div>
              
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  id="venue"
                  name="venue"
                  aria-describedby="venueHelp"
                  placeholder="Enter Venue for Service"
                  required
                  onChange={onChangeVenue}
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  aria-describedby="locationHelp"
                  placeholder="Enter Location for Service"
                  required
                  onChange={onChangeLocation}
                />
              </div>
            
             
              <div  style={{width:'35%'}}className="add-user submit-button">
                <div className="add-user__icon">
                  <i className="bx bxs-add-to-queue"></i>
                </div>

                <div className="add-user__info">
                  <button
                    ref={checkBtn}
                    type="submit"
                    className="add-user-link"
                  >
                    {loadingBookingService && (
                      <span className="spinner-border spinner-border-sm verify-button"></span>
                    )}
                    <span>Create Service</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </>
  )
}

export default CreateService
