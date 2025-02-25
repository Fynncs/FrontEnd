import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatTooltipModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        FormsModule,
        MatFormFieldModule,
    ],
    exports: [
        RouterModule,
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatTooltipModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        FormsModule,
        MatFormFieldModule
    ]
})
export class ComumModule { }
