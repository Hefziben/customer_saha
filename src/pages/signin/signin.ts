import { Component, Inject } from '@angular/core';
import { NavController, Loading, LoadingController, ToastController, AlertController, Platform, App, Events } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { ClientService } from '../../providers/client.service';
import { OtpPage } from '../otp/otp';
import { Constants } from '../../models/constants.models';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { PrivacyPage } from '../privacy/privacy';
import { Helper } from '../../models/helper.models';
import { SocialLoginRequest } from '../../models/sociallogin-request.models';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [ClientService]
})
export class SigninPage {
  private countries: any;
  private phoneNumber: string;
  private countryCode: string;
  private phoneNumberFull: string;
  private loading: Loading;
  private loadingShown: Boolean = false;
  private phoneNumberHint: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private navCtrl: NavController, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private alertCtrl: AlertController, private service: ClientService, private translate: TranslateService,
    private facebook: Facebook, private google: GooglePlus, private platform: Platform, private app: App, private events: Events) {
    this.getCountries();
    this.changeHint();
  }

  changeHint() {
    this.phoneNumber = "";
    if (this.countryCode && this.countryCode.length) {
      this.translate.get('enter_phone_number_exluding').subscribe(value => {
        this.phoneNumberHint = value + " (+" + this.countryCode + ")";
      });
    } else {
      this.translate.get('enter_phone_number').subscribe(value => {
        this.phoneNumberHint = value;
      });
    }
  }

  getCountries() {
    this.service.getCountries().subscribe(data => {
      this.countries = data;
    }, err => {
      console.log(err);
    })
  }

  privacy() {
    let terms: string = Helper.getSetting("terms");
    if (terms && terms.length) {
      this.translate.get('terms_conditions').subscribe(value => {
        this.navCtrl.push(PrivacyPage, { toShow: terms, heading: value });
      });
    }
  }

  alertPhone() {
    if (!this.countryCode || !this.countryCode.length) {
      this.translate.get("select_country").subscribe(value => this.showToast(value));
      return;
    }
    if (!this.phoneNumber || !this.phoneNumber.length) {
      this.showToast(this.phoneNumberHint);
      return;
    }
    this.translate.get(['alert_phone', 'no', 'yes']).subscribe(text => {
      this.phoneNumberFull = "+" + this.countryCode + this.phoneNumber;
      let alert = this.alertCtrl.create({
        title: this.phoneNumberFull,
        message: text['alert_phone'],
        buttons: [{
          text: text['no'],
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: text['yes'],
          handler: () => {
            this.checkIfExists();
          }
        }]
      });
      alert.present();
    });
  }

  checkIfExists() {
    this.translate.get('just_moment').subscribe(value => {
      this.presentLoading(value);
      this.service.checkUser({ mobile_number: this.phoneNumberFull, role: "customer" }).subscribe(res => {
        console.log(res);
        this.dismissLoading();
        this.app.getRootNav().setRoot(OtpPage, { phoneNumberFull: this.phoneNumberFull });
        
      }, err => {
        console.log(err);
        this.dismissLoading();
        this.navCtrl.push(SignupPage, { code: this.countryCode, phone: this.phoneNumber });
      });
    });
  }

  signInFacebook() {
    if (this.platform.is('cordova')) {
      this.translate.get('logging_facebook').subscribe(value => {
        this.presentLoading(value);
        let os = this.platform.is('ios') ? 'ios' : 'android';
        this.facebook.login(["public_profile", 'email']).then(response => {
          console.log("fb_success", JSON.stringify(response));
          this.translate.get('verifying_user').subscribe(value => {
            this.showToast(value);
            this.service.loginSocial(new SocialLoginRequest(response.authResponse.accessToken, "facebook", os)).subscribe(res => {
              this.dismissLoading();
              this.loginSocialSuccess(res);
            }, err => {
              this.dismissLoading();
              console.log(err);
              if (err && err.status && err.status == 404) {
                this.navCtrl.push(SignupPage);
              } else {
                this.showToast(err.error.message);
              }
            });
          });
        }).catch((error) => {
          console.log("fb_error", error);
          this.showToast("Facebook login failed");
          this.dismissLoading();
        });
      });
    }
  }

  signInGoogle() {
    if (this.platform.is('cordova')) {
      this.translate.get('logging_google').subscribe(value => {
        this.presentLoading(value);
        let os = this.platform.is('ios') ? 'ios' : 'android';
        this.google.login({
          'webClientId': this.config.firebaseConfig.webApplicationId,
          'offline': false,
          'scopes': 'profile email'
        }).then(googleCredential => {
          console.log('google_success', JSON.stringify(googleCredential));
          this.translate.get('verifying_user').subscribe(value => {
            this.showToast(value);
            this.service.loginSocial(new SocialLoginRequest(googleCredential.idToken, "google", os)).subscribe(res => {
              this.dismissLoading();
              this.loginSocialSuccess(res);
            }, err => {
              this.dismissLoading();
              console.log(err);
              if (err && err.status && err.status == 404) {
                if (googleCredential.displayName && googleCredential.email) {
                  this.navCtrl.push(SignupPage, { name: googleCredential.displayName, email: googleCredential.email });
                } else {
                  this.navCtrl.push(SignupPage);
                }
              } else {
                this.showToast(err.error.message);
              }
            });
          });
        }).catch(err => {
          console.log('google_fail', err);
          this.dismissLoading();
        });
      });
    }
  }

  private loginSocialSuccess(res) {
    if (res.user.mobile_verified == 1) {
      window.localStorage.setItem(Constants.KEY_USER, JSON.stringify(res.user));
      window.localStorage.setItem(Constants.KEY_TOKEN, res.token);
      this.events.publish('user:login', res.user);
      this.app.getRootNav().setRoot(TabsPage);
    } else {
      this.app.getRootNav().setRoot(OtpPage, { phoneNumberFull: res.user.mobile_number });
    }
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
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
