import { Component } from '@angular/core';
import { NavParams, LoadingController, ToastController, Loading, App, Events, AlertController } from 'ionic-angular';
import { Appointment } from '../../models/appointment.models';
import { Subscription } from 'rxjs/Subscription';
import { ClientService } from '../../providers/client.service';
import { Constants } from '../../models/constants.models';
import { RateRequest } from '../../models/rate-request.models';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
  providers: [ClientService]
})
export class RatePage {
  private appointment: Appointment;
  private loading: Loading;
  private loadingShown = false;
  private rateRequest = new RateRequest();
  private subscriptions: Array<Subscription> = [];

  constructor(navParam: NavParams, private service: ClientService, private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private toastCtrl: ToastController, private app: App, private events: Events, private translate: TranslateService) {
    this.appointment = navParam.get("appointment");
    this.rateRequest.rating = 3;
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  setRating(rating) {
    this.rateRequest.rating = rating;
  }

  submitRating() {
    if (!this.rateRequest.review || !this.rateRequest.review.length) {
      this.translate.get("err_review").subscribe(value => {
        this.showToast(value);
      });
    } else {
      this.translate.get("just_moment").subscribe(value => {
        this.presentLoading(value);
      });
      this.subscriptions.push(this.service.rateProvider(window.localStorage.getItem(Constants.KEY_TOKEN), this.appointment.provider_id, this.rateRequest).subscribe(res => {
        console.log(res);
        window.localStorage.setItem("rated" + this.appointment.id, String(this.rateRequest.rating));
        this.events.publish("rated:provider", this.rateRequest.rating);
        this.dismissLoading();
        this.translate.get("review_done").subscribe(value => {
          this.showToast(value);
        });
        this.app.getRootNav().setRoot(TabsPage);
      }, err => {
        console.log('submit_rating', err);
        this.dismissLoading();
        let found = false;
        if (err && err.error && err.error.errors) {
          if (err.error.errors.review) {
            found = true;
            this.translate.get("err_review_length").subscribe(value => this.presentErrorAlert(value));
          }
        }
        if (!found) {
          this.translate.get("something_went_wrong").subscribe(value => this.presentErrorAlert(value));
        }
      }));
    }
  }

  private presentErrorAlert(msg: string) {
    this.translate.get(["error", "dismiss"]).subscribe(value => {
      let alert = this.alertCtrl.create({
        title: value["error"],
        subTitle: msg,
        buttons: [value["dismiss"]]
      });
      alert.present();
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
