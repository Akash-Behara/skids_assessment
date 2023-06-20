import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { addStudent, editStudent, removeStudent } from '../features/studentSlice';
import AddStudentForm from './AddStudentForm';

import { InboxIcon, UserPlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import EditStudentForm from './EditStudentForm';

const ListOfAllStudents = () => {
    const students = useSelector((state) => state.student.students);
    const dispatch = useDispatch();

    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showEditStudentModal, setShowEditStudentModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});

    const deleteStudent = (uuid) => {
      dispatch(removeStudent(uuid))
    }

    const editStudentForm = (student) => {
      setSelectedStudent(student);
      setShowEditStudentModal(true);
    }


  return (
    <div className="flex flex-col p-3 md:p-10 h-full">
      <div className="w-full flex justify-end -translate-x-4 sm:-translate-x-0">
        <div onClick={() => {setShowAddStudentModal(true)}} className="flex items-center gap-1 border border-gray-200 px-5 py-1 rounded-md shadow-sm font-medium hover:scale-[1.01] transition duration-75 cursor-pointer hover:shadow-md">
          <p>Add Student</p>
          <UserPlusIcon className="h-5 w-5"/>
        </div>
      </div>
      {students && students.length == 0 && (
        <div className="h-full w-full flex flex-col justify-center items-center"><InboxIcon className="h-12 w-12 text-gray-500"/> <span>No Records Found</span></div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 gap-y-0 h-full flex-wrap overflow-y-scroll rounded-md p-5 scrollbar-hide">
        {students && students.map((student, idx) => (
          <div key={idx} className="border border-gray-100 h-36 md:h-40 xl:h-52 shadow-md rounded-md p-3 hover:scale-[1.01] duration-75 transition">
            <p className="text-sm md:text-md xl:text-xl">Name: <span className="font-medium">{student.name}</span></p>
            <p className="text-sm md:text-md xl:text-xl mt-2">Email: <span className="font-medium">{student.email}</span></p>
            <p className="text-sm md:text-md xl:text-xl mt-2">Phone number: <span className="font-medium">{student.phone}</span></p>
            <div className="mt-2 md:mt-6 w-full flex justify-end gap-2 px-2">
              <TrashIcon onClick={() => {deleteStudent(student.uuid)}} className="h-5 w-5 md:h-6 md:w-6 text-red-500 cursor-pointer" />
              <PencilSquareIcon onClick={() => {editStudentForm(student)}} className="h-5 w-5 md:h-6 md:w-6 text-gray-500 cursor-pointer"/>
            </div>
          </div>
        ))}
       </div>
       {showAddStudentModal && (<AddStudentForm show={showAddStudentModal} close={() => {setShowAddStudentModal()}}/>)}
       {showEditStudentModal && (<EditStudentForm show={showEditStudentModal} close={() => {setShowEditStudentModal()}} studentInfo={selectedStudent}/>)}
    </div>
  )
}

export default ListOfAllStudents