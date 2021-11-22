import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';

declare var Keycloak: any;
@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc: KeycloakInstance;

  constructor(private http: HttpClient) {}

  public async init() {
    console.log('security intialisation');
    this.kc = new Keycloak({
      url: 'http://localhost:8080/auth',
      realm: 'my-ecom-realm',
      clientId: 'angular-suppliers-app'
    });

    await this.kc.init({
      onLoad: 'check-sso'
    });

    console.log(this.kc.token);
  }

  public getSuppliers() {
    return this.http.get('http://localhost:8083/suppliers');
  }

  /**
   * check is user has role MANAGER
   */
  public isManager():boolean {
    return this.kc.hasResourceRole("MANAGER");
  }

}
