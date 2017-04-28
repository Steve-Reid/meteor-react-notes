import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
  const renderNoteListItems = () => {
    if (props.notes.length === 0) {
      return (
        <div>
          <p>Create your first note to get started!</p>
        </div>
      );
    }
    return props.notes.map((note) => {
      return <NoteListItem key={note._id} note={note} />;
    });
  };
  return (
    <div>
      <NoteListHeader />
      NoteList {props.notes.length}
      {renderNoteListItems()}
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired // deprecated
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
