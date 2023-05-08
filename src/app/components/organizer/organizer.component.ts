import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DateService } from '../shared/date.service';
import {Task, TasksService} from '../shared/task.service';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  public form!: FormGroup ;
  public tasks: Task[] = []

  constructor(public dateService: DateService,
              public tasksService: TasksService) {
  }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      // date: this.dateService.getDate()
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

