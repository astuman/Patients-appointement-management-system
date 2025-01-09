import React from 'react'
import api from '../components/api/api'
import axios from 'axios'

export const Verify = () => {
    try{
    const submitting = ()=>{
        e.preventDefault();
        const response = api.post('/verify', JSON.stringify({ email, token, }))
                .then((res) => response.json())
                .then((data) => console.log(data,))
    }
}catch{err =>{
    console.log(err)
}}
  return (
    <div>
        <input type='text' placeholder='Email' onChange={(e => e.target.value)} />
        <input type='text' placeholder='code' onChange={(e => e.target.value)} />
        <button onClick={submitting}></button>
    </div>
  )
}
export default Verify;
