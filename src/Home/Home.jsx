import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Notes from '../Notes/Notes';
import Swal from 'sweetalert2'

export default function Home() {

  const [errorMsg, setErrorMsg] = useState("")
  const [notes, setNotes] = useState([])
  const [modal, setModal] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  async function addNote(initialValues) {
    setErrorMsg('')
    setIsLoading(true)
    try {

      let { data } = await axios.post("https://note-sigma-black.vercel.app/api/v1/notes", initialValues, {
        headers: { token: "3b8ny__" + localStorage.getItem('userToken') }
      }
      )

      if (data.msg == 'done') {
        console.log(data);
        addNoteFormik.resetForm()
        getNotes()
        setModal(false)
        setIsLoading(false)
      }



    } catch (error) {
      setErrorMsg(error.response.data.msg)
      console.log(error);
      setIsLoading(false)

    }
  }


  async function getNotes() {
    try {

      let { data } = await axios.get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: { token: "3b8ny__" + localStorage.getItem('userToken') }
      }
      )

      if (data.msg == 'done') {

        setNotes(data.notes)
        console.log(data.notes);


      }



    } catch (error) {

      console.log(error);

    }
  }



  function deleteUserNote(notId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 px-6 py-2 text-white rounded-md ms-2",
        cancelButton: "bg-red-600 px-6 py-2 text-white rounded-md ms-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        delNotes(notId)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }



  async function delNotes(notId) {
    try {

      let { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${notId}`, {
        headers: { token: "3b8ny__" + localStorage.getItem('userToken') }
      }
      )
      console.log(data);
      getNotes()
      setNotes(data?.notes)






    } catch (error) {

      console.log(error);

    }
  }






  const addNoteFormik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },

    onSubmit: addNote
  })



  useEffect(() => {
    getNotes()
  }, [])

  return (
    <>
      <section>
        <button onClick={()=>setModal(true)} class="block my-5 ms-5   text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          Add new note
        </button>

        <div className="row">
          {notes?.map((note) => (
            <Notes noteId={note._id} noteTitle={note.title} noteContent={note.content} deleteNote={deleteUserNote} getNotes={getNotes}  ></Notes>
          ))}


        </div>

        <div class={`${modal ? "block" : "hidden"}  fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center `}>
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <form onSubmit={addNoteFormik.handleSubmit} class="flex flex-col gap-4 items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <input value={addNoteFormik.values.title} onChange={addNoteFormik.handleChange} onBlur={addNoteFormik.handleBlur} type="text" name="title" id="title" className='class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"' placeholder='Note Title' />
                <textarea value={addNoteFormik.values.content} onBlur={addNoteFormik.handleBlur} onChange={addNoteFormik.handleChange} name='content' id="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Notes's Content"></textarea>
                {errorMsg ? <p className='text-red-500'>{errorMsg}</p> : null}
                <button onClick={()=>setModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span  class="sr-only">Close modal</span>
                </button>
                <button type='submit' class="  px-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"> {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Add"}</button>
              </form>


            </div>
          </div>
        </div>
      </section>

    </>
  )
}
