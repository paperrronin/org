import { AnimationTriggerMetadata, trigger, transition, animate, keyframes, style, state } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendarHeader } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { DateService } from '../shared/date.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('transformPanel', [
      transition(
        'initial => final',
        animate(
          '120ms cubic-bezier(0, 0, 0.2, 1)',
          keyframes([
            style({opacity: 0, transform: 'scale(1, 0.8)'}),
            style({opacity: 1, transform: 'scale(1, 1)'}),
          ]),
        ),
      ),
      transition(
        'final => initial',
        animate(
          '120ms cubic-bezier(0, 0, 0.2, 1)',
          keyframes([
            style({opacity: 0, transform: 'scale(1, 0.8)'}),
            style({opacity: 1, transform: 'scale(1, 1)'}),
          ]),
        ),
      ),
    ]),
  ]
})

export class CalendarComponent implements OnInit {
  public date$: Observable<Date> | undefined;
  public selectedDate:Date = new Date();
  public animation:string = 'initial';
  public month:number = 0;
  

  // exampleHeader = ExampleHeader;

  constructor(public dateService:DateService) { }


  ngOnInit(): void {
    this.date$ = this.dateService.getDate();
    this.month = this.selectedDate.getMonth();
  }

  public updateDate(){
    this.month = this.selectedDate.getMonth()
    this.dateService.setDate(this.selectedDate)
    if(this.animation =='initial'){
      this.animation = 'final'
    } else{
      this.animation = 'initial'
    }
  }

  public changeheight(){
    console.log(322)
    if(this.animation =='initial'){
      this.animation = 'final'
    } else{
      this.animation = 'initial'
    }
  }

}

// @Component({
//   selector: 'example-header',
//   template: `
// <div class="mat-calendar-header">
//   <div class="mat-calendar-controls">
//     <button mat-button type="button" class="mat-calendar-period-button"
//             (click)="currentPeriodClicked()" [attr.aria-label]="periodButtonLabel"
//             [attr.aria-describedby]="_periodButtonLabelId" aria-live="polite">
//       <span aria-hidden="true">{{periodButtonText}}</span>
//       <svg class="mat-calendar-arrow" [class.mat-calendar-invert]="calendar.currentView !== 'month'"
//            viewBox="0 0 10 5" focusable="false" aria-hidden="true">
//            <polygon points="0,0 5,5 10,0"/>
//       </svg>
//     </button>

//     <div class="mat-calendar-spacer"></div>

//     <ng-content></ng-content>

//     <button mat-icon-button type="button" class="mat-calendar-previous-button"
//             [disabled]="!previousEnabled()" (click)="previousClicked()"
//             [attr.aria-label]="prevButtonLabel">
//     </button>

//     <button mat-icon-button type="button" class="mat-calendar-next-button"
//             [disabled]="!nextEnabled()" (click)="nextClicked()"
//             [attr.aria-label]="nextButtonLabel">
//     </button>
//   </div>
// </div>
// <label [id]="_periodButtonLabelId" class="mat-calendar-hidden-label">{{periodButtonDescription}}</label> `,
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })

// export class ExampleHeader extends MatCalendarHeader<any> {

//   /** Handles user clicks on the period label. */
//   override currentPeriodClicked(): void {
//     this.calendar.currentView = this.calendar.currentView == 'month' ? 'multi-year' : 'month';
//   }

//   /** Handles user clicks on the previous button. */
//   customPrev(): void {
//     console.log(this.calendar.activeDate)
//     this.previousClicked()
//   }

//   /** Handles user clicks on the next button. */
//   customNext(): void {
//     console.log(this.calendar.activeDate)
//     this.nextClicked()
//   }

// }
 


