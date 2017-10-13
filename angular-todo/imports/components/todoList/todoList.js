import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';

import template from './todoList.html';

class TodoListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.helpers({
            tasks() {
                return Tasks.find({}, {
                    sort: {
                        createdAt: -1
                    }
                });
            }
        })
    }

    addTask(newTask) {
        // insert a task into the 
        Tasks.insert({
            text: newTask,
            createdAt: new Date
        });

        this.newTask = '';
    }
}

export default angular.module('todoList', [
    angularMeteor
]).component('todoList', {
    templateUrl: 'imports/components/todoList/todoList.html',
    controller: ['$scope', TodoListCtrl]
});

