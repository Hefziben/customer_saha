import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { RequestsPage } from '../requests/requests';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { ChatPage } from '../chat/chat';
import { Tabs } from 'ionic-angular';
import { Constants } from '../../models/constants.models';
import { ClientService } from '../../providers/client.service';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  templateUrl: 'tabs.html',
  providers: [ClientService]
})
export class TabsPage {
  @ViewChild('myTabs') private tabRef: Tabs;
  private tab1Root = RequestsPage;
  private tab2Root = NotificationsPage;
  private tab3Root = HomePage;
  private tab4Root = ChatPage;
  private tab5Root = AccountPage;

  constructor(service: ClientService) {
    service.logActivity(window.localStorage.getItem(Constants.KEY_TOKEN)).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('logActivity', err);
    });
  }

  ionViewDidEnter() {
    this.tabRef.select(2);
  }

}
