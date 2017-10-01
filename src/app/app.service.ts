import { Injectable } from '@angular/core';

import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppService {

  constructor(private http: Http) {

  }

  getPersonsAPI(): Observable<any[]>{
    return this.http.get("http://localhost:3000/persons/")
    .map((res: Response) => res.json())
    .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
  }

  createPerson(newName : string, newCity : string, newMail : string ) : Observable<any>{
    return this.http.post("http://localhost:3000/persons", {name: newName, city : newCity, mail : newMail});
  }
  updatePerson(personId: string, newName : string, newCity : string, newMail : string ) : Observable<any>{
    return this.http.put("http://localhost:3000/persons/" + personId, {name : newName, city : newCity, mail : newMail})
  }
  deletePerson(personId: string) : Observable<any>{
    return this.http.delete("http://localhost:3000/persons/" + personId);
  }
}
