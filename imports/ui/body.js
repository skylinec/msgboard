import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
    tasks() {
        // Show newest messages at the top
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
});

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        //Get value from the form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        if (text == '' | text.length < 5) {
            return false
        } else {
            Tasks.insert({
                text,
                createdAt: new Date(),
            });
        }

        // Clear form
        target.text.value = '';
    }
})