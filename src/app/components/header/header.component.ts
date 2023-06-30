import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() titulo!: string;
  @Input() differHome: string = 'no';

  constructor(private nav: NavController,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  loadSettings(){
    this.nav.navigateForward('setting');
  }

}
