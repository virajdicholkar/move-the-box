import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxContainerComponent } from './box-container/box-container.component';



@NgModule({
  declarations: [BoxContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [BoxContainerComponent],
})
export class MovableBoxModule { }
