import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { MatToolbarModule } from '@angular/material/toolbar';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';

import { HeaderComponent } from './header.component';

export default {
  title: 'HeaderComponent',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [MatToolbarModule],
    })
  ],
} as Meta<HeaderComponent>;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  component: HeaderComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    title:  'Primary Header Title',
    color: 'primary'
}

export const Accent = Template.bind({});
Accent.args = {
    title:  'Accent Header Title',
    color: 'accent'
}

export const Warn = Template.bind({});
Warn.args = {
    title:  'Warn Header Title',
    color: 'warn'
}

