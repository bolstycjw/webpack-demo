import React from 'react'
import uuid from 'uuid'
import Notes from './Notes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React',
        },
        {
          id: uuid.v4(),
          task: 'Do laundry',
        },
      ],
    }
  }

  addNote = () => {
    this.setState({
      notes: [...this.state.notes, {
        id: uuid.v4(),
        task: 'New task',
      }],
    })
  }

  deleteNote = (id, e) => {
    e.stopPropagation()
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id),
    })
  }

  activateNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note =>
        return {...note, editing: note.id === id}
      ),
    })
  }

  render() {
    const { notes } = this.state
    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes notes={notes} onDelete={this.deleteNote} />
      </div>
    )
  }
}

export default App
