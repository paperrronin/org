import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { DateService } from '../shared/date.service';
import {Task, TasksService} from '../shared/task.service';
import { trigger, state, style, animate, transition, useAnimation } from '@angular/animations';



@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  animations: [
    trigger('smoothUpdate', [
      state('initial', style({
        opacity: 1, 
      })),
      state('final', style({
        opacity: 0,
      })),
      transition('initial => final', animate('300ms ease-out')),
      transition('final => initial', animate('300ms ease-in'))
    ])
  ]
})


export class OrganizerComponent implements OnInit {

  constructor(public dateService: DateService,
              public tasksService: TasksService) {
  }

  public date$:Observable<Date> = this.dateService.date;
  public form!: FormGroup ;
  public tasks: Task[] = [];
  public animationState:string = 'initial';
  public value:number = 0;
  

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(this.dateService.getFormatDate()))
    ).subscribe(tasks => {
      this.updateValue()
      this.tasks = tasks
    })

    this.form = new FormGroup({
      task: new FormControl('', Validators.required)
    })
  }

  updateValue() {
    this.animationState = 'final';
  
      setTimeout(() => {
        this.value++; 
        this.animationState = 'initial';
    }, 500);
  }

  submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateService.getFormatDate()
    }

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, err => console.error(err))

    console.log(task)
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.error(err))
  }

}



