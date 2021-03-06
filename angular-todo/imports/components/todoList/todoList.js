import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';

import template from './todoList.html';

class TodoListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.hideCompleted = false;

        this.helpers({
            tasks() {
                const selector = {};

                // if hide completed is checked, filter tasks
                if (this.getReactively('hideCompleted')) {
                    selector.checked = { $ne: true };
                }

                return Tasks.find(selector, {
                    sort: {
                        createdAt: -1
                    }
                });
            },
            incompleteCount(){
                return Tasks.find({
                    checked: {$ne:true}
                }).count();
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

    setChecked(task) {
        // Set the checked property to the opposite of its current value
        Tasks.update(task._id, {
            $set: {
                checked: !task.checked
            },
        });
    }

    removeTask(task) {
        Tasks.remove(task._id);
    }
}

export default angular.module('todoList', [
    angularMeteor
]).component('todoList', {
    templateUrl: 'imports/components/todoList/todoList.html',
    controller: ['$scope', TodoListCtrl]
});

