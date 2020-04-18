import { Component } from '@angular/core';
import { NavController, App, AlertController, Loading, LoadingController, ToastController, Platform } from 'ionic-angular';
import { ManageaddressPage } from '../manageaddress/manageaddress';
import { ContactPage } from '../contact/contact';
import { PrivacyPage } from '../privacy/privacy';
import { SigninPage } from '../signin/signin';
import { Constants } from '../../models/constants.models';
import { User } from '../../models/user.models';
import { ClientService } from '../../providers/client.service';
import { FirebaseClient } from '../../providers/firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { ManagelanguagePage } from '../managelanguage/managelanguage';
import { Helper } from '../../models/helper.models';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { File, FileEntry, Entry } from '@ionic-native/file';
import { FaqsPage } from '../faqs/faqs';
import { AppVersion } from '@ionic-native/app-version';
import { Market } from '@ionic-native/market';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [ClientService, FirebaseClient]
})
export class AccountPage {
  private userMe: User;
  private progress: boolean;
  private loading: Loading;
  private loadingShown = false;

  constructor(private navCtrl: NavController, private app: App, private alertCtrl: AlertController,
    private service: ClientService, private loadingCtrl: LoadingController, private translate: TranslateService,
    private toastCtrl: ToastController, private firebaseService: FirebaseClient, private file: File,
    private imagePicker: ImagePicker, private cropService: Crop, private platform: Platform,
    private appVersion: AppVersion, private market: Market, private socialSharing: SocialSharing) {
    this.userMe = JSON.parse(window.localStorage.getItem(Constants.KEY_USER));
  }

  loginIfNot() {
    if (!this.userMe) {
      this.navCtrl.push(SigninPage);
    }
  }

  openAction() {
    if (this.userMe) {
      this.platform.ready().then(() => {
        if (this.platform.is("cordova")) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1,
          }).then((results) => {
            if (results && results[0]) {
              this.reduceImages(results).then(() => {
                console.log('cropped_images');
              });
            }
          }, (err) => {
            console.log("getPictures", JSON.stringify(err));
          });
        }
      });
    } else {
      this.translate.get("alert_login_short").subscribe(value => this.showToast(value));
      this.loginIfNot();
    }
  }

  reduceImages(selected_pictures: any): any {
    return selected_pictures.reduce((promise: any, item: any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, { quality: 100 }).then(cropped_image => {
          this.resolveUri(cropped_image);
        });
      });
    }, Promise.resolve());
  }

  resolveUri(uri: string) {
    console.log('uri: ' + uri);
    if (this.platform.is("android") && uri.startsWith('content://') && uri.indexOf('/storage/') != -1) {
      uri = "file://" + uri.substring(uri.indexOf("/storage/"), uri.length);
      console.log('file: ' + uri);
    }
    this.file.resolveLocalFilesystemUrl(uri).then((entry: Entry) => {
      console.log(entry);
      var fileEntry = entry as FileEntry;
      fileEntry.file(success => {
        var mimeType = success.type;
        console.log(mimeType);
        let dirPath = entry.nativeURL;
        this.upload(dirPath, entry.name, mimeType);
      }, error => {
        console.log(error);
      });
    })
  }

  upload(path, name, mime) {
    console.log('original: ' + path);
    let dirPathSegments = path.split('/');
    dirPathSegments.pop();
    path = dirPathSegments.join('/');
    console.log('dir: ' + path);
    this.file.readAsArrayBuffer(path, name).then(buffer => {
      this.translate.get("uploading_image").subscribe(value => {
        this.presentLoading(value);
      });
      this.progress = true;
      this.firebaseService.uploadBlob(new Blob([buffer], { type: mime })).then(url => {
        this.progress = false;
        this.dismissLoading();
        console.log("Url is", url);
        this.userMe.image_url = String(url);
        this.service.updateUser(window.localStorage.getItem(Constants.KEY_TOKEN), { image_url: String(url) }).subscribe(res => {
          console.log(res);
          window.localStorage.setItem(Constants.KEY_USER, JSON.stringify(res));
        }, err => {
          console.log('update_user', err);
        });
      }).catch(err => {
        this.progress = false;
        this.dismissLoading();
        this.showToast(JSON.stringify(err));
        console.log(err);
        this.translate.get("uploading_fail").subscribe(value => {
          this.presentErrorAlert(value);
        });
      })
    }).catch(err => {
      this.dismissLoading();
      this.showToast(JSON.stringify(err));
      console.log(err);
    })
  }

  manageaddress() {
    if (this.userMe) {
      this.navCtrl.push(ManageaddressPage, { edit: true });
    } else {
      this.translate.get("alert_login_short").subscribe(value => this.showToast(value));
      this.loginIfNot();
    }
  }
  contact() {
    if (this.userMe) {
      this.navCtrl.push(ContactPage);
    } else {
      this.translate.get("alert_login_short").subscribe(value => this.showToast(value));
      this.loginIfNot();
    }
  }
  privacy() {
    let terms: string = Helper.getSetting("privacy_policy");
    if (terms && terms.length) {
      this.translate.get('privacy_policy').subscribe(value => {
        this.navCtrl.push(PrivacyPage, { toShow: terms, heading: value });
      });
    }
  }
  about() {
    let terms: string = Helper.getSetting("about_us");
    if (terms && terms.length) {
      this.translate.get('about_us').subscribe(value => {
        this.navCtrl.push(PrivacyPage, { toShow: terms, heading: value });
      });
    }
  }
  chooseLanguage() {
    this.navCtrl.push(ManagelanguagePage);
  }
  faqs() {
    this.navCtrl.push(FaqsPage);
  }
  shareApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        this.appVersion.getPackageName().then(pn => {
          if (this.platform.is("android")) {
            this.socialSharing.share("https://play.google.com/store/apps/details?id=" + pn).then((res) => {
              // Success!
            }).catch((error) => {
              console.log("socialSharing", error);
              this.market.open(pn);
            });
          } else {
            this.market.open(pn);
          }
        });
      }
    });
  }
  alertLogout() {
    if (this.userMe) {
      this.translate.get(['logout_title', 'logout_message', 'no', 'yes']).subscribe(text => {
        let alert = this.alertCtrl.create({
          title: text['logout_title'],
          message: text['logout_message'],
          buttons: [{
            text: text['no'],
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }, {
            text: text['yes'],
            handler: () => {
              window.localStorage.removeItem(Constants.KEY_USER);
              window.localStorage.removeItem(Constants.KEY_TOKEN);
              window.localStorage.removeItem(Constants.KEY_NOTIFICATIONS);
              window.localStorage.removeItem(Constants.KEY_ADDRESS_LIST);
              this.app.getRootNav().setRoot(TabsPage);
            }
          }]
        });
        alert.present();
      });
    } else {
      this.navCtrl.push(SigninPage);
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

}
