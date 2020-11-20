import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { deserialize } from "serializer.ts/Serializer";
import { HttpParams } from '@angular/common/http';
import { City, Department, DocumentType, Idiom, Country, Moment, Activity, Reason, ReasonDetail, Motive, Source, ComplementaryData, ComplementaryDataFields } from '../models/models';
import { httpOptionsReplicacion } from '../global/global-variables';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  env = environment;
  objCountries: Country[];
  objDepartment: Department[];
  objCity: City[];
  objIdiom: Idiom[];
  objMotive: Motive[];

  constructor(private httpClient: HttpClient) { }

  //Consulta token replicación
  getTokenReplicacion(): Observable<string> {
    return this.httpClient.post<string>(this.env.tokenUrlListReplicacion, {}, httpOptionsReplicacion);
  }

  //Consulta tipo de documento
  get_DocumentType(token: string): Observable<DocumentType[]> {
    return this.httpClient.get<DocumentType[]>(this.env.listUrlReplicacion + 'DocumentTypes/GetDocumentTypes', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta los datos complementarios
  get_ComplementaryData(detailReasonId: string, motiveId: string, token: string): Observable<ComplementaryData[]> {
    return this.httpClient.get<ComplementaryData[]>(this.env.listUrlReplicacion + 'ComplementaryData/GetComplementaryData', {
      params: new HttpParams().set('detailResonId', detailReasonId).set('motiveId', motiveId),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta paises 
  get_Countries(token: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.env.listUrlReplicacion + 'Countries/GetCountries', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta ciudades por departamento
  get_CitiesById(event: any, token: string): Observable<City[]> {
    return this.httpClient.get<City[]>(this.env.listUrlReplicacion + 'Cities/GetCityByDepartmentID', {
      params: new HttpParams().set('departmentid', event.target.value),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta departamentos por paises
  get_DepartmentById(event: any, token: string): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.env.listUrlReplicacion + 'Departments/GetDepartmentByCountryId', {
      params: new HttpParams().set('countryid', event.target.value),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta de idiomas
  get_Idiom(token: string): Observable<Idiom[]> {
    return this.httpClient.get<Idiom[]>(this.env.listUrlReplicacion + 'Idioms/GetIdioms', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta de momentos
  get_Moments(token: string): Observable<Moment[]> {
    return this.httpClient.get<Moment[]>(this.env.listUrlReplicacion + 'Moments/GetMoments', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta de actividades
  get_ActivitiesByMomentId(event: any, token: string): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.env.listUrlReplicacion + 'Activities/GetActivitiesByMomentId', {
      params: new HttpParams().set('momentId', event.target.value),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta razón por actividad
  get_ReasonByActivityId(event: any, token: string): Observable<Reason[]> {
    return this.httpClient.get<Reason[]>(this.env.listUrlReplicacion + 'Reasons/GetReasonByActivityId', {
      params: new HttpParams().set('activityId', event.target.value),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta detalle razón por razón
  get_ReasonDetailByReasonId(event: any, token: string): Observable<ReasonDetail[]> {
    return this.httpClient.get<ReasonDetail[]>(this.env.listUrlReplicacion + 'ReasonsDetail/GetReasonDetailByReasonId', {
      params: new HttpParams().set('reasonId', event.target.value),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta motivo por detalle razón
  get_MotiveByReasonDetailId(event: any, token: string): Observable<Motive[]> {
    return this.httpClient.get<Motive[]>(this.env.listUrlReplicacion + 'Motives/GetMotiveByReasonDetailId', {
      params: new HttpParams().set('detailReasonId', event.target.value),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }

  //Consulta fuente
  get_Sources(token: string): Observable<Source[]> {
    return this.httpClient.get<Source[]>(this.env.listUrlReplicacion + 'Sources/GetSources', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }
}

function getToken(token: string, responseToken: Object) {
  token = responseToken["request"];
  return token;
}


