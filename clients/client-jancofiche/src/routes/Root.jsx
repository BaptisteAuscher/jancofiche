import { useState } from 'react'
import './Root.css'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

function Root() {

  return (
    <>
        <Header/>
        <Outlet />
    </>
  )
}

export default Root