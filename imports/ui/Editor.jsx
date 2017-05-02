import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Notes } from './../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleDeleteNote(e) {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input
            value={this.state.title}
            placeholder="Title"
            onChange={this.handleTitleChange}
          />
          <textarea
            value={this.state.body}
            placeholder="Note text here"
            onChange={this.handleBodyChange}
          />
          <button onClick={this.handleDeleteNote}>Delete Note</button>
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
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
