import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function LiveScoreCard({ icon, title, count }) {
  return (
    <>
      <Box sx={{ width: '23%', margin: 2 }}>
        <Card variant='outlined'>
          <CardContent className='flex flex-row'>
            <div className='w-2/6 flex items-center justify-center rounded-sm bg-slate-800'>
              <i className={icon} />
            </div>
            <div className=' text-center w-4/6'>
              <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
                {title}
              </Typography>
              <Typography sx={{ fontSize: 16 }} color='text.secondary' gutterBottom>
                {count}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
