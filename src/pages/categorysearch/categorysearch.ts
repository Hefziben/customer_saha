import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { ListofplumberPage } from '../listofplumber/listofplumber';
import { Category } from '../../models/category.models';
import { Subscription } from 'rxjs/Subscription';
import { ClientService } from '../../providers/client.service';
import { Constants } from '../../models/constants.models';
import { TranslateService } from '@ngx-translate/core';
import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-categorysearch',
  templateUrl: 'categorysearch.html',
  providers: [ClientService]
})
export class CategorySearchPage {
  private loading: Loading;
  private loadingShown: Boolean = false;
  private isLoading = false;
  private subCategories: Array<Category>;
  private subscriptions: Array<Subscription> = [];
  private searchQuery: string;

  constructor(private navCtrl: NavController, params: NavParams, private service: ClientService,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, private translate: TranslateService) {
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  getItems(searchbar: any) {
    this.searchQuery = searchbar.srcElement.value;
    this.isLoading = true;
    this.translate.get('searching_service').subscribe(value => {
      this.presentLoading(value);
    });
    this.subscriptions.push(this.service.categorySearch(window.localStorage.getItem(Constants.KEY_TOKEN), this.searchQuery).subscribe(res => {
      this.isLoading = false;
      this.dismissLoading();
      let cats: Array<Category> = res.data;
      this.subCategories = cats;
    }, err => {
      this.isLoading = false;
      this.dismissLoading();
      console.log('cat_sub_err', err);
    }));
  }

  subCatDetail(cat) {
    this.navCtrl.push(cat.parent_id ? ListofplumberPage : CategoryPage, { cat: cat });
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
