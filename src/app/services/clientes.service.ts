import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Client, Case, ComplementaryData } from '../models/models';
import { environment } from '../../environments/environment'
import { HttpParams } from '@angular/common/http';
import { messagesApp } from '../message/messages';
import { deserialize } from "serializer.ts/Serializer";
import { httpOptionsSoporte, httpOptionsReplicacion } from '../global/global-variables';
import { ComplementaryDataFields } from '../models/complementary-data';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  objClientes: Client = new Client();
  env = environment;
  message = messagesApp;
  isCliente: boolean = false;
  isClase: boolean = false;
  isHistory: boolean = false;
  isClienteHidden: boolean = true;
  messageAlert: string;
  messageHiddenSuccess: boolean;
  messageHiddenDanger: boolean;
  objComplementaryDataArray: ComplementaryData[];
  objComplementaryDataField: ComplementaryDataFields = new ComplementaryDataFields();

 // private readonly clientId = window.location.search;

  constructor(private httpClient: HttpClient, ) {
  }

  getTokenSoporte(): Observable<string> {
    return this.httpClient.post<string>(this.env.tokenUrlSoporte, {}, httpOptionsSoporte);
  }

  get_client(clientId:string,  token: string): Observable<Client> {
    return this.httpClient.post<Client>(this.env.clientUrlSoporte + 'ClientByID', {}, {
      params: new HttpParams().set('Clientid', clientId.substring(1)),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  get_clientSearch(cliente: Client, token: string): Observable<Client> {
    return this.httpClient.get<Client>(this.env.clientUrlSoporte + 'ClientByDocument', {
      params: new HttpParams().set('documentType', cliente.documentType).set('document', cliente.principalDocument),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  post_cliente(body: any, token: string): Observable<Client>  {
    return this.httpClient.post<Client>(this.env.clientUrlSoporte + 'NewClient', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Guarda el caso
  post_CaseClient(body: any, token: string): Observable<Case> {
    return this.httpClient.post<Case>(this.env.caseUrlSoporte + 'SaveNewCase', body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }
}

//Devuelve el token
function getToken(token: string, responseToken: Object) {
  token = responseToken["request"];
  return token;
}
