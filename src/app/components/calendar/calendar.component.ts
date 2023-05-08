import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DateService } from '../shared/date.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public date$: Observable<Date> | undefined;
  public selectedDate:Date = new Date();
 

  constructor(public dateService:DateService) { }


  ngOnInit(): void {
    this.date$ = this.dateService.getDate();
  }

  public updateDate(){
    this.dateService.setDate(this.selectedDate)
  }

}


