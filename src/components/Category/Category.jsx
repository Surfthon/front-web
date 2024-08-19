import React from 'react'
import './Category.scss'

export default function Category({CategoryName}) {
  return (
    <div className='category'>{`# ${CategoryName}`}</div>
  )
}

