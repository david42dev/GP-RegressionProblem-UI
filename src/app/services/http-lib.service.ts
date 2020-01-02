import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Settings} from '../models/settings';
import {OutputData} from '../models/OutputData';

@Injectable({
  providedIn: 'root'
})
export class HttpLibService {

  private basisUrl = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  // Starts application and GP Program
  run(id: number): Observable<OutputData[]> {
    return this.http.get<OutputData[]>(`${this.basisUrl}/regression/run/${id}`)
      .pipe(
        catchError(this.handleError<any>('run', []))
      );
  }

  // Get list of available terminals
  getListOfTerminals(): Observable<string[]> {
    return this.http.get<string[]>(this.basisUrl + '/regression/terminals')
      .pipe(
        catchError(this.handleError<any>('getListOfTerminals', []))
      );
  }

  // Get list of available functions
  getListOfFunctions(): Observable<string[]> {
    return this.http.get<string[]>(this.basisUrl + '/regression/functions')
      .pipe(
        catchError(this.handleError<any>('getListOfFunctions', []))
      );
  }

  // Start the parameter/setting section:
  getListOfAllSettings(): Observable<Settings[]> {
    return this.http.get<Settings[]>(this.basisUrl + '/parameters')
      .pipe(
        catchError(this.handleError<any>('getListOfAllSettings', []))
      );
  }

  saveSetting(newSetting: Settings): Observable<Settings> {
    return this.http.post<Settings>(`${this.basisUrl}/parameters/`, newSetting, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('saveSetting', null))
      );
  }

  getSettingById(id: number): Observable<Settings[]> {
    return this.http.get<Settings[]>(`${this.basisUrl}/parameters/${id}`)
      .pipe(
        catchError(this.handleError<any>('getSettingById', null))
      );
  }

  updateSetting(id: number, newSetting: Settings): Observable<Settings> {
    return this.http.put<Settings>(`${this.basisUrl}/parameters/${id}`, newSetting, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateSetting', null))
      );
  }

  deleteSettingById(id: number): void {
    this.http.delete<Settings>(`${this.basisUrl}/parameters/${id}`)
      .pipe(
        catchError(this.handleError<any>('updateSetting', null))
      );
  }

  // File upload method:
  pushFileToStorage(file: File): Observable<string> {
    const options: Object = {
      reportProgress: true,
      responseType: 'text'
    };
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.post<string>(`${this.basisUrl}/trainingdata/`, data, options)
      .pipe(
        catchError(this.handleError<any>('pushFileToStorage', 'An error occurred during upload'))
      );
  }

  // Download Overall Best Tree
  downloadGPTree(paramsid: number, bestRun: number): Observable<string> {
    const options: Object = {
      responseType: 'text'
    };
    return this.http.get<string>(`${this.basisUrl}/results/${paramsid}/${bestRun}`, options)
      .pipe(
        catchError(this.handleError<any>('downloadGPTree', []))
      );
  }

  // Dowload example trainings file
  downloadExampleTrainingdata() {
    const options: Object = {
      responseType: 'text'
    };
    return this.http.get<string>(`${this.basisUrl}/exampledata`, options)
      .pipe(
        catchError(this.handleError<any>('downloadGPTree', []))
      );
  }

  // From Angular getting Started Hero tutorial:
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
