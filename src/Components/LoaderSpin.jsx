import React from 'react'
import ReactLoading from 'react-loading';


const LoaderSpin = () => {
  return (
    <div>
         <ReactLoading type='spin'  color='blue' height={100} width={100}/>
    </div>
  )
}

export default LoaderSpin