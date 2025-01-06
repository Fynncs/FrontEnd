import { Meta, StoryObj } from '@storybook/angular';
import { ChartComponentComponent } from './chart-component.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/ChartComponent',
  component: ChartComponentComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule], 
    }),
  ],
} as Meta<ChartComponentComponent>;

type Story = StoryObj<ChartComponentComponent>;

export const Default: Story = {
  args: {},
  name: 'Gráfico Padrão',
};
