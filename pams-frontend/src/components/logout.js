import React, {useEffect, useState}from 'react'
import api  from './api/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import RemoveCookie from './hooks/removeCookie'

export const Logout = () => {
    const [logout, setLogout] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
       localStorage.removeItem('PID')
       localStorage.removeItem('UID')
       localStorage.removeItem('role')
       localStorage.removeItem('drId')
       RemoveCookie("user")
       navigate('/')
       
    })
}

export default Logout;
