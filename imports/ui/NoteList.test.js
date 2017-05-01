/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

const notes = [{
  _id: 'noteId123',
  title: 'Test Title',
  body: '',
  userId: 'testUserId1'
}, {
  _id: 'noteId456',
  title: 'Test Title2',
  body: '',
  userId: 'testUserId2'
}
];
if (Meteor.isClient) {
  describe('NoteList', function() {
    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });

}
