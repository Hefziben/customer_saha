import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Loading, App } from 'ionic-angular';
import { Address } from '../../models/address.models';
import { ProviderProfile } from '../../models/provider-profile.models';
import { ClientService } from '../../providers/client.service';
import { Subscription } from 'rxjs/Subscription';
import { Constants } from '../../models/constants.models';
import { AppointmentRequest } from '../../models/appointment-request.models';
import { TabsPage } from '../tabs/tabs';
import { Appointment } from '../../models/appointment.models';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../models/category.models';
import moment from 'moment';

@Component({
  selector: 'page-booknow',
  templateUrl: 'booknow.html',
  providers: [ClientService]
})
export class BooknowPage {
  private gaming: string = "nes";
  private where: string = "nes";
  private address: Address;
  private profile: ProviderProfile;
  private dates: Array<Date> = [];
  private subscriptions: Array<Subscription> = [];
  private dateSelected: Date;
  private timeRangeSelected;
  private loading: Loading;
  private loadingShown = false;
  private appointment: Appointment;
  private category: Category;
  private notes: string;
  private weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  private timeRange = [{ time_value: "09:00 - 11:00", time_from: "09:00", time_to: "11:00" },
  { time_value: "11:00 - 13:00", time_from: "11:00", time_to: "13:00" },
  { time_value: "13:00 - 15:00", time_from: "13:00", time_to: "15:00" },
  { time_value: "15:00 - 17:00", time_from: "15:00", time_to: "17:00" },
  { time_value: "17:00 - 19:00", time_from: "17:00", time_to: "19:00" },
  { time_value: "19:00 - 21:00", time_from: "19:00", time_to: "21:00" }];

  constructor(navParam: NavParams, private service: ClientService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private app: App, private translate: TranslateService) {
    this.profile = navParam.get("profile");
    this.address = navParam.get("address");
    this.appointment = navParam.get("appointment");
    this.category = navParam.get("category");
    for (let i = 0; i < 7; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);
      this.dates.push(d);
    }
    this.markSelected(this.dates[0]);
    this.timeRangeSelected = this.timeRange[0];

    if (this.appointment) {
      this.markSelected(new Date(this.appointment.date));
      let trtc = this.appointment.time_from_formatted + " - " + this.appointment.time_to_formatted;
      for (let tr of this.timeRange) {
        if (tr.time_value == trtc) {
          this.timeRangeSelected = tr;
          break;
        }
      }
    }
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  compareFn(tr1, tr2): boolean {
    return tr1 && tr2 ? tr1.time_value == tr2.time_value : tr1 === tr2;
  }

  markSelected(date) {
    this.dateSelected = date;
  }

  proceed() {
    if (moment((moment(this.dateSelected).format("YYYY-MM-DD") + " " + this.timeRangeSelected.time_from + ":00")) > moment()) {
      if (this.appointment) {
        this.updateAppointment();
      } else {
        this.createAppointment();
      }
    } else {
      this.translate.get("err_time_passed").subscribe(value => {
        this.showToast(value);
      });
    }
  }

  updateAppointment() {
    this.translate.get("appointment_updating").subscribe(value => {
      this.presentLoading(value);
    });
    let car = new AppointmentRequest();
    car.time_from = this.timeRangeSelected.time_from;
    car.time_to = this.timeRangeSelected.time_to;
    car.date = moment(this.dateSelected).format("YYYY-MM-DD");
    let subscription: Subscription = this.service.appointmentUpdate(window.localStorage.getItem(Constants.KEY_TOKEN), this.appointment.id, car).subscribe(res => {
      this.dismissLoading();
      this.translate.get("appointment_updating_success").subscribe(value => {
        this.showToast(value);
      });
      this.app.getRootNav().setRoot(TabsPage);
    }, err => {
      this.translate.get("appointment_updating_fail").subscribe(value => {
        this.showToast(value);
      });
      this.dismissLoading();
      console.log('update', err);
    });
    this.subscriptions.push(subscription);
  }

  createAppointment() {
    this.translate.get("appointment_creating").subscribe(value => {
      this.presentLoading(value);
      let car = new AppointmentRequest();
      car.address_id = this.address.id;
      car.provider_id = Number(this.profile.id);
      car.category_id = this.category.id;
      car.time_from = this.timeRangeSelected.time_from;
      car.time_to = this.timeRangeSelected.time_to;
      car.notes = this.notes;
      car.date = moment(this.dateSelected).format("YYYY-MM-DD");
      this.subscriptions.push(this.service.createAppointment(window.localStorage.getItem(Constants.KEY_TOKEN), car).subscribe(res => {
        this.dismissLoading();
        this.translate.get("appointment_creating_success").subscribe(value => {
          this.showToast(value);
        });
        this.app.getRootNav().setRoot(TabsPage);
      }, err => {
        this.translate.get("appointment_creating_fail").subscribe(value => {
          this.showToast(value);
        });
        this.dismissLoading();
        console.log('book', err);
      }));
    });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  private presentLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.onDidDismiss(() => { });
    this.loading.present();
    this.loadingShown = true;
  }

  private dismissLoading() {
    if (this.loadingShown) {
      this.loadingShown = false;
      this.loading.dismiss();
    }
  }

}
