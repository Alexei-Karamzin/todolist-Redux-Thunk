import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        todolistId: '1',
        changeTaskCheckbox: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask')
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
export const TaskIsNotDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: '1', isDone: true, title: 'is done task'}
};

TaskIsNotDoneStory.args = {
    task: {id: '1', isDone: false, title: 'is done task'}
};