import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { TokenInterceptor } from './interceptors/token.interceptor';
//you need to import the needed providers from the module and declare them in the new configuration function
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    }
  ]
  
  
};
