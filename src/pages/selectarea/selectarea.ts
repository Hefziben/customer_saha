import { NavController, MenuController, ToastController, ModalController, Modal, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps';
import { Constants } from '../../models/constants.models';
import { MyLocation } from '../../models/my-location.models';
import { Add_address_titlePage } from '../add_address_title/add_address_title';
import { Address } from '../../models/address.models';
import { Subscription } from 'rxjs/Subscription';
import { AddressCreateRequest } from '../../models/address-create-request.models';
import { TranslateService } from '@ngx-translate/core';
import { ClientService } from '../../providers/client.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'page-selectarea',
  templateUrl: 'selectarea.html',
  providers: [ClientService]
})
export class SelectareaPage {
  @ViewChild('map') private mapElement: ElementRef;
  @ViewChild('pleaseConnect') private pleaseConnect: ElementRef;
  private latitude: number;
  private longitude: number;
  private autocompleteService: any;
  private placesService: any;
  private query: string = '';
  private places: any = [];
  private searchDisabled: boolean;
  private saveDisabled: boolean;
  private initialized: boolean;
  private location: MyLocation;
  private marker: google.maps.Marker;
  private address: Address;
  private ignoreClick = false;
  private modalPresented = false;
  private forsearch = false;
  private addressSaveModal: Modal;
  private subscriptions: Array<Subscription> = [];
  private loading: Loading;
  private loadingShown = false;

  constructor(private navCtrl: NavController, private menuCtrl: MenuController, private loadingCtrl: LoadingController,
    private modalCtrl: ModalController, navparam: NavParams, private service: ClientService,
    private zone: NgZone, private maps: GoogleMaps, private translate: TranslateService,
    private geolocation: Geolocation, private toastCtrl: ToastController) {
    this.menuCtrl.enable(false, 'myMenu');
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.address = navparam.get("address");
    this.forsearch = navparam.get("forsearch");
  }

  ionViewWillLeave() {
    if (this.addressSaveModal) this.addressSaveModal.dismiss();
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  ionViewDidLoad(): void {
    if (!this.initialized) {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.searchDisabled = false;
        this.maps.map.addListener('click', (event) => {
          if (event && event.latLng) {
            this.onMapClick(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
          }
        });
        this.initialized = true;
        if (this.address) {
          this.onMapClick(new google.maps.LatLng(Number(this.address.latitude), Number(this.address.longitude)));
        } else {
          this.detect();
        }
      }).catch(err => {
        console.log(err);
        this.close();
      });
      mapLoaded.catch(err => {
        console.log(err);
        this.close();
      });
    }
  }

