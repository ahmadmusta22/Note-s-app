import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from 'yup';




export default function Register() {
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setsuccessMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  async function handleRegister(values) {
    setIsLoading(true)
    setsuccessMsg("")
    setErrorMsg("")

    try {
      let { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
      if (data.msg == "done") {
        setsuccessMsg('Account created successfully')
        console.log(data);
        setIsLoading(false)
        navigate('/')
      }




    } catch (error) {
      setIsLoading(false)
      console.log(error);
      setErrorMsg(error.response.data.msg)

    }


  }

  let validationSchema = Yup.object({
    name: Yup.string().min(2, 'min length is 2').max(10, 'max length is 10').required('name is required'),
    email: Yup.string().email().required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'failed').required('password is required'),
    age: Yup.number().min(18, 'age must be higher than 10').max(100, 'age must be less than 100').required('password is required'),
    phone: Yup.string().matches(/^01[0-25][0-9]{8}$/).required('phone is required')
  })


  const regFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleRegister
  })


  return (
    <>
      <form onSubmit={regFormik.handleSubmit} class=" login max-w-md mx-auto  mt-36">
        <div class="relative z-0 w-full mb-5 group">
          <input
            onBlur={regFormik.handleBlur}
            onChange={regFormik.handleChange}
            type="email"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {regFormik.errors.email && regFormik.touched.email ? <div class="p-2 my-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

          {regFormik.errors.email}        </div> : ""}
        <div class="relative z-0 w-full mb-5 group">
          <input
            onBlur={regFormik.handleBlur}
            onChange={regFormik.handleChange}
            type="text"
            name="name"
            id="name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_first_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        {regFormik.errors.name && regFormik.touched.name ? <div class="p-2 my-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

          {regFormik.errors.name}        </div> : ""}
        <div class="relative z-0 w-full mb-5 group">
          <input
            onBlur={regFormik.handleBlur}
            onChange={regFormik.handleChange}
            type="number"
            name="age"
            id="age"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_first_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Age
          </label>
        </div>
        {regFormik.errors.age && regFormik.touched.age ? <div class="p-2 my-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

          {regFormik.errors.age}        </div> : ""}
        <div class="relative z-0 w-full mb-5 group">
          <input
            onBlur={regFormik.handleBlur}
            onChange={regFormik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_first_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        {regFormik.errors.phone && regFormik.touched.phone ? <div class="p-2 my-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

          {regFormik.errors.phone}        </div> : ""}
        <div class="relative z-0 w-full mb-5 group">
          <input
            onBlur={regFormik.handleBlur}
            onChange={regFormik.handleChange}
            type="password"
            name="password"
            id="password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {regFormik.errors.password && regFormik.touched.password ? <div class="p-2 my-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

          {regFormik.errors.password}        </div> : ""}


       <div className="flex justify-between">
       <button
          type="submit"
          class= " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Register"}
        </button>

        <p>  have an account? <Link className="underline" to={'/'}>Login</Link></p> 
       </div>

        {errorMsg ? <div class="p-2 my-5  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errorMsg}</div> : null}
        {successMsg ? <div class="p-2 my-5 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">{successMsg}</div> : null}
      </form>
    </>
  );
}
