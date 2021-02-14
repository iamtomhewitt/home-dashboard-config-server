import React from 'react'

const Dialogs = ({ dialogs }) => {
  return (
    <>
      <h3>Dialogs</h3>
      {dialogs.map(w => {
        return <p>{w.key}</p>
      })}
    </>
  )
}

export default Dialogs;