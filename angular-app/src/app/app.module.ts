import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { KeycloakSecurityService } from './services/keycloak-security.service';
import { SuppliersComponent } from './suppliers/suppliers.component';

export function kcFactory(keycloak: KeycloakSecurityService) {
  return () => keycloak.init();
}

@NgModule({
  declarations: [AppComponent, ProductsComponent, SuppliersComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakSecurityService],
      useFactory: kcFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
