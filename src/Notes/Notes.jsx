import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import Loading from '../LoadingScreen/Loading';





export default function Notes({ noteTitle, noteContent, noteId, deleteNote, getNotes }) {
  const [errorMsg, setErrorMsg] = useState("")
  const [modal, setModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  


  async function updateNote(values) {
    setIsLoading(true)
    try {
      let { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, values, {
        headers: { token: "3b8ny__" + localStorage.getItem('userToken') }
      }
      )
      console.log(data);
      getNotes()
      setModal(false)
      setIsLoading(false)

    } catch (error) {
      console.log(error);
      setIsLoading(false)

    }

  }

function handleClose(){
  setModal(false)
  updateNoteFormik.resetForm()
}

  const updateNoteFormik = useFormik({
    initialValues: {
      title: noteTitle,
      content: noteContent
    },
    validationSchema: Yup.object().shape({
   title: Yup.string().required('Title is required'),
   content: Yup.string().required('Content is required')
    }),
    onSubmit: updateNote
  })



  
  return (
    <>

      <section >




        <div class={`${modal ? "block" : "hidden"}  fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-50 dark:bg-gray-800 `}>
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <form onSubmit={updateNoteFormik.handleSubmit} class="flex flex-col gap-4 items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <input value={updateNoteFormik.values.title} onChange={updateNoteFormik.handleChange} onBlur={updateNoteFormik.handleBlur} type="text" name="title" id="title" className='class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"' placeholder='Note Title' />
                {updateNoteFormik.errors.title && updateNoteFormik.touched.title ? <div class="p-2 my-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

{updateNoteFormik.errors.title}        </div> : ""}
                <textarea value={updateNoteFormik.values.content} onBlur={updateNoteFormik.handleBlur} onChange={updateNoteFormik.handleChange} name='content' id="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Notes's Content"></textarea>
                {updateNoteFormik.errors.content && updateNoteFormik.touched.content ? <div class="p-2 my-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

{updateNoteFormik.errors.content}        </div> : ""}
                {errorMsg ? <p className='text-red-500'>{errorMsg}</p> : null}
                <button onClick={handleClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <button type='submit' class="  px-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"> 
                  {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Update"}
                  </button>
              </form>


            </div>
          </div>

        </div>
      </section>
      <div className="w-1/2 p-4  ">
        <div className=" p-4 m-2 rounded-md shadow-sm capitalize bg-gray-50 dark:bg-gray-800 ">
          <h1 className='text-gray-600 font-bold text-2xl'>{noteTitle}</h1>
          <p className='my-5 text-gray-400 text-md '>{noteContent}</p>
          <div className='flex justify-end gap-2 '>

            <i onClick={() => setModal(true)} className='fa-solid fa-pen-to-square cursor-pointer '></i>

            <i onClick={() => deleteNote(noteId)} className='fa-solid fa-trash-can pe-2 cursor-pointer '></i>
          </div>
        </div>
      </div>
    </>
  )
}
