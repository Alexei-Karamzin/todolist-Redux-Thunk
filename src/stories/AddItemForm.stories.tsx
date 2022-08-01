import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
import {AddItemForm} from "../component/AddItemForm/AddItemForm";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'AddItemForm Component',

} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

};

