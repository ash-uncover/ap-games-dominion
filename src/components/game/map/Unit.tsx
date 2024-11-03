import React from 'react'

import './Unit.css'

interface UnitProperties {
}

export const Unit = ({
}: UnitProperties) => {

  // #region Hooks //
  // #endregion

  // Rendering //
  return (
    <div className='ap-dom-unit'>
      <span>icon</span>
      <span>name</span>
    </div>
  )
  // #endregion
}
