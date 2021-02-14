import React from 'react'

const Widgets = ({ widgets }) => {
  return (
    <>
      <h3>Widgets</h3>
      {widgets.map(w => {
        return <p>{w.key}</p>
      })}
    </>
  )
}

export default Widgets;