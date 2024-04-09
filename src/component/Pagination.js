import React from 'react'

function Pagination(props) {
    
    const {setPageNumber,pageNumber} = props;
    let next = ()=>{
        console.log("hola")
       setPageNumber((x) => x+1);
    }

    let prev = ()=>{
        console.log("hola")
        setPageNumber((x) => x-1);
    }
  return (
    <div className='container'>
        <button onClick={prev} disabled={pageNumber===1}>Prev</button>
        <button onClick={next} disabled={pageNumber===42}>Next</button>
        
    </div>
  )
}

export default Pagination