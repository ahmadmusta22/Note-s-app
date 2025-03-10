import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex overflow-hidden w-full min-h-screen">
      <Sidebar />
      <div className="sm:ml-64 flex-1 w-full overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
