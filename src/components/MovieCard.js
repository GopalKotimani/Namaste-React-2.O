import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

export const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48 pr-4'>
        <img 
        alt="Movies card" 
        src={IMG_CDN_URL+posterPath}
        />

    </div>
  )
}
