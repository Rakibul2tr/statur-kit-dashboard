'use client'
import React, { useEffect, useState } from 'react'

import axios from 'axios'

import UserdataTable from '../../../components/UserdataTable'

import { baseUrl } from '../../../../utils/beseUrl'

const sampleData = [
  {
    id: 102,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 103,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 105,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 106,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 108,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 101,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 12,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 11,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  },
  {
    id: 15,
    name: 'Md Demo',
    phone: '124587394',
    email: 'demo@gmail.com',
    age: '125',
    status: 'active',
    dete: '12/5/2024'
  }
]

const theadData = [
  {
    id: 'Id',
    Name: 'Name',
    PhoneNumber: 'Phone Number',
    email: 'Email',
    age: 'Age',
    status: 'Status',
    date: 'Date',
    action: 'Action'
  }
]

export default function Page() {
  const [userData, setuserData] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/api/users/`).then(response => {
      // setuserData(response.data)
      console.log(response.data)
    })
  }, [])

  // console.log('user', userData)

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-500 text-2xl '>User List</h1>
        <button className='p-3 rounded-lg bg-yellow-300 text-white hover:bg-yellow-500 cursor-pointer'>Add User</button>
      </div>
      {/* search box */}
      <div className='main-header py-5 bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 px-3 rounded-t-md'>
        <div className='flex- flex-row items-center'>
          <span className='text-md'>Show</span>
          <select name='' id='' className='p-2 w-16 rounded-sm mx-3 focus:outline-none bg-white'>
            <option value='10'>10</option>
            <option value='30'>30</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
          <span className='text-md'>Entries</span>
        </div>
        <div className='search w-52'>
          <input
            type='search'
            name=''
            id=''
            placeholder='search'
            className='p-3 w-full rounded-md focus:outline-none bg-white'
          />
        </div>
      </div>
      <div className='overflow-hidden'>
        <UserdataTable data={sampleData} theadData={theadData} />
      </div>
    </div>
  )
}
