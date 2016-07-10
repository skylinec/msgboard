import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
    tasks() {
        var taskArray = new Array();
        var collection;
        collection = Tasks.find({});
        collection.forEach(function(data){
            var obj = {text: data.text, createdAt: data.createdAt};
            taskArray.push(obj);
        });

        taskArray.sort(function(a, b){return b.createdAt - a.createdAt;});
        return taskArray;
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
        Tasks.insert({
            text,
            createdAt: new Date(),
        });

        // Clear form
        target.text.value = '';
    }
})