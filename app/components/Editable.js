import React, { PropTypes } from 'react'

const Edit = ({ onEdit = () => {}, value, ...props }) => (
  <button onClick={onEdit} {...props}>
    <span>edit: {value}</span>
  </button>
)

const Editable = ({ editing, value, onEdit, ...props }) => {
  if (editing) {
    return <Edit value={value} onEdit={onEdit} {...props} />
  }

  return <span {...props}>value: {value}</span>
}

Edit.propTypes = {
  onEdit: PropTypes.func,
  value: PropTypes.string,
}

Editable.propTypes = {
  editing: PropTypes.bool,
  value: PropTypes.string,
  onEdit: PropTypes.func,
}

export default Editable
