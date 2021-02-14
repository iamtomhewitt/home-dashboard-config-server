import React from 'react'
import BBCNews from './BBCNews'

const Widgets = ({ widgets}) => {
  return (
    <>
      <h3>Widgets</h3>
      {widgets.map(w => {
        const { key, data } = w;
        switch (key) {
          case 'bbcNews':
            return <BBCNews key={key} data={data} />
        }
      })}
    </>
  )
}

export default Widgets;