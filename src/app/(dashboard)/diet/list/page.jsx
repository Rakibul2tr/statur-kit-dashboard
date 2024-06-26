import React from 'react'

import UserdataTable from '../../../components/UserdataTable'

const sampleData = [
  {
    id: 120,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 150,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 20,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 2,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 108,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 105,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 11,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 16,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  },
  {
    id: 15,
    name: 'The raw food diet',
    catagory_diet: 'High Curb Diet',
    calories: 10,
    carbs: '0',
    protein: 5,
    fat: 15,
    servings: 20,
    time: 40,
    featured: 'yes',
    status: 'active',
    dete: '12/5/2024',
    updatedete: '10/6/2024'
  }
]

const theadData = [
  {
    id: 'No',
    title: 'title',
    diet_category: 'diet category',
    calories: 'calories',
    carbs: 'carbs',
    protein: 'protein',
    fat: 'fat',
    servings: 'servings',
    total_Time: 'total Time',
    featured: 'featured',
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
        <h1 className='text-slate-300 text-2xl '>Diet List</h1>
        <button className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'>Add Diet</button>
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
