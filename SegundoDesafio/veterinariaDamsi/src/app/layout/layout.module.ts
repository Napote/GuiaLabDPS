import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { OnlyHeaderComponent } from './components/only-header/only-header.component';


@NgModule({
  declarations: [MainLayoutComponent, OnlyHeaderComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
