import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'BankApplication';
  apiData;
  apiDataObj;
  headers;
  searchModel;
  itemsperpage;
  idx;
  currentCity;
  pageNo;
  
  constructor(private http: HttpClient){
    this.initData("MUMBAI") ; //default is MUMBAI
  }
  initData(city){
    city = city.toUpperCase();
    this.currentCity = city;
    const path = "https://vast-shore-74260.herokuapp.com/banks?city="+city; 
    if(!localStorage[city]){
      this.http.get(path)
      .subscribe(response =>{
        if(response){
          this.apiData = response;
          this.setupData();
          localStorage[city] = JSON.stringify(this.apiData);
        }  
      });
    }
    else{
      this.apiData = JSON.parse(localStorage[city]);
      this.setupData();
    } 
  }

  findIndexOfFav(isFav){
    return isFav === "isFav";
  }

   setupData(){
    for(let i =0; i< this.apiData.length; i++){
      if(!this.apiData[i].isFav){
        this.apiData[i].isFav = false;
      }
    }
    this.headers = Object.keys(this.apiData[0]);
    this.idx = this.headers.findIndex(this.findIndexOfFav);
     this.itemsperpage = 50;
  }
  objectValues(obj){
    return  Object.values(obj);
  }
  changePageLength(event){
    this.itemsperpage = (!!Number(event.target.value))?Number(event.target.value): 50;
  }
  updateFav(data){
    localStorage[this.currentCity] = JSON.stringify(this.apiData);
  }
  onChangeCity(event){
    this.currentCity = (!!event.target.value)? event.target.value.toUpperCase(): "";
    this.initData(this.currentCity);
  }
  updatepageNo(event){
    this.pageNo = event;
  }
}