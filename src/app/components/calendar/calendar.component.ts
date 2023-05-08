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
  public selectedDate: Date | undefined;
 

  constructor(public dateService:DateService) { }


  ngOnInit(): void {
    this.date$ = this.dateService.getDate();
    this.date$.pipe().subscribe(value=>{
      this.selectedDate = value
    })
    this.checkInfo();
  }

  public checkInfo(){
    this.date$?.pipe().subscribe( value =>{
      // this.selectedDate = value;
      "Date in claendar component:" + console.log(value);
      "SelectDate in claendar component:" + console.log(this.selectedDate)
    })
  }

  

  // public generate(now:Date):any{
  //   const startDay:any = now.clone().startOf('month').startOf('week');
  //   const endDay:any = now.clone().endOf('month').endOf('week');
  //   const date:any = startDay.clone().subtract(1,'day');
  //   const calendar:any = []

  //   while (date.isBefore(endDay, 'day')) {
  //     calendar.push({
  //       days: Array(7)
  //         .fill(0)
  //         .map(() => {
  //           const value = date.add(1, 'day').clone()
  //           const active = moment().isSame(value, 'date')
  //           const disabled = !now.isSame(value, 'month')
  //           const selected = now.isSame(value, 'date')

  //           return {
  //             value, active, disabled, selected
  //           }
  //         })
  //     })
  //   }

  //   this.calendar = calendar
  // }

  public select(day: any) {
    // this.dateService.changeDate(day)
  }


}


