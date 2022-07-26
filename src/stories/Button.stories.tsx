import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../components/Button/Button';

export default {
  title: 'nesto/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Button',
  ghost: false,
  disabled: false
};

export const Ghost = Template.bind({});
Ghost.args = {
  title: 'Button',
  ghost: true,
  disabled: false
};
