import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public date:BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date()); 

  public getDate(): Observable<Date> {
    return this.date.asObservable();
  }

  public setDate(date: Date): void {
    this.date.next(date);
    // console.log(this.date.value)
  }
}
