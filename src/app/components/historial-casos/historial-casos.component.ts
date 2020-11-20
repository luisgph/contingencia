import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-casos',
  templateUrl: './historial-casos.component.html',
  styleUrls: ['./historial-casos.component.css']
})
export class HistorialCasosComponent implements OnInit {
  private readonly clientId = window.location.search;
  historyHidden: boolean;
  constructor() { }

  ngOnInit() {
    if (this.clientId != "") {
      this.historyHidden = true;
    } else {
      this.historyHidden = false;
    }
  }

}
