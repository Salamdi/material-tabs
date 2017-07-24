import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import {
  MdAutocompleteModule,
  MdCheckboxModule,
  MdInputModule,
  MdSelectModule,
  MdToolbarModule,
  MdCardModule,
  MdTabsModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdIconModule,
  MdProgressSpinnerModule,
  MdDialogModule,
  MdTooltipModule,
  MdSnackBarModule,
  MdListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { SnackbarService } from './shared/snackbar.service';

import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content';
import { RequestStagesComponent } from './request-stages/request-stages.component';
import { StageNodeComponent } from './request-stages/stage-node/stage-node.component';

import '../styles/styles.scss';
import '../styles/headings.css';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,
    RequestStagesComponent,
    StageNodeComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 500}),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule,
    MdAutocompleteModule,
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdListModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    SnackbarService
  ]
})
export class AppModule { }