  onMapClick(pos: google.maps.LatLng) {
    if (pos && !this.ignoreClick) {
      if (!this.marker) {
        this.marker = new google.maps.Marker({ position: pos, map: this.maps.map });
        this.marker.setClickable(true);
        this.marker.addListener('click', (event) => {
          console.log("markerevent", event);
          this.showToast(this.location.name);
        });
      }
      else {
        this.marker.setPosition(pos);
      }
      this.maps.map.panTo(pos);

      let geocoder = new google.maps.Geocoder();
      let request = { location: pos };
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
          this.saveDisabled = false;
          this.location = new MyLocation();
          this.location.name = results[0].formatted_address;
          this.location.lat = String(pos.lat());
          this.location.lng = String(pos.lng());
          this.showToast(this.location.name);
        }
      });
    }
  }

  selectPlace(place) {
    this.query = place.description;
    this.ignoreClick = true;
    setTimeout(() => {
      this.ignoreClick = false;
      console.log(this.query);
    }, 2000);
    this.places = [];
    let myLocation = new MyLocation();
    myLocation.name = place.name;
    this.placesService.getDetails({ placeId: place.place_id }, (details) => {
      this.zone.run(() => {
        myLocation.name = (details.formatted_address && details.formatted_address.length) ? details.formatted_address : details.name;
        myLocation.lat = details.geometry.location.lat();
        myLocation.lng = details.geometry.location.lng();
        this.saveDisabled = false;
        let lc = { lat: myLocation.lat, lng: myLocation.lng };
        this.maps.map.setCenter(lc);
        this.location = myLocation;
        let pos = new google.maps.LatLng(Number(lc.lat), Number(lc.lng));
        if (!this.marker)
          this.marker = new google.maps.Marker({ position: pos, map: this.maps.map });
        else
          this.marker.setPosition(pos);
        this.maps.map.panTo(pos);
      });
    });
  }

  searchPlace() {
    this.saveDisabled = true;
    if (this.query.length > 0 && !this.searchDisabled) {
      let config = {
        //types: ['geocode'],
        input: this.query
      }
      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
          this.places = [];
          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }
      });
    } else {
      this.places = [];
    }
  }

  detect() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.onMapClick(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }).catch((err) => {
      console.log("getCurrentPosition", err);
      this.showToast("Location detection failed");
    });
  }

  save() {
    if (this.location) {
      window.localStorage.setItem(Constants.KEY_LOCATION, JSON.stringify(this.location));
      if (this.forsearch) {
        this.close();
      } else {
        if (!this.address) {
          this.address = new Address();
          this.address.id = -1;
        }
        this.address.latitude = this.location.lat;
        this.address.longitude = this.location.lng;
        this.address.address = this.location.name;
        this.addressSaveModal = this.modalCtrl.create(Add_address_titlePage, { address: this.address });
        this.addressSaveModal.present();
        this.addressSaveModal.onDidDismiss(data => {
          this.modalPresented = false;
          this.address = data;
          this.saveAddress();
        });
        this.modalPresented = true;
      }
    }
  }

  saveAddress() {
    if (!this.address.title || !this.address.title.length) {
      this.translate.get("err_address_title").subscribe(value => {
        this.showToast(value);
      });
    } else if (!this.address.address || !this.address.address.length) {
      this.translate.get("err_address_full").subscribe(value => {
        this.showToast(value);
      });
    } else if (!this.address.latitude || !this.address.longitude) {
      this.translate.get("err_address_coordinates").subscribe(value => {
        this.showToast(value);
      });
    } else {
      let addressRequest = new AddressCreateRequest();
      addressRequest.title = this.address.title;
      addressRequest.address = this.address.address;
      addressRequest.lat = this.address.latitude;
      addressRequest.lng = this.address.longitude;
      addressRequest.latitude = this.address.latitude;
      addressRequest.longitude = this.address.longitude;

      if (this.address.id == -1) {
        this.createAddress(addressRequest);
      } else {
        this.updateAddress(addressRequest);
      }
    }
  }

  createAddress(addressRequest) {
    this.translate.get("address_creating").subscribe(value => {
      this.presentLoading(value);
    });
    let subscription: Subscription = this.service.addAddress(window.localStorage.getItem(Constants.KEY_TOKEN), addressRequest).subscribe(res => {
      this.dismissLoading();
      let addresses: Array<Address> = JSON.parse(window.localStorage.getItem(Constants.KEY_ADDRESS_LIST));
      if (!addresses) addresses = new Array<Address>();
      addresses.push(res);
      window.localStorage.setItem(Constants.KEY_ADDRESS_LIST, JSON.stringify(addresses));
      this.navCtrl.pop();
    }, err => {
      this.dismissLoading();
      console.log('address_add_err', err);
    });
    this.subscriptions.push(subscription);
  }

  updateAddress(addressRequest) {
    this.translate.get("address_updating").subscribe(value => {
      this.presentLoading(value);
    });
    let subscription: Subscription = this.service.updateAddress(window.localStorage.getItem(Constants.KEY_TOKEN), this.address.id, addressRequest).subscribe(res => {
      this.dismissLoading();
      let addresses: Array<Address> = JSON.parse(window.localStorage.getItem(Constants.KEY_ADDRESS_LIST));
      if (!addresses) addresses = new Array<Address>();
      let index = -1
      for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].id == res.id) {
          index = i;
          break;
        }
      }
      if (index != -1) {
        addresses.splice(index, 1);
      }
      addresses.unshift(res);
      window.localStorage.setItem(Constants.KEY_ADDRESS_LIST, JSON.stringify(addresses));
      this.navCtrl.pop();
    }, err => {
      this.dismissLoading();
      console.log('address_update_err', err);
    });
    this.subscriptions.push(subscription);
  }

  close() {
    this.navCtrl.pop();
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
