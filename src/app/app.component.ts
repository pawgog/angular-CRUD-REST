import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

persons : string[];
addPerson : boolean = false;
afterSuccess : boolean = false;
selectedPerson : any;
updateEnable = false;
personForm : FormGroup;



ngOnInit(){
  this.getAllPersons();
}

  constructor (private personService: AppService, fb: FormBuilder) {
    this.personForm = fb.group({
      'name' : [null, Validators.required],
      'city' : [null, Validators.required],
      'mail' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])]
    })
  }

  getAllPersons(){
    this.personService.getPersonsAPI()
    .subscribe(
      data => this.persons = data,
      error => console.log('Server error')
    );
  }

  showAddPerson(){
    this.addPerson = true;
  }

  createPerson(newName : string, newCity : string, newMail : string){
    this.personService.createPerson(newName, newCity, newMail).subscribe(data=>{this.getAllPersons();});
    this.addPerson = false;
    this.afterSuccess = true;
    setTimeout(() => {this.afterSuccess = false;}, 8000)
    this.personForm.reset();
  }

  updatePerson(newName : string, newCity : string, newMail : string){
    this.personService.updatePerson(this.selectedPerson.id, newName, newCity, newMail).subscribe(data=>{this.getAllPersons();});    
    this.updateEnable = false;
  }

  deletePerson(personId : string, personName : string){
    if(confirm("Are you sure to delete name "+personName)) {
      this.personService.deletePerson(personId).subscribe(data=>{this.getAllPersons();});
    }
  }

  loadDetails(person: any){
    this.updateEnable = true;
    this.selectedPerson = person;
  }
}
