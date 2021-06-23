import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormatDatePipe, TypeAlertPipe } from './pipes/home.pipe';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    SidebarComponent,
    FormatDatePipe,
    TypeAlertPipe
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [SidebarComponent, FormatDatePipe, TypeAlertPipe],
})
export class SharedModule { }
