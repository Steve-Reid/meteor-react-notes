import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from './../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input
            value={this.props.note.title}
            placeholder="Title" onChange={this.handleTitleChange}
          />
          <textarea
            value={this.props.note.body}
            placeholder="Note text here"
            onChange={this.handleBodyChange}
          ></textarea>
          <button>Delete Note</button>
        </div>
      );
    }
    return (
      <p>
        {this.props.selectedNoteId ? 'Note not found' : 'Pick or Create a note to get started'}
      </p>
    );
  }
}

Editor.propTypes = {
  selectedNoteId: React.PropTypes.string,
  note: React.PropTypes.shape({
    _id: React.PropTypes.string,
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    userId: React.PropTypes.string,
    updatedAt: React.PropTypes.number
  }),
  call: React.PropTypes.func
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);
