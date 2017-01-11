import React, { PropTypes } from 'react'

const Note = ({ children, ...props }) => (
  <div {...props}>
    {children}
  </div>)

Note.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Note
