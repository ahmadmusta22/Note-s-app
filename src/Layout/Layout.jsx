import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Sidebar></Sidebar>
    <div className='sm:ml-64'>
     <Outlet></Outlet>
    </div>
    </>
  )
}
