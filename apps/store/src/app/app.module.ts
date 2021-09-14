import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreUiSharedModule } from "@bg-hoard/store/ui-shared";

import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    MatCardModule,
    StoreUiSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
