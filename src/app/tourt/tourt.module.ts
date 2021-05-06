import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TourtPage } from './tourt.page';

import { TourtPageRoutingModule } from './tourt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourtPageRoutingModule,
  ],
  declarations: [TourtPage]
})
export class TourtPageModule { }
