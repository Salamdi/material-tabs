/**
 * Created by developer on 01.06.17.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { IAssignee, IFunction, IStage } from './stage.model';
import { SnackbarService } from '../shared/snackbar.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class StagesService {
    private url: string = 'api';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private snackBar: SnackbarService) { }

    public getStages(): Observable<IStage[]> {
        return this.http.get(`${this.url}/testStages`)
            .map(response => response.json().rows)
            .catch(err => this.handleError(err));
    }

    public getFunctions(): Observable<IFunction[]> {
        return this.http.get(`${this.url}/testFunctions`)
            .map(response => response.json().rows)
            .catch(err => this.handleError(err));
    }

    public saveStages(stages: IStage[]): Observable<any> {
        return this.http.post(`${this.url}?act=StageStructure`, JSON.stringify(stages))
            .first()
            .map(response => response.json().rows)
            .catch(err => this.handleError(err));
    }

    public searchAssignees(query: string): Observable<IAssignee[]> {
        return this.http.get(`${this.url}/testAssignees`)
            .map(response => response.json().rows)
            .catch(err => this.handleError(err));
    }

    private handleError(err: Error, mssg?: string, duration?: number): Observable<never> {
        this.snackBar.open(mssg, duration);
        console.error(err);

        return empty();
    }
}
