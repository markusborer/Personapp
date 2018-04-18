import {Component, OnInit, ViewChild} from '@angular/core';
import {PersonService} from "../shared/person.service";
import {Person} from "../shared/person";
import {Observable} from "rxjs/Observable";
//import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

  searchTerm = '';
  persons: Person[] = [];
  //subscription: Subscription;
  @ViewChild('searchForm') form;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.form.control.valueChanges
      .debounceTime(200)
      .switchMap(s => this.personService.search(this.searchTerm)
        .catch(
          error => {
            console.log(error);
            return Observable.of(undefined);
          }
        )
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.persons = data;
        }
      )
  }

  /*
  search() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.personService.search(this.searchTerm).subscribe(
      (data) => {
        console.log(data);
        this.persons = data;
      }
    )
  }
  */

}
