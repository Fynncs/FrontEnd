import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ExpenseCardComponent } from './expense-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

export default {
    title: 'Components/ExpenseCardComponent',
    component: ExpenseCardComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, MatIconModule, MatMenuModule],
        }),
    ],
} as Meta<ExpenseCardComponent>;

type Story = StoryObj<ExpenseCardComponent>;

export const Default: Story = {
    args: {},
    name: 'Expense Card',
    render: (args) => ({
        component: ExpenseCardComponent,
        props: args,
    })
};
