import React from 'react'
import BBCNews from './BBCNews'

const Widgets = ({ widgets }) => {
  return (
    <>
      <h3>Widgets</h3>
      {widgets.map(w => {

        if (w.key === 'bbcNews') {
          return <BBCNews data={w.data} />
        }

        return <p>{w.key}</p>
      })}
    </>
  )
}

export default Widgets;