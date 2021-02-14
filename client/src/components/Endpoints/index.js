import React from 'react'

const Endpoints = ({ endpoints }) => {
  return (
    <>
      <h3>Endpoints</h3>
      {endpoints.map(w => {
        return <p>{w.key}</p>
      })}
    </>
  )
}

export default Endpoints;