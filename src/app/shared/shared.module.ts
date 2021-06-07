import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormatDatePipe } from './pipes/home.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SidebarComponent,
    FormatDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [SidebarComponent, FormatDatePipe],
})
export class SharedModule { }
