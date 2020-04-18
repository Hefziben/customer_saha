import { Component } from '@angular/core';
import { NavController, Loading, NavParams, ToastController } from 'ionic-angular';
import { ChatscreenPage } from '../chatscreen/chatscreen';
import { ClientService } from '../../providers/client.service';
import { Subscription } from 'rxjs/Subscription';
import { ProviderProfile } from '../../models/provider-profile.models';
import { Constants } from '../../models/constants.models';
import { Chat } from '../../models/chat.models';
import { User } from '../../models/user.models';
import { ManageaddressPage } from '../manageaddress/manageaddress';
import { Review } from '../../models/review.models';
import { CallNumber } from '@ionic-native/call-number';
import { ProviderPortfolio } from '../../models/provider-portfolio.models';
import { Helper } from '../../models/helper.models';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CategoryPage } from '../category/category';
import { Category } from '../../models/category.models';
import { ImageViewerController } from 'ionic-img-viewer';
import { TranslateService } from '@ngx-translate/core';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-plumberprofile',
  templateUrl: 'plumberprofile.html',
  providers: [ClientService]
})
export class PlumberprofilePage {
  private plumber: string = "about";
  private loading: Loading;
  private loadingShown = false;
  private profile: ProviderProfile;
  private category: Category;
  private reviews: Array<Review> = [];
  private portfolios: Array<ProviderPortfolio> = [];
  private subscriptions: Array<Subscription> = [];
  private loadingPortfolios = true;
  private userMe: User;

  constructor(private navCtrl: NavController, params: NavParams, private service: ClientService,
    private iab: InAppBrowser, private toastCtrl: ToastController, private callNumber: CallNumber,
    private imageViewerCtrl: ImageViewerController, private translate: TranslateService) {
    this.userMe = JSON.parse(window.localStorage.getItem(Constants.KEY_USER));
    this.profile = params.get("profile");
    this.category = params.get("category");
    this.loadReviews();
    this.loadPortfolio();
  }

  loadPortfolio() {
    let subscription: Subscription = this.service.providerPortfolio(window.localStorage.getItem(Constants.KEY_TOKEN), String(this.profile.id)).subscribe(res => {
      this.portfolios = res;
      this.loadingPortfolios = false;
    }, err => {
      this.loadingPortfolios = false;
      console.log('portfolio_list', err);
    });
    this.subscriptions.push(subscription);
  }

  loadReviews() {
    this.subscriptions.push(this.service.providerReviews(window.localStorage.getItem(Constants.KEY_TOKEN), String(this.profile.id)).subscribe(res => {
      let reviews: Array<Review> = res.data;
      this.reviews = this.reviews.concat(reviews);
    }, err => {
      console.log('review_list', err);
    }));
  }

  booknow() {
    if (this.userMe) {
      if (this.category) {
        this.navCtrl.push(ManageaddressPage, { profile: this.profile, category: this.category });
      } else {
        this.navCtrl.push(CategoryPage, { cat: this.profile.primary_category, profile: this.profile });
      }
    } else {
      this.translate.get("alert_login_short").subscribe(value => this.showToast(value));
      this.navCtrl.push(SigninPage);
    }
  }

  callProvider() {
    this.callNumber.callNumber(this.profile.user.mobile_number, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }

  linkPortfolio(portfolio) {
    if (Helper.isValidURL(portfolio.link)) {
      this.iab.create(portfolio.link);
    } else {
      const imageViewer = this.imageViewerCtrl.create(portfolio.image_url);
      imageViewer.present();
    }
  }

  chatscreen() {
    if (this.userMe) {
      let chat = new Chat();
      chat.chatId = this.profile.user.id + "hp";
      chat.chatImage = (this.profile.user.image_url && this.profile.user.image_url.length) ? this.profile.user.image_url : "assets/imgs/empty_dp.png";
      chat.chatName = this.profile.user.name;
      chat.chatStatus = this.profile.primary_category.title;
      chat.myId = this.userMe.id + "hc";
      this.navCtrl.push(ChatscreenPage, { chat: chat });
    } else {
      this.translate.get("alert_login_short").subscribe(value => this.showToast(value));
      this.navCtrl.push(SigninPage);
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

}
