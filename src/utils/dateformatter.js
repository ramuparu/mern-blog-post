import React from 'react'
import Moment from 'react-moment'
function Dateformatter({date}) {
  return (
    <Moment format='D MMM YYYY' withTitle>
       {date}
    </Moment>
  )
}

export default Dateformatter