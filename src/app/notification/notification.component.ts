import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  constructor(private srv: NotifyService) { }

  public get Notify() { return this.srv; }


  ngOnInit() {
  }

}
