import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { MyLocation } from '../../models/my-location.models';
import { GoogleMaps } from '../../providers/google-maps';
import { Appointment } from '../../models/appointment.models';
import { } from '@types/googlemaps';

@Component({
  selector: 'page-track',
  templateUrl: 'track.html'
})
export class TrackPage {
  @ViewChild('map') private mapElement: ElementRef;
  @ViewChild('pleaseConnect') private pleaseConnect: ElementRef;
  private initialized: boolean;
  private appointment: Appointment;
  private markerMe: any;
  private markerProvider: any;
  private posMe: any;
  private refLocation: firebase.database.Reference;
  private lastFrom: google.maps.LatLng;

  constructor(private navCtrl: NavController, private menuCtrl: MenuController,
    navParam: NavParams, private maps: GoogleMaps) {
    this.menuCtrl.enable(false, 'myMenu');
    this.appointment = navParam.get("appointment");
    console.log("appointment", this.appointment);
  }

  ionViewWillLeave() {
    if (this.refLocation) {
      this.refLocation.off();
    }
  }

  checkAndSetLocation(location: MyLocation) {
    console.log('inlocation', location);
    if (this.maps.map) {
      let center = new google.maps.LatLng(Number(location.lat), Number(location.lng));
      let posBonds = new google.maps.LatLngBounds();
      if (this.posMe)
        posBonds.extend(this.posMe);
      posBonds.extend(center);
      if (!this.markerProvider) {
        this.markerProvider = new google.maps.Marker({
          position: center,
          map: this.maps.map,
          title: this.appointment.provider.user.name,
          icon: 'assets/imgs/track_delivery.png'
        });
        this.markerProvider.setClickable(true);
        this.addInfoWindow(this.markerProvider, "<h4>" + this.appointment.provider.user.name + "</h4>");
      }
      else {
        this.markerProvider.setPosition(center);
      }
    }
  }

  ionViewDidLoad(): void {
    if (!this.initialized) {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
        this.initialized = true;
        this.plotMarkers();

        this.plotPolyline(new google.maps.LatLng(Number(this.appointment.provider.latitude), Number(this.appointment.provider.longitude)));

      }).catch(err => {
        console.log(err);
        this.navCtrl.pop();
      });
      mapLoaded.catch(err => {
        console.log(err);
        this.navCtrl.pop();
      });

      const component = this;
      this.refLocation = firebase.database().ref().child("handyman_provider").child(String(this.appointment.provider.user_id));
      this.refLocation.on('value', function (snapshot) {
        var providerLocation = snapshot.val() as MyLocation;
        component.checkAndSetLocation(providerLocation);
        component.plotPolyline(new google.maps.LatLng(Number(providerLocation.lat), Number(providerLocation.lng)));
      });

    }
  }

  plotPolyline(from: google.maps.LatLng) {
    if (!this.lastFrom) {
      this.lastFrom = from;
    } else if (!this.lastFrom.equals(from)) {
      this.lastFrom = from;
      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.maps.map,
        polylineOptions: {
          strokeColor: '#621fd0',
          strokeOpacity: 1.0,
          strokeWeight: 6
        },
        markerOptions: {
          opacity: 0,
          clickable: false,
          position: from
        }
      });
      directionsService.route({
        origin: from,
        destination: new google.maps.LatLng(Number(this.appointment.address.latitude), Number(this.appointment.address.longitude)),
        travelMode: google.maps.TravelMode.DRIVING
      }, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
    }
  }

  plotMarkers() {
    let posBonds = new google.maps.LatLngBounds();
    this.posMe = new google.maps.LatLng(Number(this.appointment.address.latitude), Number(this.appointment.address.longitude));
    posBonds.extend(this.posMe);
    if (!this.markerMe) {
      this.markerMe = new google.maps.Marker({
        position: this.posMe,
        map: this.maps.map,
        title: 'You are here!',
        icon: 'assets/imgs/track_user.png'
      });
      this.markerMe.setClickable(true);
      this.addInfoWindow(this.markerMe, "<h4>You are here!</h4>");
    }
    else {
      this.markerMe.setPosition(this.posMe);
    }

    setTimeout(() => {
      this.maps.map.panTo(posBonds.getCenter());
    }, 200);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.maps.map, marker);
    });

  }

}
