import React from 'react'

import UserdataTable from '../../../components/UserdataTable'

const sampleData = [
  {
    id: 102,
    name: 'Femenino',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 103,
    name: 'Femenino',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 105,
    name: 'Femenino',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 106,
    name: 'Femenino',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 108,
    name: 'Femenino',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 101,
    name: 'Glutes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 12,
    name: 'Glutes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 11,
    name: 'Glutes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 15,
    name: 'Glutes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  }
]

const theadData = [
  {
    id: 'Id',
    title: 'Title',
    status: 'Status',
    date: 'Date',
    updatedate: 'Update Date',
    action: 'Action'
  }
]

export default function Page() {
  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl '>Body Part List</h1>
        <button className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'>
          Add Body Part
        </button>
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
