import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ToastController, Events } from 'ionic-angular';
import { ChatscreenPage } from '../chatscreen/chatscreen';
import { RatePage } from '../rate/rate';
import { Appointment } from '../../models/appointment.models';
import { Subscription } from 'rxjs/Subscription';
import { ClientService } from '../../providers/client.service';
import { Constants } from '../../models/constants.models';
import { User } from '../../models/user.models';
import { Chat } from '../../models/chat.models';
import { PlumberprofilePage } from '../plumberprofile/plumberprofile';
import { BooknowPage } from '../booknow/booknow';
import { Helper } from '../../models/helper.models';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
import { TrackPage } from '../track/track';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage {
  private appointment: Appointment;
  private loading: Loading;
  private loadingShown = false;
  private isLoading = false;
  private statusLevel = 1;
  private statusText = "Job Pending";
  private canRate = false;
  private providerRating = -1;
  private statusLevel1Time: string;
  private statusLevel2Time: string;
  private statusLevel3Time: string;
  private reviewText: string;
  private subscriptions: Array<Subscription> = [];

  constructor(private navCtrl: NavController, navParam: NavParams, private service: ClientService, private events: Events,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, private callNumber: CallNumber, private translate: TranslateService) {
    this.appointment = navParam.get("appointment");
    let pr = window.localStorage.getItem("rated" + this.appointment.id);
    this.canRate = (this.appointment && this.appointment.status == 'complete' && pr == null);
    if (pr && Number(pr)) this.providerRating = Number(pr);
    this.translate.get(this.canRate ? "review_now" : "reviewed").subscribe(value => {
      this.reviewText = value;
    });
    events.subscribe("rated:provider", (rating) => {
      this.canRate = false;
      this.providerRating = rating;
      this.translate.get(this.canRate ? "review_now" : "reviewed").subscribe(value => {
        this.reviewText = value;
      });
    });
    this.setStatus();
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  cancelJob() {
    this.translate.get('just_moment').subscribe(value => {
      this.presentLoading(value);
    });
    this.subscriptions.push(this.service.appointmentCancel(window.localStorage.getItem(Constants.KEY_TOKEN), this.appointment.id).subscribe(res => {
      console.log(res);
      this.dismissLoading();
      this.appointment = res;
      this.setStatus();
      this.events.publish("refresh:appointments");
    }, err => {
      console.log('cancel_err', err);
      this.dismissLoading();
    }));
  }

  updateJobStatus(status) {
    if (this.appointment.status == 'cancelled') return;
    this.translate.get('updating').subscribe(value => {
      this.presentLoading(value);
    });
    let subscription: Subscription = this.service.appointmentUpdate(window.localStorage.getItem(Constants.KEY_TOKEN), this.appointment.id, { status: status }).subscribe(res => {
      console.log(res);
      this.dismissLoading();
      this.appointment = res;
      this.setStatus();
    }, err => {
      console.log('update_status', err);
      this.dismissLoading();
    });
    this.subscriptions.push(subscription);
  }

  setStatus() {
    if (this.appointment) {
      switch (this.appointment.status) {
        case "pending": {
          this.statusLevel = 1;
          this.translate.get('updating').subscribe(value => {
            this.statusText = value;
          });
          break;
        }
        case "accepted": {
          this.statusLevel = 1;
          this.translate.get('job_accepted').subscribe(value => {
            this.statusText = value;
          });
          break;
        }
        case "onway": {
          this.statusLevel = 2;
          this.translate.get('job_onway').subscribe(value => {
            this.statusText = value;
          });
          break;
        }
        case "ongoing": {
          this.statusLevel = 2;
          this.translate.get('job_ongoing').subscribe(value => {
            this.statusText = value;
          });
          break;
        }
        case "complete": {
          this.statusLevel = 3;
          this.translate.get('job_complete').subscribe(value => {
            this.statusText = value;
          });
          break;
        }
        case "cancelled": {
          this.statusLevel = 1;
          this.translate.get('job_cancelled').subscribe(value => {
            this.statusText = value;
          });
          break;
        }
        case "rejected": {
          this.statusLevel = 1;
          this.translate.get('job_rejected').subscribe(value => {
            this.statusText = value;
          });
          break;
        }
      }
      let acceptedTime = Helper.getLogTimeForStatus("accepted", this.appointment.logs);
      if (acceptedTime && acceptedTime.length) {
        this.translate.get('job_accepted_on').subscribe(value => {
          this.statusLevel1Time = value + acceptedTime;
        });
      }

      if (!this.statusLevel1Time || !this.statusLevel1Time.length) {
        if (this.appointment.status == "cancelled") {
          this.translate.get('job_cancelled_on').subscribe(value => {
            this.statusLevel1Time = value + Helper.formatTimestampDateTime(this.appointment.updated_at, Helper.getLocale());
          });
        } else if (this.appointment.status == "rejected") {
          this.translate.get('job_rejected_on').subscribe(value => {
            this.statusLevel1Time = value + Helper.formatTimestampDateTime(this.appointment.updated_at, Helper.getLocale());
          });
        } else {
          this.statusLevel1Time = this.appointment.updated_at;
        }
      }
      this.translate.get('job_started_on').subscribe(value => {
        let onwaytime = Helper.getLogTimeForStatus("onway", this.appointment.logs);
        if (onwaytime && onwaytime.length) {
          this.statusLevel2Time = value + onwaytime;
        } else {
          let ongoingtime = Helper.getLogTimeForStatus("ongoing", this.appointment.logs);
          this.statusLevel2Time = (ongoingtime && ongoingtime.length) ? (value + ongoingtime) : "";
        }
      });
      this.translate.get('job_completed_on').subscribe(value => {
        let time = Helper.getLogTimeForStatus("complete", this.appointment.logs);
        this.statusLevel3Time = (time && time.length) ? (value + time) : "";
      });

      let pr = window.localStorage.getItem("rated" + this.appointment.id);
      this.canRate = (this.appointment && this.appointment.status == 'complete' && pr == null);
      if (pr && Number(pr)) this.providerRating = Number(pr);
      this.translate.get(this.canRate ? "review_now" : "reviewed").subscribe(value => {
        this.reviewText = value;
      });
    }
  }

  callProvider() {
    this.callNumber.callNumber(this.appointment.provider.user.mobile_number, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }

  // trackProvider() {
  //   this.navCtrl.push(TrackPage, { appointment: this.appointment });
  // }

  trackProvider() {
    if (this.appointment.status == "onway") {
      this.navCtrl.push(TrackPage, { appointment: this.appointment });
    } else {
      this.translate.get("track_unavialable").subscribe(value => {
        this.showToast(value);
      });
    }
  }

  chatscreen() {
    let newUserMe: User = JSON.parse(window.localStorage.getItem(Constants.KEY_USER));
    let chat = new Chat();
    chat.chatId = this.appointment.provider.user.id + "hp";
    chat.chatImage = (this.appointment.provider.user.image_url && this.appointment.provider.user.image_url.length) ? this.appointment.provider.user.image_url : "assets/imgs/empty_dp.png";
    chat.chatName = this.appointment.provider.user.name;
    chat.chatStatus = this.appointment.provider.user.email;
    chat.myId = newUserMe.id + "hc";
    this.navCtrl.push(ChatscreenPage, { chat: chat });
  }

  rate() {
    if (this.canRate) {
      this.navCtrl.push(RatePage, { appointment: this.appointment });
    }
  }

  reschedule() {
    this.navCtrl.push(BooknowPage, { appointment: this.appointment });
  }

  viewProfile() {
    this.navCtrl.push(PlumberprofilePage, { profile: this.appointment.provider });
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
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
