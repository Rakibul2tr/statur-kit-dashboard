'use client'
import { useEffect, useState } from 'react'

import LiveScoreCard from '../../components/liveScoreCard'

import ListsComponent from '../../components/ListsComponent'

export default function Page() {
  const [userData, setUserData] = useState()

  console.log('user', userData)

  useEffect(() => {
    const localData = async () => {
      const data = localStorage.getItem('user')
      const user = JSON.parse(data)

      if (user) {
        setUserData(user)
      } else {
        return
      }
    }

    localData()
  }, [])

  return (
    <>
      <div className='flex flex-wrap '>
        <LiveScoreCard icon={'tabler-barbell text-white'} title={'Equipment'} count={15} />
        <LiveScoreCard icon={'tabler-woman text-white'} title={'Exercise'} count={10} />
        <LiveScoreCard icon={'tabler-stretching text-white'} title={'Workout'} count={15} />
        <LiveScoreCard icon={'tabler-grill-off text-white'} title={'Diet Type'} count={20} />
        <LiveScoreCard icon={'tabler-play-handball text-white'} title={'Body part'} count={25} />
      </div>
      {/* list wraper section */}
      <div className='flex flex-wrap pt-10'>
        <ListsComponent title='Exercise List' />
        <ListsComponent title='Workout List' />
        <ListsComponent title='Diet List' />
        <ListsComponent title='Blog List' />
      </div>
    </>
  )
}
