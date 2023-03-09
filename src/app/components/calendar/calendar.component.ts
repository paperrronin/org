import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';

interface Day {
  value:moment.Moment;
  active:boolean;
  disabled:boolean;
  selected:boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public calendar: Week[] = [];

  constructor(public dateService:DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  public generate(now:moment.Moment):any{
    const startDay:any = now.clone().startOf('month').startOf('week');
    const endDay:any = now.clone().endOf('month').endOf('week');
    const date:any = startDay.clone().subtract(1,'day');
    const calendar:any = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'date')

            return {
              value, active, disabled, selected
            }
          })
      })
    }

    this.calendar = calendar
  }

  // public select(day: moment.Moment) {
  //   this.dateService.changeDate(day)
  // }

}
