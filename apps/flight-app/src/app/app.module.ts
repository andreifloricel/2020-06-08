import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FlightApiModule } from '@flight-workspace/flight-api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BasketComponent } from './basket/basket.component';
// import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { FlightCancellingModule } from './flight-booking/flight-cancelling/flight-cancelling.module';
import { HomeComponent } from './home/home.component';
import { FlightLookaheadComponent } from './lookahead/flight-lookahead.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,

    // FlightBookingModule, // importing lazy modules prevents lazy loading!!!

    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlightCancellingModule,

    FlightApiModule.forRoot(),
    SharedModule.forRoot(),

    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
    }),

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OAuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent,
    FlightLookaheadComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
