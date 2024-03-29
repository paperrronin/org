import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class DateService {
  public date:BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date()); 
  public formatDate:string  = " ";
  public datePipe = new DatePipe('en-US');
  

  public getDate(): Observable<Date> {
    return this.date.asObservable();
  }

  public getFormatDate():string{
    this.date.pipe(
      map(value => this.datePipe.transform(value, 'dd-MM-yyyy')??'')
    ).subscribe(formattedValue => {
      this.formatDate = formattedValue 
    });
    
    return this.formatDate
  }

  public setDate(date: Date): void {
    this.date.next(date);
    // console.log(this.date.value)
  }
}
