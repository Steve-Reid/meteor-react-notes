/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader', function() {
    it('should call meteorCall with notes.insert', function() {
      const method = 'notes.insert';
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalledWith(method);
    });

  });

}
