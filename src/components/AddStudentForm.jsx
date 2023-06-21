import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addStudent } from '../features/studentSlice';

const AddStudentForm = ({ show, close }) => {
  const dispatch = useDispatch();
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneFormat = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    if(userName && email && phoneNumber){
      if(phoneNumber.match(phoneFormat)){
        if(email.match(mailFormat)){
          dispatch(addStudent({uuid: uuidv4(), name: userName, email: email, phone: phoneNumber}))
          setUsername('')
          setEmail('');
          setPhoneNumber(0);
          close();
          toast.dark('Created successfully');
        } else {
          toast.dark('Invaild Email');
        }
      } else {
        toast.dark('Invaild phone number');
      }
    } else {
      toast.dark('Fill all fields');
    }
  }

  return (
    <Modal 
      open={show}
      onCancel={() => {close(false)}} 
      footer={null}
      bodyStyle={{padding: "10px"}}
    >
      <h2 className="text-2xl font-medium">Add Student</h2>
      <form>
        <div className="mt-10 w-full">
          <label htmlFor="name" className="absolute -translate-y-3 bg-white translate-x-4 px-1">Name</label>
          <div className='input'>
            <input id="name" type="text" onChange={(e) => {setUsername(e.target.value)}} className="w-full ring-1 ring-gray-400 h-10 rounded-md shadow-sm focus:ring-gray-700 px-2" />
          </div>
        </div>

        <div className="mt-10">
          <label htmlFor="email" className="absolute -translate-y-3 bg-white translate-x-4 px-1">Email</label>
          <div className='input'>
            <input id="email" type="email" onChange={(e) => {setEmail(e.target.value)}} className="w-full ring-1 ring-gray-400 h-10 rounded-md shadow-sm focus:ring-gray-700 px-2" />
          </div>
        </div>

        <div className="mt-10">
          <label htmlFor="phone" className="absolute -translate-y-3 bg-white translate-x-4 px-1">Contact Number</label>
          <div className='input'>
            <input id="phone" type="tel" onChange={(e) => {setPhoneNumber(e.target.value)}} className="w-full ring-1 ring-gray-400 h-10 rounded-md shadow-sm focus:ring-gray-700 px-2" />
          </div>
        </div>
        
        <div className="mt-10 flex gap-4 justify-end">
          <button className="ring-1 ring-gray-400 rounded-md px-4 py-2 font-medium shadow-sm hover:ring-gray-500 hover:shadow-md hover:scale-[1.01] transition duration-75" onClick={() => {close()}}>Cancel</button>
          <button className="ring-1 ring-gray-400 rounded-md px-4 py-2 font-medium shadow-sm hover:ring-gray-500 hover:shadow-md hover:scale-[1.01] transition duration-75" onClick={(e) => {submitForm(e)}}>Submit</button>
        </div>
      </form>
      <ToastContainer />
    </Modal>
  )
}

export default AddStudentForm