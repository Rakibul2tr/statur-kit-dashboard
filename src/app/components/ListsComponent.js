import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

const list = [
  { id: 0, title: 'Dipp', image: '' },
  { id: 1, title: 'yoyo', image: '' },
  { id: 2, title: 'Cack work', image: '' },
  { id: 3, title: 'Punch press flat', image: '' },
  { id: 4, title: 'Dipp', image: '' },
  { id: 5, title: 'russian Twist', image: '' },
  { id: 6, title: 'Bench press', image: '' },
  { id: 7, title: 'russian Twist', image: '' },
  { id: 8, title: 'Bench press', image: '' },
  { id: 9, title: 'yoyo', image: '' },
  { id: 10, title: 'Cack work', image: '' }
]

export default function ListsComponent({ title }) {
  return (
    <div style={{ width: '46%', margin: 14, marginTop: 50 }} className='bg-slate-900 mt-20'>
      <div className='main-header bg-slate-950 flex flex-row items-center justify-between shadow-md shadow-red-400 py-5 px-3 rounded-t-md'>
        <h1 className='text-slate-500 text-2xl '>{title ? title : 'Missing Title'}</h1>
        <Link href={''}>
          <span className='text-yellow-500'>See All</span>
        </Link>
      </div>
      <div className='semi-header bg-slate-900 p-3 flex flex-row items-center justify-start'>
        <h1 className='text-slate-500 text-lg w-1/3'>Image</h1>
        <h4 className='text-slate-500'>Title</h4>
      </div>
      <div className='items-wraper shadow-sm shadow-red-400 rounded-md'>
        {list.map((item, index) => {
          return (
            <div
              key={item.id}
              className='item p-2 flex flex-row items-center'
              style={{ backgroundColor: index % 2 == 0 ? '#141f38' : '#0F172A' }}
            >
              <div className='w-1/3'>
                <div className='w-10 h-10 items-center flex flex-col justify-center border border-[#EDECF1] text-center rounded-lg'>
                  {/* <Image src={}alt='image'/> */}
                  <i className='tabler-photo' />
                </div>
              </div>
              <h1 className='text-slate-500 text-lg '>{item?.title}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}
