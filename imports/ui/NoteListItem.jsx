import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
  const className = props.note.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5 className="item__title">{props.note.title || 'Untitled note'}</h5>
      <p className="item__subtitle">{moment(props.note.updatedAt).format('DD/M/YY')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  Session: React.PropTypes.object.isRequired,
  note: React.PropTypes.shape({
    _id: React.PropTypes.string,
    title: React.PropTypes.string,
    updatedAt: React.PropTypes.number,
    selected: React.PropTypes.bool
  }).isRequired
};

export default createContainer(() => {
  return { Session };
}, NoteListItem);
