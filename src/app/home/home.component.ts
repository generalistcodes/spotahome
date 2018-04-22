import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Post } from '../post';
 import {RequestOptions, Request, Headers } from '@angular/http';
import {MatListModule} from '@angular/material/list';
import { Observable } from 'rxjs/Observable';
import { OrderPipe } from 'ngx-order-pipe';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly MARKER_URL = '/madrid';
  readonly HOMECARDS_URL = '/homecards_ids';

  requests:any;
  data:any;
  res:any;
  properties:any;
  homecards:any;
  markerId:any;


  order:string = 'card.pricePerMont';
  reverse:boolean = false;

  homeTypes = [
    {value: 'all', viewValue: 'All'},
    {value: 'room', viewValue: 'Room'}
    {value: 'apartment', viewValue: 'Apartment'}
    {value: 'studios', viewValue: 'Studios'}
    {value: 'residence', viewValue: 'Residence'}
  ];

  selectedValue:string = this.homeTypes[0].value;


  constructor(private http:HttpClient, private orderPipe:OrderPipe) {

    this.http.get(this.MARKER_URL).subscribe(res=> {
      let markerId = [];
      res.data.forEach(function (markers) {
        markerId.push(markers['id']);
      });
      let homeCardParam = "?ids[]" + markerId.slice(0, 31).join('&ids[]=');
      this.http.get(this.HOMECARDS_URL + homeCardParam).subscribe(res=> {
        let cards = res.data.homecards;
        cards.sort(function (card1, card2) {
          return card1.pricePerMonth - card2.pricePerMonth;
        });
        this.homecards = cards;
      });
    });

  }

  onHomeTypesChanged(event) {

    if (this.selectedValue == "high") {
      this.selectedValue = "high";
      this.order = 'card.pricePerMonth';
    }

    event.value = this.selectedValue;
  }

  setOrder(value:string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }


  downloadJson() {
    var stringHomeCardsJson = JSON.stringify(this.homecards);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(stringHomeCardsJson));
    element.setAttribute('download', "spotahome-homecards.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  ngOnInit() {
    this.setOrder('card.pricePerMonth');
  }
}
