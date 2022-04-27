import React from 'react'

export default function status({statusNumber ,from, to}) {
  
    return (
      <div className="alert">
        { 
          (statusNumber === 0)
            ? "Enter to and from both"
            : (statusNumber === 1)
              ? `${from} -> ${to}`
              : null
        }
      </div>
    )
}
