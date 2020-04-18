webpackJsonp([0],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.KEY_USER = "khc_user";
    Constants.KEY_TOKEN = "khc_token";
    Constants.KEY_SETTING = "khc_setting";
    Constants.KEY_LOCATION = "khc_location";
    Constants.KEY_CATEGORY = "khc_category";
    Constants.KEY_NOTIFICATIONS = "khc_notis";
    Constants.KEY_ADDRESS_LIST = "khc_address_list";
    Constants.KEY_FAQS = "khc_faqs";
    Constants.KEY_DEFAULT_LANGUAGE = "khc_dl";
    Constants.KEY_LOCALE = "khc_locale";
    Constants.REF_USERS = "handyman/users";
    Constants.REF_CHAT = "handyman/chats";
    Constants.REF_INBOX = "handyman/inbox";
    Constants.REF_USERS_FCM_IDS = "handyman/user_fcm_ids";
    return Constants;
}());

//# sourceMappingURL=constants.models.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_models__ = __webpack_require__(27);

var Chat = /** @class */ (function () {
    function Chat() {
    }
    Chat.fromMessage = function (msg, isMeSender) {
        var chat = new Chat();
        chat.chatId = isMeSender ? msg.recipientId : msg.senderId;
        chat.myId = isMeSender ? msg.senderId : msg.recipientId;
        chat.chatName = isMeSender ? msg.recipientName : msg.senderName;
        chat.chatImage = isMeSender ? msg.recipientImage : msg.senderImage;
        chat.chatStatus = isMeSender ? msg.recipientStatus : msg.senderStatus;
        chat.dateTimeStamp = msg.dateTimeStamp;
        chat.timeDiff = __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].formatMillisDateTime(Number(chat.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].getLocale());
        chat.lastMessage = msg.body;
        return chat;
    };
    return Chat;
}());

//# sourceMappingURL=chat.models.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooknowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_appointment_request_models__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var BooknowPage = /** @class */ (function () {
    function BooknowPage(navParam, service, loadingCtrl, toastCtrl, app, translate) {
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.translate = translate;
        this.gaming = "nes";
        this.where = "nes";
        this.dates = [];
        this.subscriptions = [];
        this.loadingShown = false;
        this.weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        this.timeRange = [{ time_value: "09:00 - 11:00", time_from: "09:00", time_to: "11:00" },
            { time_value: "11:00 - 13:00", time_from: "11:00", time_to: "13:00" },
            { time_value: "13:00 - 15:00", time_from: "13:00", time_to: "15:00" },
            { time_value: "15:00 - 17:00", time_from: "15:00", time_to: "17:00" },
            { time_value: "17:00 - 19:00", time_from: "17:00", time_to: "19:00" },
            { time_value: "19:00 - 21:00", time_from: "19:00", time_to: "21:00" }];
        this.profile = navParam.get("profile");
        this.address = navParam.get("address");
        this.appointment = navParam.get("appointment");
        this.category = navParam.get("category");
        for (var i = 0; i < 7; i++) {
            var d = new Date();
            d.setDate(d.getDate() + i);
            this.dates.push(d);
        }
        this.markSelected(this.dates[0]);
        this.timeRangeSelected = this.timeRange[0];
        if (this.appointment) {
            this.markSelected(new Date(this.appointment.date));
            var trtc = this.appointment.time_from_formatted + " - " + this.appointment.time_to_formatted;
            for (var _i = 0, _a = this.timeRange; _i < _a.length; _i++) {
                var tr = _a[_i];
                if (tr.time_value == trtc) {
                    this.timeRangeSelected = tr;
                    break;
                }
            }
        }
    }
    BooknowPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    BooknowPage.prototype.compareFn = function (tr1, tr2) {
        return tr1 && tr2 ? tr1.time_value == tr2.time_value : tr1 === tr2;
    };
    BooknowPage.prototype.markSelected = function (date) {
        this.dateSelected = date;
    };
    BooknowPage.prototype.proceed = function () {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_7_moment___default()((__WEBPACK_IMPORTED_MODULE_7_moment___default()(this.dateSelected).format("YYYY-MM-DD") + " " + this.timeRangeSelected.time_from + ":00")) > __WEBPACK_IMPORTED_MODULE_7_moment___default()()) {
            if (this.appointment) {
                this.updateAppointment();
            }
            else {
                this.createAppointment();
            }
        }
        else {
            this.translate.get("err_time_passed").subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    BooknowPage.prototype.updateAppointment = function () {
        var _this = this;
        this.translate.get("appointment_updating").subscribe(function (value) {
            _this.presentLoading(value);
        });
        var car = new __WEBPACK_IMPORTED_MODULE_4__models_appointment_request_models__["a" /* AppointmentRequest */]();
        car.time_from = this.timeRangeSelected.time_from;
        car.time_to = this.timeRangeSelected.time_to;
        car.date = __WEBPACK_IMPORTED_MODULE_7_moment___default()(this.dateSelected).format("YYYY-MM-DD");
        var subscription = this.service.appointmentUpdate(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.appointment.id, car).subscribe(function (res) {
            _this.dismissLoading();
            _this.translate.get("appointment_updating_success").subscribe(function (value) {
                _this.showToast(value);
            });
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            _this.translate.get("appointment_updating_fail").subscribe(function (value) {
                _this.showToast(value);
            });
            _this.dismissLoading();
            console.log('update', err);
        });
        this.subscriptions.push(subscription);
    };
    BooknowPage.prototype.createAppointment = function () {
        var _this = this;
        this.translate.get("appointment_creating").subscribe(function (value) {
            _this.presentLoading(value);
            var car = new __WEBPACK_IMPORTED_MODULE_4__models_appointment_request_models__["a" /* AppointmentRequest */]();
            car.address_id = _this.address.id;
            car.provider_id = Number(_this.profile.id);
            car.category_id = _this.category.id;
            car.time_from = _this.timeRangeSelected.time_from;
            car.time_to = _this.timeRangeSelected.time_to;
            car.notes = _this.notes;
            car.date = __WEBPACK_IMPORTED_MODULE_7_moment___default()(_this.dateSelected).format("YYYY-MM-DD");
            _this.subscriptions.push(_this.service.createAppointment(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), car).subscribe(function (res) {
                _this.dismissLoading();
                _this.translate.get("appointment_creating_success").subscribe(function (value) {
                    _this.showToast(value);
                });
                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
            }, function (err) {
                _this.translate.get("appointment_creating_fail").subscribe(function (value) {
                    _this.showToast(value);
                });
                _this.dismissLoading();
                console.log('book', err);
            }));
        });
    };
    BooknowPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    BooknowPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    BooknowPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    BooknowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-booknow',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\booknow\booknow.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'book_now\' | translate}}\n\n            <!--\n\n            <span (click)="proceed()">\n\n                <ion-icon name="md-checkmark"></ion-icon>\n\n            </span>\n\n-->\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list *ngIf="!appointment && profile" class="profile bg-thime">\n\n        <ion-item class=" bg-thime">\n\n            <ion-avatar item-start>\n\n                <img *ngIf="profile && profile.user.image_url" data-src="{{profile.user.image_url}}">\n\n                <img *ngIf="!profile || !profile.user.image_url" src="assets/imgs/empty_dp.png">\n\n            </ion-avatar>\n\n            <h2 class="text-white">\n\n                {{profile.user.name}}\n\n                <span> | {{profile.primary_category.title}}</span>\n\n            </h2>\n\n            <h2 class="text-white">\n\n                <span>{{category.title}}</span>\n\n            </h2>\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-scroll scrollX="true" style="height: 120px;; white-space: nowrap;" class=" bg-thime">\n\n        <div *ngFor="let d of dates" [ngClass]="(dateSelected == d) ? \'select-date active\' : \'select-date\'"\n\n            (click)="markSelected(d)">\n\n            <p text-center>{{ weekDays[d.getDay()] | translate }}</p>\n\n            <h2 text-center>{{ d.getDate()}}</h2>\n\n        </div>\n\n    </ion-scroll>\n\n\n\n    <div class="form">\n\n        <ion-list no-lines>\n\n            <ion-item class="select-box">\n\n                <ion-label class="text-thime">{{\'when\' | translate}}</ion-label>\n\n                <ion-select [(ngModel)]="timeRangeSelected" [compareWith]="compareFn" [okText]="\'okay\' | translate"\n\n                    [cancelText]="\'cancel\' | translate">\n\n                    <ion-option *ngFor="let tr of timeRange" [value]="tr">{{tr.time_value}}</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item *ngIf="!appointment && address">\n\n                <ion-label class="text-grey" floating>{{\'address_title\' | translate}}</ion-label>\n\n                <ion-input type="text" [readonly]="true" [(ngModel)]="address.title"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="!appointment && address">\n\n                <ion-label class="text-grey" floating>{{\'full_address\' | translate}}</ion-label>\n\n                <ion-input type="text" [readonly]="true" [(ngModel)]="address.address"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="!appointment">\n\n                <ion-label class="text-grey" floating>{{\'appointment_notes\' | translate}}</ion-label>\n\n                <ion-input type="text" [(ngModel)]="notes"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <button class="btn" ion-button round full margin-top (click)="proceed()">{{\'confirm\' | translate}}</button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\booknow\booknow.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], BooknowPage);
    return BooknowPage;
}());

//# sourceMappingURL=booknow.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectareaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_address_title_add_address_title__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_address_models__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_address_create_request_models__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_client_service__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var SelectareaPage = /** @class */ (function () {
    function SelectareaPage(navCtrl, menuCtrl, loadingCtrl, modalCtrl, navparam, service, zone, maps, translate, geolocation, toastCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.zone = zone;
        this.maps = maps;
        this.translate = translate;
        this.geolocation = geolocation;
        this.toastCtrl = toastCtrl;
        this.query = '';
        this.places = [];
        this.ignoreClick = false;
        this.modalPresented = false;
        this.forsearch = false;
        this.subscriptions = [];
        this.loadingShown = false;
        this.menuCtrl.enable(false, 'myMenu');
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.address = navparam.get("address");
        this.forsearch = navparam.get("forsearch");
    }
    SelectareaPage.prototype.ionViewWillLeave = function () {
        if (this.addressSaveModal)
            this.addressSaveModal.dismiss();
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    SelectareaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (!this.initialized) {
            var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
                _this.autocompleteService = new google.maps.places.AutocompleteService();
                _this.placesService = new google.maps.places.PlacesService(_this.maps.map);
                _this.searchDisabled = false;
                _this.maps.map.addListener('click', function (event) {
                    if (event && event.latLng) {
                        _this.onMapClick(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
                    }
                });
                _this.initialized = true;
                if (_this.address) {
                    _this.onMapClick(new google.maps.LatLng(Number(_this.address.latitude), Number(_this.address.longitude)));
                }
                else {
                    _this.detect();
                }
            }).catch(function (err) {
                console.log(err);
                _this.close();
            });
            mapLoaded.catch(function (err) {
                console.log(err);
                _this.close();
            });
        }
    };
    SelectareaPage.prototype.onMapClick = function (pos) {
        var _this = this;
        if (pos && !this.ignoreClick) {
            if (!this.marker) {
                this.marker = new google.maps.Marker({ position: pos, map: this.maps.map });
                this.marker.setClickable(true);
                this.marker.addListener('click', function (event) {
                    console.log("markerevent", event);
                    _this.showToast(_this.location.name);
                });
            }
            else {
                this.marker.setPosition(pos);
            }
            this.maps.map.panTo(pos);
            var geocoder = new google.maps.Geocoder();
            var request = { location: pos };
            geocoder.geocode(request, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    _this.saveDisabled = false;
                    _this.location = new __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__["a" /* MyLocation */]();
                    _this.location.name = results[0].formatted_address;
                    _this.location.lat = String(pos.lat());
                    _this.location.lng = String(pos.lng());
                    _this.showToast(_this.location.name);
                }
            });
        }
    };
    SelectareaPage.prototype.selectPlace = function (place) {
        var _this = this;
        this.query = place.description;
        this.ignoreClick = true;
        setTimeout(function () {
            _this.ignoreClick = false;
            console.log(_this.query);
        }, 2000);
        this.places = [];
        var myLocation = new __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__["a" /* MyLocation */]();
        myLocation.name = place.name;
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            _this.zone.run(function () {
                myLocation.name = (details.formatted_address && details.formatted_address.length) ? details.formatted_address : details.name;
                myLocation.lat = details.geometry.location.lat();
                myLocation.lng = details.geometry.location.lng();
                _this.saveDisabled = false;
                var lc = { lat: myLocation.lat, lng: myLocation.lng };
                _this.maps.map.setCenter(lc);
                _this.location = myLocation;
                var pos = new google.maps.LatLng(Number(lc.lat), Number(lc.lng));
                if (!_this.marker)
                    _this.marker = new google.maps.Marker({ position: pos, map: _this.maps.map });
                else
                    _this.marker.setPosition(pos);
                _this.maps.map.panTo(pos);
            });
        });
    };
    SelectareaPage.prototype.searchPlace = function () {
        var _this = this;
        this.saveDisabled = true;
        if (this.query.length > 0 && !this.searchDisabled) {
            var config = {
                //types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    SelectareaPage.prototype.detect = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.onMapClick(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }).catch(function (err) {
            console.log("getCurrentPosition", err);
            _this.showToast("Location detection failed");
        });
    };
    SelectareaPage.prototype.save = function () {
        var _this = this;
        if (this.location) {
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION, JSON.stringify(this.location));
            if (this.forsearch) {
                this.close();
            }
            else {
                if (!this.address) {
                    this.address = new __WEBPACK_IMPORTED_MODULE_7__models_address_models__["a" /* Address */]();
                    this.address.id = -1;
                }
                this.address.latitude = this.location.lat;
                this.address.longitude = this.location.lng;
                this.address.address = this.location.name;
                this.addressSaveModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__add_address_title_add_address_title__["a" /* Add_address_titlePage */], { address: this.address });
                this.addressSaveModal.present();
                this.addressSaveModal.onDidDismiss(function (data) {
                    _this.modalPresented = false;
                    _this.address = data;
                    _this.saveAddress();
                });
                this.modalPresented = true;
            }
        }
    };
    SelectareaPage.prototype.saveAddress = function () {
        var _this = this;
        if (!this.address.title || !this.address.title.length) {
            this.translate.get("err_address_title").subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.address || !this.address.address.length) {
            this.translate.get("err_address_full").subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.latitude || !this.address.longitude) {
            this.translate.get("err_address_coordinates").subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            var addressRequest = new __WEBPACK_IMPORTED_MODULE_8__models_address_create_request_models__["a" /* AddressCreateRequest */]();
            addressRequest.title = this.address.title;
            addressRequest.address = this.address.address;
            addressRequest.lat = this.address.latitude;
            addressRequest.lng = this.address.longitude;
            addressRequest.latitude = this.address.latitude;
            addressRequest.longitude = this.address.longitude;
            if (this.address.id == -1) {
                this.createAddress(addressRequest);
            }
            else {
                this.updateAddress(addressRequest);
            }
        }
    };
    SelectareaPage.prototype.createAddress = function (addressRequest) {
        var _this = this;
        this.translate.get("address_creating").subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.addAddress(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), addressRequest).subscribe(function (res) {
            _this.dismissLoading();
            var addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST));
            if (!addresses)
                addresses = new Array();
            addresses.push(res);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST, JSON.stringify(addresses));
            _this.navCtrl.pop();
        }, function (err) {
            _this.dismissLoading();
            console.log('address_add_err', err);
        });
        this.subscriptions.push(subscription);
    };
    SelectareaPage.prototype.updateAddress = function (addressRequest) {
        var _this = this;
        this.translate.get("address_updating").subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.updateAddress(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.address.id, addressRequest).subscribe(function (res) {
            _this.dismissLoading();
            var addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST));
            if (!addresses)
                addresses = new Array();
            var index = -1;
            for (var i = 0; i < addresses.length; i++) {
                if (addresses[i].id == res.id) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                addresses.splice(index, 1);
            }
            addresses.unshift(res);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST, JSON.stringify(addresses));
            _this.navCtrl.pop();
        }, function (err) {
            _this.dismissLoading();
            console.log('address_update_err', err);
        });
        this.subscriptions.push(subscription);
    };
    SelectareaPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    SelectareaPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SelectareaPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SelectareaPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], SelectareaPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], SelectareaPage.prototype, "pleaseConnect", void 0);
    SelectareaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-selectarea',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\selectarea\selectarea.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n\n		<ion-title>\n\n			<span (click)="close()">{{\'cancel\' | translate}}</span>\n\n			<button [disabled]="modalPresented" ion-button class="end" (click)="save()">\n\n				{{\'continue\' | translate}}\n\n			</button>\n\n		</ion-title>\n\n	</ion-navbar>\n\n\n\n	<ion-toolbar>\n\n		<ion-row>\n\n			<ion-col col-11>\n\n				<ion-searchbar [(ngModel)]="query" (ionInput)="searchPlace()"\n\n					placeholder="{{\'search_location\' | translate}}"></ion-searchbar>\n\n			</ion-col>\n\n			<ion-col col-1>\n\n				<ion-icon name="md-locate" (click)="detect()"></ion-icon>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-toolbar>\n\n\n\n\n\n	<ion-list>\n\n		<ion-item *ngFor="let place of places" (click)="selectPlace(place)">{{place.description}}</ion-item>\n\n	</ion-list>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n	<div #pleaseConnect id="please-connect">\n\n		<p>{{\'please_connect_to_the_internet\' | translate}}</p>\n\n	</div>\n\n	<div #map id="map">\n\n		<ion-spinner></ion-spinner>\n\n	</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\selectarea\selectarea.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_10__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* MenuController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_10__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__["a" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* ToastController */]])
    ], SelectareaPage);
    return SelectareaPage;
}());

//# sourceMappingURL=selectarea.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMaps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connectivity_service__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var GoogleMaps = /** @class */ (function () {
    function GoogleMaps(config, connectivityService) {
        this.config = config;
        this.connectivityService = connectivityService;
        this.mapInitialised = false;
    }
    GoogleMaps.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function () {
                            resolve(true);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.config.googleApiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.config.googleApiKey + '&callback=mapInit&libraries=places';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
                resolve(true);
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            var latLng = new google.maps.LatLng(39.9334, 32.8597);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControlOptions: { mapTypeIds: [] }
            };
            _this.map = new google.maps.Map(_this.mapElement, mapOptions);
            resolve(true);
        });
    };
    GoogleMaps.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            _this.disableMap();
        });
    };
    GoogleMaps = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__connectivity_service__["a" /* Connectivity */]])
    ], GoogleMaps);
    return GoogleMaps;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListofplumberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plumberprofile_plumberprofile__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ListofplumberPage = /** @class */ (function () {
    function ListofplumberPage(navCtrl, params, service, loadingCtrl, toastCtrl, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.isLoading = false;
        this.doneAll = false;
        this.pageNo = 1;
        this.subscriptions = [];
        this.providers = [];
        this.category = params.get("cat");
        this.currency = __WEBPACK_IMPORTED_MODULE_5__models_helper_models__["a" /* Helper */].getSetting("currency");
        if (this.category && this.category.id) {
            this.selectedLocation = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION));
            this.translate.get('loading_providers').subscribe(function (value) {
                _this.presentLoading(value);
            });
            this.getProviders();
        }
    }
    ListofplumberPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ListofplumberPage.prototype.getProviders = function () {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.providers(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), String(this.category.id), this.selectedLocation.lat, this.selectedLocation.lng, String(this.pageNo)).subscribe(function (res) {
            _this.isLoading = false;
            _this.dismissLoading();
            _this.doneAll = (!res.data || !res.data.length);
            _this.providers = _this.providers.concat(res.data);
            if (_this.infiniteScroll) {
                _this.infiniteScroll.complete();
            }
        }, function (err) {
            _this.isLoading = false;
            _this.dismissLoading();
            if (_this.infiniteScroll) {
                _this.infiniteScroll.complete();
            }
            console.log('prov_list_err', err);
        });
        this.subscriptions.push(subscription);
    };
    ListofplumberPage.prototype.doInfinite = function (infiniteScroll) {
        if (this.doneAll) {
            infiniteScroll.complete();
        }
        else {
            this.infiniteScroll = infiniteScroll;
            this.pageNo = this.pageNo + 1;
            this.getProviders();
        }
    };
    ListofplumberPage.prototype.profileDetail = function (proProf) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__plumberprofile_plumberprofile__["a" /* PlumberprofilePage */], { profile: proProf, category: this.category });
    };
    ListofplumberPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ListofplumberPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ListofplumberPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ListofplumberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-listofplumber',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\listofplumber\listofplumber.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{category.title}}\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content *ngIf="providers" class="bg-light">\n\n    <div class="empty-view" *ngIf="!isLoading && (!providers || !providers.length)">\n\n        <div style="text-align:center">\n\n            <img src="assets/imgs/empty_provider.png" alt="no offers" />\n\n            <span style="color:#9E9E9E; font-weight:bold;">\n\n                {{\'empty_providers\' | translate}}\n\n            </span>\n\n        </div>\n\n    </div>\n\n    <ion-list no-lines>\n\n        <ion-item *ngFor="let profile of providers"\n\n            [ngClass]="profile.advertisement && profile.advertisement==1 ? \'active\' : \'\'"\n\n            (click)="profileDetail(profile)">\n\n            <ion-avatar item-start>\n\n                <img *ngIf="profile && profile.user.image_url" data-src="{{profile.user.image_url}}">\n\n                <img *ngIf="!profile || !profile.user.image_url" src="assets/imgs/empty_dp.png">\n\n            </ion-avatar>\n\n            <h2>\n\n                <span class="text-ellipsis">\n\n                    {{profile.user.name}}\n\n                </span>\n\n                <ion-icon *ngIf="profile.is_verified == 1" name="checkmark-circle"></ion-icon>\n\n                <span class="text-grey small">\n\n                    | {{profile.primary_category.title}}\n\n                </span>\n\n                <span class="ml-auto small text-green">{{profile.ratings}}\n\n                    <ion-icon name="md-star"></ion-icon>\n\n                    <small class="text-grey">({{profile.ratingscount}})</small>\n\n                </span>\n\n            </h2>\n\n            <p class="text-grey">\n\n                <span class="text-ellipsis">\n\n                    {{profile.priceToShow}} / {{profile.price_type | translate}}\n\n                </span>\n\n                <span class="ml-auto text-ellipsis">{{profile.distance}} {{\'k_away\' | translate}}</span></p>\n\n            <div class="ad">\n\n                <p>{{\'ad\' | translate}}</p>\n\n            </div>\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\listofplumber\listofplumber.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], ListofplumberPage);
    return ListofplumberPage;
}());

//# sourceMappingURL=listofplumber.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OtpPage = /** @class */ (function () {
    function OtpPage(params, navCtrl, platform, alertCtrl, loadingCtrl, app, translate, toastCtrl, clientService, events) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.clientService = clientService;
        this.events = events;
        this.loadingShown = false;
        this.captchanotvarified = true;
        this.buttonDisabled = true;
        this.otp = '';
        this.captchaVerified = false;
        this.minutes = 0;
        this.seconds = 0;
        this.totalSeconds = 0;
        this.intervalCalled = false;
        this.resendCode = false;
        this.otpNotSent = true;
        this.phoneNumberFull = params.get('phoneNumberFull');
    }
    OtpPage.prototype.ionViewDidEnter = function () {
        if (!(this.platform.is('cordova'))) {
            this.makeCaptcha();
        }
        this.sendOTP();
    };
    OtpPage.prototype.loginUser = function (token) {
        var _this = this;
        this.translate.get('just_moment').subscribe(function (value) {
            _this.presentLoading(value);
        });
        this.clientService.login({ token: token, role: "customer" }).subscribe(function (res) {
            _this.dismissLoading();
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_USER, JSON.stringify(res.user));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN, res.token);
            _this.events.publish('user:login', res.user);
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            console.log(err);
            _this.dismissLoading();
            _this.presentErrorAlert((err && err.error && err.error.message && String(err.error.message).toLowerCase().includes("role")) ? "User exists with different role" : "Something went wrong");
        });
    };
    OtpPage.prototype.getUserToken = function (user) {
        var _this = this;
        user.getIdToken(false).then(function (res) {
            console.log('user_token_success', res);
            _this.loginUser(res);
        }).catch(function (err) {
            console.log('user_token_failure', err);
        });
    };
    OtpPage.prototype.sendOTP = function () {
        this.resendCode = false;
        this.otpNotSent = true;
        if (this.platform.is('cordova')) {
            this.sendOtpPhone(this.phoneNumberFull);
        }
        else {
            this.sendOtpBrowser(this.phoneNumberFull);
        }
        if (this.intervalCalled) {
            clearInterval(this.timer);
        }
    };
    OtpPage.prototype.createTimer = function () {
        this.intervalCalled = true;
        this.totalSeconds--;
        if (this.totalSeconds == 0) {
            this.otpNotSent = true;
            this.resendCode = true;
            clearInterval(this.timer);
        }
        else {
            this.seconds = (this.totalSeconds % 60);
            if (this.totalSeconds >= this.seconds) {
                this.minutes = (this.totalSeconds - this.seconds) / 60;
            }
            else {
                this.minutes = 0;
            }
        }
    };
    OtpPage.prototype.createInterval = function () {
        var _this = this;
        this.totalSeconds = 120;
        this.createTimer();
        this.timer = setInterval(function () {
            _this.createTimer();
        }, 1000);
    };
    OtpPage.prototype.sendOtpPhone = function (phone) {
        var _this = this;
        this.translate.get('sending_otp').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var component = this;
        window.FirebasePlugin.verifyPhoneNumber(phone, 60, function (credential) {
            console.log("verifyPhoneNumber", JSON.stringify(credential));
            component.verfificationId = credential.verificationId ? credential.verificationId : credential;
            // if instant verification is true use the code that we received from the firebase endpoint, otherwise ask user to input verificationCode:
            //var code = credential.instantVerification ? credential.code : inputField.value.toString();
            if (component.verfificationId) {
                if (credential.instantVerification && credential.code) {
                    component.otp = credential.code;
                    component.showToast("Verified automatically");
                    component.verifyOtpPhone();
                }
                else {
                    component.translate.get("sending_otp_success").subscribe(function (value) {
                        component.showToast(value);
                    });
                    component.otpNotSent = false;
                    component.createInterval();
                }
            }
            component.dismissLoading();
        }, function (error) {
            console.log("otp_send_fail", error);
            component.otpNotSent = true;
            component.resendCode = true;
            component.dismissLoading();
            component.translate.get('otp_send_fail').subscribe(function (value) {
                component.showToast(value);
            });
        });
    };
    OtpPage.prototype.sendOtpBrowser = function (phone) {
        var component = this;
        this.dismissLoading();
        this.presentLoading("Sending otp");
        __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().signInWithPhoneNumber(phone, this.recaptchaVerifier).then(function (confirmationResult) {
            console.log("otp_send_success", confirmationResult);
            component.otpNotSent = false;
            component.result = confirmationResult;
            component.dismissLoading();
            component.showToast("OTP Sent");
            if (component.intervalCalled) {
                clearInterval(component.timer);
            }
            component.createInterval();
        }).catch(function (error) {
            console.log("otp_send_fail", error);
            component.resendCode = true;
            component.dismissLoading();
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.showToast("OTP Sending failed");
            }
        });
    };
    OtpPage.prototype.verify = function () {
        this.otpNotSent = true;
        if (this.platform.is('cordova')) {
            this.verifyOtpPhone();
        }
        else {
            this.verifyOtpBrowser();
        }
    };
    OtpPage.prototype.verifyOtpPhone = function () {
        var _this = this;
        var credential = __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"].PhoneAuthProvider.credential(this.verfificationId, this.otp);
        this.translate.get('verifying_otp').subscribe(function (value) {
            _this.presentLoading(value);
        });
        __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().signInAndRetrieveDataWithCredential(credential).then(function (info) {
            console.log('otp_verify_success', info);
            _this.dismissLoading();
            _this.translate.get('verifying_otp_success').subscribe(function (value) {
                _this.showToast(value);
            });
            _this.getUserToken(info.user);
        }, function (error) {
            console.log('otp_verify_fail', error);
            _this.translate.get('verifying_otp_fail').subscribe(function (value) {
                _this.showToast(value);
            });
            _this.dismissLoading();
        });
    };
    OtpPage.prototype.verifyOtpBrowser = function () {
        var component = this;
        this.presentLoading("Verifying otp");
        this.result.confirm(this.otp).then(function (response) {
            console.log('otp_verify_success', response);
            component.dismissLoading();
            component.showToast("OTP Verified");
            component.getUserToken(response.user);
        }).catch(function (error) {
            console.log('otp_verify_fail', error);
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.showToast("OTP Verification failed");
            }
            component.dismissLoading();
        });
    };
    OtpPage.prototype.makeCaptcha = function () {
        var component = this;
        this.recaptchaVerifier = new __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"].RecaptchaVerifier('recaptcha-container', {
            // 'size': 'normal',
            'size': 'invisible',
            'callback': function (response) {
                component.captchanotvarified = true;
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
        this.recaptchaVerifier.render();
    };
    OtpPage.prototype.tabs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
    };
    OtpPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    OtpPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    OtpPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    OtpPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(["error", "dismiss"]).subscribe(function (value) {
            var alert = _this.alertCtrl.create({
                title: value["error"],
                subTitle: msg,
                buttons: [value["dismiss"]]
            });
            alert.present();
        });
    };
    OtpPage.prototype.makeExitAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'App termination',
            message: 'Do you want to close the app?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Application exit prevented!');
                    }
                }, {
                    text: 'Close App',
                    handler: function () {
                        _this.platform.exitApp(); // Close this application
                    }
                }]
        });
        alert.present();
    };
    OtpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-otp',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\otp\otp.html"*/'<ion-header class="bg-transparent">\n\n    <ion-navbar>\n\n        <ion-title><span>{{"otp_verification" | translate}}</span></ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div id="recaptcha-container"></div>\n\n    <h1 text-center>{{\'verification_code\' | translate}}<small>{{\'please_type_the_verification_code\' | translate}} <br>\n\n            {{\'sent_to\' | translate}} {{phoneNumberFull}}</small></h1>\n\n\n\n    <div class="form">\n\n        <ion-input type="number" placeholder="{{\'enter_otp\' | translate}}" [(ngModel)]="otp"></ion-input>\n\n        <button ion-button round full class="btn" (click)="verify()">{{"confirm" | translate}}</button>\n\n        <p text-center>\n\n            {{\'dint_received_code\' | translate}}\n\n            <strong (click)="sendOTP()">\n\n                {{\'resend_now\' | translate}}\n\n            </strong>\n\n        </p>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\otp\otp.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], OtpPage);
    return OtpPage;
}());

//# sourceMappingURL=otp.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var PrivacyPage = /** @class */ (function () {
    function PrivacyPage(config, navParam) {
        this.config = config;
        this.toShow = "";
        this.heading = "";
        this.toShow = navParam.get("toShow");
        this.heading = navParam.get("heading");
    }
    PrivacyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-privacy',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\privacy\privacy.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            {{heading}}\n        </ion-title>\n    </ion-navbar>\n    <div class="logo-box bg-thime">\n        <div class="logo">\n            <img src="assets/imgs/logo.png">\n            <!-- <h1 class="text-white">{{config.appName}}</h1> -->\n        </div>\n    </div>\n</ion-header>s\n\n<ion-content>\n    <div class="text">\n        <!-- <h2 class="text-thime">{{\'our_privacy_policy\' | translate}}</h2> -->\n        <div [innerHTML]="toShow"></div>\n    </div>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\privacy\privacy.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], PrivacyPage);
    return PrivacyPage;
}());

//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_helper_models__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var ClientService = /** @class */ (function () {
    function ClientService(config, http) {
        this.config = config;
        this.http = http;
    }
    ClientService.prototype.getCountries = function () {
        return this.http.get('./assets/json/countries.json').concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.getSettings = function () {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/settings", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.forgetPassword = function (resetRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/forgot-password", JSON.stringify(resetRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.login = function (loginTokenRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/login", JSON.stringify(loginTokenRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.loginSocial = function (socialLoginRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/social/login", socialLoginRequest, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.signUp = function (signUpRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/register", JSON.stringify(signUpRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.verifyMobile = function (verifyRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/verify-mobile", JSON.stringify(verifyRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.checkUser = function (checkUserRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/check-user", JSON.stringify(checkUserRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.categoryParent = function (token) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/category", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.categoryChildren = function (token, parentId) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/category?category_id=" + parentId, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.providerByUserId = function (token, userId) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/customer/users/provider/" + userId, { headers: myHeaders }).concatMap(function (p) {
            var currency = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getSetting("currency");
            p.priceToShow = currency + " " + p.price;
            if (!p.distance)
                p.distance = "-1";
            if (Number(p.distance) > -1)
                p.distance = (Number(p.distance) / 1000).toFixed(2);
            p.ratings = Number(p.ratings).toFixed(2);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(p);
        });
    };
    ClientService.prototype.providers = function (token, catId, lat, lang, pageNo) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/customer/providers?category=" + catId + "&lat=" + lat + "&long=" + lang + "&page=" + pageNo, { headers: myHeaders }).concatMap(function (data) {
            var currency = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getSetting("currency");
            for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                var p = _a[_i];
                p.priceToShow = currency + " " + p.price;
                if (!p.distance)
                    p.distance = "-1";
                if (Number(p.distance) > -1)
                    p.distance = (Number(p.distance) / 1000).toFixed(2);
                p.ratings = Number(p.ratings).toFixed(2);
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.categorySearch = function (token, query) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/category?search=" + query, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.submitSupport = function (token, supportRequest) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/support", supportRequest, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.createAppointment = function (token, appointmentRequest) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/customer/appointment", appointmentRequest, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.addresses = function (token) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/customer/address", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.addAddress = function (token, addressRequest) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/customer/address", addressRequest, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.deleteAddress = function (token, addressId) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.delete(this.config.apiBase + "api/customer/address/" + addressId, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.updateAddress = function (token, addressId, addressRequest) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.put(this.config.apiBase + "api/customer/address/" + addressId + "/update", addressRequest, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.updateUser = function (token, requestBody) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.put(this.config.apiBase + "api/user", requestBody, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.logActivity = function (token) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + 'api/activity-log', {}, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.providerReviews = function (token, profileId) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/customer/providers/" + profileId + "/ratings", { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                var review = _a[_i];
                review.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDate(review.created_at, locale);
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.providerPortfolio = function (token, profileId) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/customer/providers/" + profileId + "/portfolios", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.appointments = function (token, pageNo) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/customer/appointment?page=" + pageNo, { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            var currency = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getSetting("currency");
            for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                var ap = _a[_i];
                ap.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(ap.created_at, locale);
                ap.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(ap.updated_at, locale);
                for (var _b = 0, _c = ap.logs; _b < _c.length; _b++) {
                    var log = _c[_b];
                    log.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(log.updated_at, locale);
                    log.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(log.created_at, locale);
                }
                ap.date_formatted = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDate(ap.date, locale);
                ap.time_from_formatted = ap.time_from.substr(0, ap.time_from.lastIndexOf(":"));
                ap.time_to_formatted = ap.time_to.substr(0, ap.time_to.lastIndexOf(":"));
                ap.provider.priceToShow = currency + " " + ap.provider.price;
                if (!ap.provider.distance)
                    ap.provider.distance = "-1";
                if (Number(ap.provider.distance) > -1)
                    ap.provider.distance = (Number(ap.provider.distance) / 1000).toFixed(2);
                ap.provider.ratings = Number(ap.provider.ratings).toFixed(2);
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.appointmentCancel = function (token, apId) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/customer/appointment/" + apId + '/cancel', {}, { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            var currency = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getSetting("currency");
            data.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(data.updated_at, locale);
            data.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(data.created_at, locale);
            for (var _i = 0, _a = data.logs; _i < _a.length; _i++) {
                var log = _a[_i];
                log.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(log.updated_at, locale);
                log.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(log.created_at, locale);
            }
            data.provider.priceToShow = currency + " " + data.provider.price;
            if (!data.provider.distance)
                data.provider.distance = "-1";
            if (Number(data.provider.distance) > -1)
                data.provider.distance = (Number(data.provider.distance) / 1000).toFixed(2);
            data.provider.ratings = Number(data.provider.ratings).toFixed(2);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.appointmentUpdate = function (token, apId, updateRequest) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.put(this.config.apiBase + "api/provider/appointment/" + apId, JSON.stringify(updateRequest), { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            var currency = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getSetting("currency");
            data.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(data.updated_at, locale);
            data.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(data.created_at, locale);
            for (var _i = 0, _a = data.logs; _i < _a.length; _i++) {
                var log = _a[_i];
                log.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(log.updated_at, locale);
                log.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampTime(log.created_at, locale);
            }
            data.provider.priceToShow = currency + " " + data.provider.price;
            if (!data.provider.distance)
                data.provider.distance = "-1";
            if (Number(data.provider.distance) > -1)
                data.provider.distance = (Number(data.provider.distance) / 1000).toFixed(2);
            data.provider.ratings = Number(data.provider.ratings).toFixed(2);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.rateProvider = function (token, pId, rateRequest) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/customer/providers/" + pId + "/ratings", JSON.stringify(rateRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.faqs = function () {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.get(this.config.apiBase + 'api/faq-help', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.postNotification = function (token, roleTo, userIdTo) {
        var myHeaders = (token && token.length) ? new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + 'api/user/push-notification', { role: roleTo, user_id: userIdTo }, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ClientService);
    return ClientService;
}());

//# sourceMappingURL=client.service.js.map

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 165;

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);


var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.getChatChild = function (userId, myId) {
        //example: userId="9" and myId="5" -->> chat child = "5-9"
        var values = [userId, myId];
        values.sort(function (one, two) { return (one > two ? -1 : 1); });
        return values[0] + "-" + values[1];
    };
    Helper.getLocale = function () {
        var sl = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants_models__["a" /* Constants */].KEY_LOCALE);
        return sl && sl.length ? sl : "en";
    };
    Helper.formatMillisDateTime = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("ddd, MMM D, HH:mm");
    };
    Helper.formatTimestampDateTime = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("ddd, MMM D, HH:mm");
    };
    Helper.formatMillisDate = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("DD MMM YYYY");
    };
    Helper.formatTimestampDate = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("DD MMM YYYY");
    };
    Helper.formatMillisTime = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("HH:mm");
    };
    Helper.formatTimestampTime = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("HH:mm");
    };
    Helper.getSetting = function (settingKey) {
        var settings = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants_models__["a" /* Constants */].KEY_SETTING));
        var toReturn;
        if (settings) {
            for (var _i = 0, settings_1 = settings; _i < settings_1.length; _i++) {
                var s = settings_1[_i];
                if (s.key == settingKey) {
                    toReturn = s.value;
                    break;
                }
            }
        }
        if (!toReturn)
            toReturn = "";
        return toReturn;
    };
    Helper.getLogTimeForStatus = function (status, logs) {
        var toReturn = "";
        if (status && logs) {
            for (var _i = 0, logs_1 = logs; _i < logs_1.length; _i++) {
                var log = logs_1[_i];
                if (log.status == status) {
                    toReturn = log.created_at;
                    break;
                }
            }
        }
        return toReturn;
    };
    Helper.isValidURL = function (string) {
        if (!string)
            return false;
        if (!(string.startsWith("http://") || string.startsWith("https://")))
            return false;
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return res != null;
    };
    return Helper;
}());

//# sourceMappingURL=helper.models.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_booking__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signin_signin__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RequestsPage = /** @class */ (function () {
    function RequestsPage(navCtrl, service, loadingCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.requests = "pending";
        this.loadingShown = false;
        this.pageNo = 1;
        this.allDone = false;
        this.subscriptions = [];
        this.toShow = [];
        this.upcoming = [];
        this.complete = [];
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_USER));
        if (this.userMe) {
            this.loadRequests();
            this.currency = __WEBPACK_IMPORTED_MODULE_5__models_helper_models__["a" /* Helper */].getSetting("currency");
            events.subscribe("refresh:appointments", function () {
                _this.pageNo = 1;
                _this.upcoming = new Array();
                _this.complete = new Array();
                _this.loadRequests();
            });
        }
    }
    RequestsPage.prototype.loginPage = function () {
        if (!this.userMe)
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signin_signin__["a" /* SigninPage */]);
    };
    RequestsPage.prototype.onSegmentChange = function () {
        var _this = this;
        setTimeout(function () {
            _this.toShow = _this.requests == "pending" ? _this.upcoming : _this.complete;
        }, 100);
    };
    RequestsPage.prototype.doRefresh = function (refresher) {
        if (this.isLoading)
            refresher.complete();
        this.refresher = refresher;
        this.pageNo = 1;
        this.upcoming = new Array();
        this.complete = new Array();
        this.loadRequests();
    };
    RequestsPage.prototype.loadRequests = function () {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.appointments(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.pageNo).subscribe(function (res) {
            var appointments = res.data;
            _this.allDone = (!appointments || !appointments.length);
            _this.dismissLoading();
            var upcoming = new Array();
            var complete = new Array();
            for (var _i = 0, appointments_1 = appointments; _i < appointments_1.length; _i++) {
                var ap = appointments_1[_i];
                if (ap.status == 'complete' || ap.status == 'rejected' || ap.status == 'cancelled')
                    complete.push(ap);
                else
                    upcoming.push(ap);
            }
            if (upcoming.length || complete.length) {
                _this.upcoming = _this.upcoming.concat(upcoming);
                _this.complete = _this.complete.concat(complete);
                _this.onSegmentChange();
            }
            if (_this.infiniteScroll)
                _this.infiniteScroll.complete();
            if (_this.refresher)
                _this.refresher.complete();
        }, function (err) {
            console.log('appointments', err);
            _this.dismissLoading();
            if (_this.infiniteScroll)
                _this.infiniteScroll.complete();
            if (_this.refresher)
                _this.refresher.complete();
        });
        this.subscriptions.push(subscription);
    };
    RequestsPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        if (!this.allDone) {
            this.pageNo = this.pageNo + 1;
            this.loadRequests();
        }
        else {
            infiniteScroll.complete();
        }
    };
    RequestsPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    RequestsPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    RequestsPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    RequestsPage.prototype.requestDetail = function (appointment) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */], { appointment: appointment });
    };
    RequestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-requests',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\requests\requests.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <ion-title>{{\'requests\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n\n\n    <ion-segment [(ngModel)]="requests" (ionChange)="onSegmentChange()">\n\n        <ion-segment-button value="pending">\n\n            {{\'upcoming\' | translate}}\n\n        </ion-segment-button>\n\n        <ion-segment-button value="completed">\n\n            {{\'completed\' | translate}}\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="{{\'pull_refresh\' | translate}}"\n\n            refreshingSpinner="circles" refreshingText="{{\'refreshing\' | translate}}">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n    <div class="empty-view" *ngIf="!loadingShown && (!toShow || !toShow.length)">\n\n        <div style="text-align:center" (click)="loginPage()" >\n\n            <img src="assets/imgs/empty_appointment.png" alt="no offers" />\n\n            <span *ngIf="userMe" style="color:#9E9E9E; font-weight:bold;">\n\n                {{\'no_requests_to_show\' | translate}}\n\n            </span>\n\n            <span *ngIf="!userMe" style="color:#9E9E9E; font-weight:bold;">\n\n                {{\'alert_login_short\' | translate}}\n\n            </span>\n\n        </div>\n\n    </div>\n\n    <div>\n\n        <ion-list no-lines>\n\n            <ion-item *ngFor="let ap of toShow" [class]="ap.status + \' item item-block item-md\'"\n\n                (click)="requestDetail(ap)">\n\n                <ion-avatar item-start>\n\n                    <img *ngIf="ap.provider && ap.provider.user.image_url" data-src="{{ap.provider.user.image_url}}">\n\n                    <img *ngIf="!ap.provider || !ap.provider.user.image_url" src="assets/imgs/empty_dp.png">\n\n                </ion-avatar>\n\n                <h2>\n\n                    <span class="text-ellipsis name">\n\n                        {{ap.provider.user.name}}\n\n                    </span>\n\n                    <ion-icon *ngIf="ap.provider.is_verified == 1" name="checkmark-circle"></ion-icon>\n\n                    <!-- <span class="text-light-grey small">\n\n                        |\n\n                        {{ap.provider.primary_category.title}}\n\n                    </span> -->\n\n                    <span class="ml-auto small">\n\n                        {{ap.status | translate}}\n\n                    </span>\n\n                </h2>\n\n                <p class="text-grey">\n\n                    <span class="text-ellipsis">\n\n                        {{ap.provider.priceToShow}} / {{ap.provider.price_type | translate}}\n\n                    </span>\n\n                    <span class="ml-auto text-ellipsis">\n\n                        {{ap.date_formatted}}, {{ap.time_from_formatted}}-{{ap.time_to_formatted}}\n\n                    </span>\n\n                </p>\n\n            </ion-item>\n\n        </ion-list>\n\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n        </ion-infinite-scroll>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\requests\requests.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], RequestsPage);
    return RequestsPage;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rate_rate__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_chat_models__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plumberprofile_plumberprofile__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__booknow_booknow__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__track_track__ = __webpack_require__(415);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var BookingPage = /** @class */ (function () {
    function BookingPage(navCtrl, navParam, service, events, loadingCtrl, toastCtrl, callNumber, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.callNumber = callNumber;
        this.translate = translate;
        this.loadingShown = false;
        this.isLoading = false;
        this.statusLevel = 1;
        this.statusText = "Job Pending";
        this.canRate = false;
        this.providerRating = -1;
        this.subscriptions = [];
        this.appointment = navParam.get("appointment");
        var pr = window.localStorage.getItem("rated" + this.appointment.id);
        this.canRate = (this.appointment && this.appointment.status == 'complete' && pr == null);
        if (pr && Number(pr))
            this.providerRating = Number(pr);
        this.translate.get(this.canRate ? "review_now" : "reviewed").subscribe(function (value) {
            _this.reviewText = value;
        });
        events.subscribe("rated:provider", function (rating) {
            _this.canRate = false;
            _this.providerRating = rating;
            _this.translate.get(_this.canRate ? "review_now" : "reviewed").subscribe(function (value) {
                _this.reviewText = value;
            });
        });
        this.setStatus();
    }
    BookingPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    BookingPage.prototype.cancelJob = function () {
        var _this = this;
        this.translate.get('just_moment').subscribe(function (value) {
            _this.presentLoading(value);
        });
        this.subscriptions.push(this.service.appointmentCancel(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.appointment.id).subscribe(function (res) {
            console.log(res);
            _this.dismissLoading();
            _this.appointment = res;
            _this.setStatus();
            _this.events.publish("refresh:appointments");
        }, function (err) {
            console.log('cancel_err', err);
            _this.dismissLoading();
        }));
    };
    BookingPage.prototype.updateJobStatus = function (status) {
        var _this = this;
        if (this.appointment.status == 'cancelled')
            return;
        this.translate.get('updating').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.appointmentUpdate(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.appointment.id, { status: status }).subscribe(function (res) {
            console.log(res);
            _this.dismissLoading();
            _this.appointment = res;
            _this.setStatus();
        }, function (err) {
            console.log('update_status', err);
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    BookingPage.prototype.setStatus = function () {
        var _this = this;
        if (this.appointment) {
            switch (this.appointment.status) {
                case "pending": {
                    this.statusLevel = 1;
                    this.translate.get('updating').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "accepted": {
                    this.statusLevel = 1;
                    this.translate.get('job_accepted').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "onway": {
                    this.statusLevel = 2;
                    this.translate.get('job_onway').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "ongoing": {
                    this.statusLevel = 2;
                    this.translate.get('job_ongoing').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "complete": {
                    this.statusLevel = 3;
                    this.translate.get('job_complete').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "cancelled": {
                    this.statusLevel = 1;
                    this.translate.get('job_cancelled').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "rejected": {
                    this.statusLevel = 1;
                    this.translate.get('job_rejected').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
            }
            var acceptedTime_1 = __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getLogTimeForStatus("accepted", this.appointment.logs);
            if (acceptedTime_1 && acceptedTime_1.length) {
                this.translate.get('job_accepted_on').subscribe(function (value) {
                    _this.statusLevel1Time = value + acceptedTime_1;
                });
            }
            if (!this.statusLevel1Time || !this.statusLevel1Time.length) {
                if (this.appointment.status == "cancelled") {
                    this.translate.get('job_cancelled_on').subscribe(function (value) {
                        _this.statusLevel1Time = value + __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].formatTimestampDateTime(_this.appointment.updated_at, __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getLocale());
                    });
                }
                else if (this.appointment.status == "rejected") {
                    this.translate.get('job_rejected_on').subscribe(function (value) {
                        _this.statusLevel1Time = value + __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].formatTimestampDateTime(_this.appointment.updated_at, __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getLocale());
                    });
                }
                else {
                    this.statusLevel1Time = this.appointment.updated_at;
                }
            }
            this.translate.get('job_started_on').subscribe(function (value) {
                var onwaytime = __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getLogTimeForStatus("onway", _this.appointment.logs);
                if (onwaytime && onwaytime.length) {
                    _this.statusLevel2Time = value + onwaytime;
                }
                else {
                    var ongoingtime = __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getLogTimeForStatus("ongoing", _this.appointment.logs);
                    _this.statusLevel2Time = (ongoingtime && ongoingtime.length) ? (value + ongoingtime) : "";
                }
            });
            this.translate.get('job_completed_on').subscribe(function (value) {
                var time = __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getLogTimeForStatus("complete", _this.appointment.logs);
                _this.statusLevel3Time = (time && time.length) ? (value + time) : "";
            });
            var pr = window.localStorage.getItem("rated" + this.appointment.id);
            this.canRate = (this.appointment && this.appointment.status == 'complete' && pr == null);
            if (pr && Number(pr))
                this.providerRating = Number(pr);
            this.translate.get(this.canRate ? "review_now" : "reviewed").subscribe(function (value) {
                _this.reviewText = value;
            });
        }
    };
    BookingPage.prototype.callProvider = function () {
        this.callNumber.callNumber(this.appointment.provider.user.mobile_number, true).then(function (res) { return console.log('Launched dialer!', res); }).catch(function (err) { return console.log('Error launching dialer', err); });
    };
    // trackProvider() {
    //   this.navCtrl.push(TrackPage, { appointment: this.appointment });
    // }
    BookingPage.prototype.trackProvider = function () {
        var _this = this;
        if (this.appointment.status == "onway") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__track_track__["a" /* TrackPage */], { appointment: this.appointment });
        }
        else {
            this.translate.get("track_unavialable").subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    BookingPage.prototype.chatscreen = function () {
        var newUserMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_USER));
        var chat = new __WEBPACK_IMPORTED_MODULE_6__models_chat_models__["a" /* Chat */]();
        chat.chatId = this.appointment.provider.user.id + "hp";
        chat.chatImage = (this.appointment.provider.user.image_url && this.appointment.provider.user.image_url.length) ? this.appointment.provider.user.image_url : "assets/imgs/empty_dp.png";
        chat.chatName = this.appointment.provider.user.name;
        chat.chatStatus = this.appointment.provider.user.email;
        chat.myId = newUserMe.id + "hc";
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__["a" /* ChatscreenPage */], { chat: chat });
    };
    BookingPage.prototype.rate = function () {
        if (this.canRate) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__rate_rate__["a" /* RatePage */], { appointment: this.appointment });
        }
    };
    BookingPage.prototype.reschedule = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__booknow_booknow__["a" /* BooknowPage */], { appointment: this.appointment });
    };
    BookingPage.prototype.viewProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__plumberprofile_plumberprofile__["a" /* PlumberprofilePage */], { profile: this.appointment.provider });
    };
    BookingPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    BookingPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    BookingPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    BookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-booking',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\booking\booking.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>{{\'job_detail\' | translate}}</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n\n\n	<ion-list class="profile">\n\n		<ion-item>\n\n			<ion-avatar item-start (click)="viewProfile()">\n\n				<img *ngIf="appointment.provider && appointment.provider.user.image_url"\n\n					data-src="{{appointment.provider.user.image_url}}">\n\n				<img *ngIf="!appointment.provider || !appointment.provider.user.image_url"\n\n					src="assets/imgs/empty_dp.png">\n\n			</ion-avatar>\n\n			<h2 class="d-flex">\n\n				<strong class="text-ellipsis" (click)="viewProfile()">{{appointment.provider.user.name}}</strong>\n\n				<ion-icon *ngIf="appointment.provider.is_verified == 1" name="checkmark-circle"></ion-icon>\n\n				<!-- <span> | {{appointment.provider.primary_category.title}}</span> -->\n\n				<span class="end">\n\n					<ion-icon name="md-call" text-start class="text-thime" (click)="callProvider()"></ion-icon>\n\n					<ion-icon name="md-text" text-end class="text-thime" (click)="chatscreen()"></ion-icon>\n\n				</span>\n\n			</h2>\n\n			<div class="details">\n\n				<p *ngIf="appointment.category">\n\n					<small>{{\'job_task\' | translate}}</small>\n\n					<!-- <span class="text-ellipsis">{{appointment.category.title}}</span> -->\n\n				</p>\n\n				<ion-row>\n\n					<ion-col col-6>\n\n						<p>\n\n							<small>{{\'booking_for\' | translate}}</small>\n\n							<span>\n\n								{{appointment.date_formatted}},\n\n								{{appointment.time_from_formatted}}-{{appointment.time_to_formatted}}\n\n							</span>\n\n						</p>\n\n					</ion-col>\n\n					<ion-col col-6>\n\n						<p class="job-fess">\n\n							<small>{{\'job_fees\' | translate}}</small>\n\n							<span>\n\n								{{appointment.provider.priceToShow}} / {{appointment.provider.price_type | translate}}\n\n							</span>\n\n						</p>\n\n					</ion-col>\n\n				</ion-row>\n\n				<p class="job-fess">\n\n					<small>{{\'address\' | translate}}</small>\n\n					<span>{{appointment.address.address}}</span>\n\n				</p>\n\n			</div>\n\n		</ion-item>\n\n	</ion-list>\n\n	<div *ngIf="appointment.status==\'pending\'||appointment.status==\'accepted\'" class="btn-container">\n\n		<ion-row>\n\n			<ion-col col-4>\n\n				<button ion-button icon-start full (click)="cancelJob()">\n\n					<ion-icon name="md-close"></ion-icon>\n\n					{{\'cancel\' | translate}}\n\n				</button>\n\n			</ion-col>\n\n			<ion-col col-4>\n\n				<button ion-button icon-start full (click)="reschedule()">\n\n					<ion-icon name="md-refresh"></ion-icon>{{\'reschedule\' | translate}}\n\n				</button>\n\n			</ion-col>\n\n			<ion-col col-4>\n\n				<button ion-button icon-start full (click)="viewProfile()">\n\n					<ion-icon name="md-person"></ion-icon>{{\'view_profile\' | translate}}\n\n				</button>\n\n			</ion-col>\n\n		</ion-row>\n\n	</div>\n\n	<div *ngIf="!(appointment.status==\'pending\'||appointment.status==\'accepted\')" class="btn-container">\n\n		<ion-row>\n\n			<ion-col>\n\n				<button ion-button icon-start full>\n\n					<ion-icon name="md-checkmark"></ion-icon>\n\n					{{statusText}}\n\n				</button>\n\n			</ion-col>\n\n		</ion-row>\n\n	</div>\n\n	<div class="job-status">\n\n		<h2>{{\'job_status\' | translate}}</h2>\n\n		<ion-list no-lines>\n\n			<ion-item [ngClass]="statusLevel==1 ? \'active\' : \'disable\'">\n\n				<span item-start class="circle"></span>\n\n				<div class="text">\n\n					<h4 class="text-ellipsis">{{\'job_\'+appointment.status | translate}}\n\n						<small *ngIf="statusLevel1Time">{{statusLevel1Time}}</small>\n\n					</h4>\n\n				</div>\n\n			</ion-item>\n\n			<ion-item [ngClass]="statusLevel==2 ? \'active\' : \'disable\'">\n\n				<span item-start class="circle"></span>\n\n				<div class="text">\n\n					<h4 class="text-ellipsis">{{\'job_in_process\' | translate}}\n\n						<small *ngIf="statusLevel2Time">{{statusLevel2Time}}</small>\n\n					</h4>\n\n					<h2 *ngIf="statusLevel==2" (click)="trackProvider()">{{\'view_in_map\' | translate}}</h2>\n\n				</div>\n\n			</ion-item>\n\n			<ion-item [ngClass]="statusLevel==3 ? \'active\' : \'disable\'">\n\n				<span item-start class="circle"></span>\n\n				<div class="text">\n\n					<h4 class="text-ellipsis">\n\n						{{\'job_completed\' | translate}}\n\n						<small>\n\n							{{statusLevel3Time}}\n\n						</small>\n\n					</h4>\n\n				</div>\n\n			</ion-item>\n\n		</ion-list>\n\n	</div>\n\n</ion-content>\n\n<ion-footer *ngIf="canRate || providerRating > -1">\n\n	<button class="btn" ion-button round full margin-top (click)="rate()">\n\n		{{reviewText}}\n\n	</button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\booking\booking.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */]])
    ], BookingPage);
    return BookingPage;
}());

//# sourceMappingURL=booking.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connectivity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Connectivity = /** @class */ (function () {
    function Connectivity(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    Connectivity.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type != 'none';
        }
        else {
            return navigator.onLine;
        }
    };
    Connectivity.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type == 'none';
        }
        else {
            return !navigator.onLine;
        }
    };
    Connectivity.prototype.watchOnline = function () {
        return this.network.onConnect();
    };
    Connectivity.prototype.watchOffline = function () {
        return this.network.onDisconnect();
    };
    Connectivity = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
    ], Connectivity);
    return Connectivity;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyLocation; });
var MyLocation = /** @class */ (function () {
    function MyLocation() {
    }
    return MyLocation;
}());

//# sourceMappingURL=my-location.models.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Add_address_titlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Add_address_titlePage = /** @class */ (function () {
    function Add_address_titlePage(navParam, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.address = navParam.get("address");
    }
    Add_address_titlePage.prototype.close = function () {
        this.viewCtrl.dismiss(null);
    };
    Add_address_titlePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.address);
    };
    Add_address_titlePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add_address_title',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\add_address_title\add_address_title.html"*/'<ion-footer no-border>\n\n	<div class="form">\n\n		<ion-list no-lines>\n\n			<ion-item>\n\n				<ion-label floating>{{"address_title" | translate}}</ion-label>\n\n				<ion-input type="text" [(ngModel)]="address.title"></ion-input>\n\n				<ion-icon class="zmdi zmdi-close" item-end text-end (click)="close()"></ion-icon>\n\n			</ion-item>\n\n			<ion-item>\n\n				<ion-label floating>{{"full_address" | translate}}</ion-label>\n\n				<ion-input type="text" [(ngModel)]="address.address"></ion-input>\n\n			</ion-item>\n\n		</ion-list>\n\n		<button ion-button round full margin-bottom class="btn-orange btn" (click)="dismiss()">\n\n			{{"save_address" | translate}}\n\n		</button>\n\n	</div>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\add_address_title\add_address_title.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */]])
    ], Add_address_titlePage);
    return Add_address_titlePage;
}());

//# sourceMappingURL=add_address_title.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_signup_request_models__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__otp_otp__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupPage = /** @class */ (function () {
    function SignupPage(params, navCtrl, clientService, translate, loadingCtrl, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.clientService = clientService;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.signUpRequest = new __WEBPACK_IMPORTED_MODULE_3__models_signup_request_models__["a" /* SignUpRequest */]('', '', '', '');
        var code = params.get('code');
        var phone = params.get('phone');
        var name = params.get('name');
        var email = params.get('email');
        if (code && code.length) {
            this.countryCode = code;
        }
        if (phone && phone.length) {
            this.phoneNumber = phone;
        }
        if (name && name.length) {
            this.signUpRequest.name = name;
        }
        if (email && email.length) {
            this.signUpRequest.email = email;
        }
        this.getCountries();
        this.changeHint();
    }
    SignupPage.prototype.getCountries = function () {
        var _this = this;
        this.clientService.getCountries().subscribe(function (data) {
            _this.countries = data;
        }, function (err) {
            console.log(err);
        });
    };
    SignupPage.prototype.focusEmail = function () {
        this.inputemail.setFocus();
    };
    SignupPage.prototype.focusPhone = function () {
        this.inputphone.setFocus();
    };
    SignupPage.prototype.changeHint = function () {
        var _this = this;
        this.phoneNumber = "";
        if (this.countryCode && this.countryCode.length) {
            this.translate.get('enter_phone_number_exluding').subscribe(function (value) {
                _this.phoneNumberHint = value + " (+" + _this.countryCode + ")";
            });
        }
        else {
            this.translate.get('enter_phone_number').subscribe(function (value) {
                _this.phoneNumberHint = value;
            });
        }
    };
    SignupPage.prototype.requestSignUp = function () {
        var _this = this;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!this.signUpRequest.name.length) {
            this.translate.get('err_valid_name').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (this.signUpRequest.email.length <= 5 || !reg.test(this.signUpRequest.email)) {
            this.translate.get('err_valid_email').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.countryCode || !this.countryCode.length || !this.phoneNumber || !this.phoneNumber.length) {
            this.translate.get('err_valid_phone').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.signUp();
        }
    };
    SignupPage.prototype.alertPhone = function () {
        var _this = this;
        this.translate.get(['alert_phone', 'no', 'yes']).subscribe(function (text) {
            _this.phoneNumberFull = "+" + _this.countryCode + _this.phoneNumber;
            var alert = _this.alertCtrl.create({
                title: _this.phoneNumberFull,
                message: text['alert_phone'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: text['yes'],
                        handler: function () {
                            _this.signUpRequest.password = String(Math.floor(100000 + Math.random() * 900000));
                            _this.signUpRequest.mobile_number = _this.phoneNumberFull;
                            _this.signUp();
                        }
                    }]
            });
            alert.present();
        });
    };
    SignupPage.prototype.signUp = function () {
        var _this = this;
        this.phoneNumberFull = "+" + this.countryCode + this.phoneNumber;
        this.signUpRequest.password = String(Math.floor(100000 + Math.random() * 900000));
        this.signUpRequest.mobile_number = this.phoneNumberFull;
        this.translate.get('signing_up').subscribe(function (value) {
            _this.presentLoading(value);
        });
        this.clientService.signUp(this.signUpRequest).subscribe(function (res) {
            console.log(res);
            _this.dismissLoading();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__otp_otp__["a" /* OtpPage */], { phoneNumberFull: res.user.mobile_number });
        }, function (err) {
            console.log(err);
            _this.dismissLoading();
            var errMsg = 'Unable to register with provided credentials, Either email or phone is already taken.';
            if (err && err.error && err.error.errors) {
                if (err.error.errors.email) {
                    errMsg = err.error.errors.email[0];
                }
                else if (err.error.errors.mobile_number) {
                    errMsg = err.error.errors.mobile_number[0];
                }
                else if (err.error.errors.password) {
                    errMsg = err.error.errors.password[0];
                }
            }
            _this.presentErrorAlert(errMsg);
        });
    };
    SignupPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SignupPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(["error", "dismiss"]).subscribe(function (value) {
            var alert = _this.alertCtrl.create({
                title: value["error"],
                subTitle: msg,
                buttons: [value["dismiss"]]
            });
            alert.present();
        });
    };
    SignupPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SignupPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('inputname'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('inputemail'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputemail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('inputphone'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputphone", void 0);
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\signup\signup.html"*/'<ion-header class="bg-transparent">\n\n    <ion-navbar>\n\n        <ion-title>{{\'sign_up\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="form">\n\n        <ion-list no-lines>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-person" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'enter_full_name\' | translate}}</ion-label>\n\n                <ion-input #inputname type="text" (keyup.enter)="focusEmail()" [(ngModel)]="signUpRequest.name">\n\n                </ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-mail" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'enter_email_id\' | translate}}</ion-label>\n\n                <ion-input #inputemail type="email" (keyup.enter)="focusPhone()" [(ngModel)]="signUpRequest.email">\n\n                </ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-globe" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label floating>{{\'select_country\' | translate}}</ion-label>\n\n                <ion-select [(ngModel)]="countryCode" interface="popover" multiple="false" class="text-thime"\n\n                    [okText]="\'okay\' | translate" [cancelText]="\'cancel\' | translate" (ionChange)="changeHint()">\n\n                    <ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries">{{country.name}}\n\n                    </ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-avatar item-start style="margin-bottom: 3px; margin-right: 28px;">\n\n                    <ion-icon name="md-phone-portrait" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{phoneNumberHint}}</ion-label>\n\n                <ion-input #inputphone type="tel" (keyup.enter)="requestSignUp()" [(ngModel)]="phoneNumber"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n\n\n        <button class="btn" ion-button round full margin-top margin-bottom (click)="requestSignUp()">\n\n            {{\'sign_up_now\' | translate}}\n\n        </button>\n\n\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <p class="text-grey" text-center style="margin-top: 30px;">\n\n        <small>\n\n            {{\'by_signing_up\' | translate}}<ins>{{\'terms_condition\' | translate}}</ins>\n\n        </small>\n\n    </p>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\signup\signup.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_rate_request_models__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RatePage = /** @class */ (function () {
    function RatePage(navParam, service, loadingCtrl, alertCtrl, toastCtrl, app, events, translate) {
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.events = events;
        this.translate = translate;
        this.loadingShown = false;
        this.rateRequest = new __WEBPACK_IMPORTED_MODULE_4__models_rate_request_models__["a" /* RateRequest */]();
        this.subscriptions = [];
        this.appointment = navParam.get("appointment");
        this.rateRequest.rating = 3;
    }
    RatePage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    RatePage.prototype.setRating = function (rating) {
        this.rateRequest.rating = rating;
    };
    RatePage.prototype.submitRating = function () {
        var _this = this;
        if (!this.rateRequest.review || !this.rateRequest.review.length) {
            this.translate.get("err_review").subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get("just_moment").subscribe(function (value) {
                _this.presentLoading(value);
            });
            this.subscriptions.push(this.service.rateProvider(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.appointment.provider_id, this.rateRequest).subscribe(function (res) {
                console.log(res);
                window.localStorage.setItem("rated" + _this.appointment.id, String(_this.rateRequest.rating));
                _this.events.publish("rated:provider", _this.rateRequest.rating);
                _this.dismissLoading();
                _this.translate.get("review_done").subscribe(function (value) {
                    _this.showToast(value);
                });
                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
            }, function (err) {
                console.log('submit_rating', err);
                _this.dismissLoading();
                var found = false;
                if (err && err.error && err.error.errors) {
                    if (err.error.errors.review) {
                        found = true;
                        _this.translate.get("err_review_length").subscribe(function (value) { return _this.presentErrorAlert(value); });
                    }
                }
                if (!found) {
                    _this.translate.get("something_went_wrong").subscribe(function (value) { return _this.presentErrorAlert(value); });
                }
            }));
        }
    };
    RatePage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(["error", "dismiss"]).subscribe(function (value) {
            var alert = _this.alertCtrl.create({
                title: value["error"],
                subTitle: msg,
                buttons: [value["dismiss"]]
            });
            alert.present();
        });
    };
    RatePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    RatePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    RatePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    RatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rate',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\rate\rate.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>{{\'rate_us\' | translate}}</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n	<ion-card class="slip">\n\n		<div text-center>\n\n			<h4 class="text-dark">{{\'we_hope_you_had\' | translate}}</h4>\n\n			<!-- <p class="text-light">22nd Feb, 2018, 12:20 pm</p> -->\n\n\n\n			<!-- <p class="text-light">{{appointment.updated_at}}</p> -->\n\n			<!-- <h1 class="text-theme">{{appointment.provider.price}} / {{appointment.provider.price_type | translate}}</h1> -->\n\n			<!-- <h4 class="text-dark">Payment has been donevia<br>your Vroom Wallet</h4> -->\n\n		</div>\n\n	</ion-card>\n\n	<ion-card class="rate">\n\n		<div text-center>\n\n			<h4>{{\'kindly_rate_and_review_your_experience_with\' | translate}}</h4>\n\n			<div class="driver">\n\n				<ion-item>\n\n					<ion-avatar item-start>\n\n						<img *ngIf="appointment.provider && appointment.provider.user.image_url" data-src="{{appointment.provider.user.image_url}}">\n\n						<img *ngIf="!appointment.provider || !appointment.provider.user.image_url" src="assets/imgs/empty_dp.png">\n\n					</ion-avatar>\n\n					<h2>{{appointment.provider.user.name}}\n\n						<ion-icon name="ios-checkmark-circle" class="text-theme" text-end></ion-icon>\n\n					</h2>\n\n					<p>{{appointment.provider.primary_category.title}}</p>\n\n				</ion-item>\n\n				<p class="icons">\n\n					<ion-icon name="ios-star" [ngClass]="rateRequest.rating>=1 ? \'active\' : \'\'" (click)="setRating(1)"></ion-icon>\n\n					<ion-icon name="ios-star" [ngClass]="rateRequest.rating>=2 ? \'active\' : \'\'" (click)="setRating(2)"></ion-icon>\n\n					<ion-icon name="ios-star" [ngClass]="rateRequest.rating>=3 ? \'active\' : \'\'" (click)="setRating(3)"></ion-icon>\n\n					<ion-icon name="ios-star" [ngClass]="rateRequest.rating>=4 ? \'active\' : \'\'" (click)="setRating(4)"></ion-icon>\n\n					<ion-icon name="ios-star" [ngClass]="rateRequest.rating==5 ? \'active\' : \'\'" (click)="setRating(5)"></ion-icon>\n\n				</p>\n\n				<div class="form">\n\n					<ion-list no-lines>\n\n						<ion-item>\n\n							<ion-textarea type="text" rows="2" [(ngModel)]="rateRequest.review" placeholder="{{\'feed_back\' | translate}}"></ion-textarea>\n\n						</ion-item>\n\n					</ion-list>\n\n				</div>\n\n			</div>\n\n		</div>\n\n	</ion-card>\n\n</ion-content>\n\n\n\n<ion-footer no-border>\n\n	<button class="btn text-white" ion-button round block (click)="submitRating()">\n\n		{{\'submit_rating\' | translate}}\n\n	</button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\rate\rate.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], RatePage);
    return RatePage;
}());

//# sourceMappingURL=rate.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__ = __webpack_require__(147);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TrackPage = /** @class */ (function () {
    function TrackPage(navCtrl, menuCtrl, navParam, maps) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.maps = maps;
        this.menuCtrl.enable(false, 'myMenu');
        this.appointment = navParam.get("appointment");
        console.log("appointment", this.appointment);
    }
    TrackPage.prototype.ionViewWillLeave = function () {
        if (this.refLocation) {
            this.refLocation.off();
        }
    };
    TrackPage.prototype.checkAndSetLocation = function (location) {
        console.log('inlocation', location);
        if (this.maps.map) {
            var center = new google.maps.LatLng(Number(location.lat), Number(location.lng));
            var posBonds = new google.maps.LatLngBounds();
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
    };
    TrackPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (!this.initialized) {
            var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
                _this.initialized = true;
                _this.plotMarkers();
                _this.plotPolyline(new google.maps.LatLng(Number(_this.appointment.provider.latitude), Number(_this.appointment.provider.longitude)));
            }).catch(function (err) {
                console.log(err);
                _this.navCtrl.pop();
            });
            mapLoaded.catch(function (err) {
                console.log(err);
                _this.navCtrl.pop();
            });
            var component_1 = this;
            this.refLocation = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref().child("handyman_provider").child(String(this.appointment.provider.user_id));
            this.refLocation.on('value', function (snapshot) {
                var providerLocation = snapshot.val();
                component_1.checkAndSetLocation(providerLocation);
                component_1.plotPolyline(new google.maps.LatLng(Number(providerLocation.lat), Number(providerLocation.lng)));
            });
        }
    };
    TrackPage.prototype.plotPolyline = function (from) {
        if (!this.lastFrom) {
            this.lastFrom = from;
        }
        else if (!this.lastFrom.equals(from)) {
            this.lastFrom = from;
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay_1 = new google.maps.DirectionsRenderer({
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
                    directionsDisplay_1.setDirections(result);
                }
            });
        }
    };
    TrackPage.prototype.plotMarkers = function () {
        var _this = this;
        var posBonds = new google.maps.LatLngBounds();
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
        setTimeout(function () {
            _this.maps.map.panTo(posBonds.getCenter());
        }, 200);
    };
    TrackPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.maps.map, marker);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], TrackPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], TrackPage.prototype, "pleaseConnect", void 0);
    TrackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-track',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\track\track.html"*/'<!-- <ion-header>\n    <ion-navbar>\n        <ion-title>\n            <span class="profile">\n                <img *ngIf="appointment.provider && appointment.provider.user && appointment.provider.user.image_url"\n                    data-src="{{appointment.provider.user.image_url}}">\n                <img *ngIf="!appointment.provider || !appointment.provider.user || !appointment.provider.user.image_url"\n                    src="assets/imgs/empty_dp.png">\n            </span>\n            {{appointment.provider.user.name}}\n        </ion-title>\n    </ion-navbar>\n</ion-header> -->\n\n<ion-header>\n	<ion-navbar>\n		<ion-title>{{appointment.provider.user.name}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #pleaseConnect id="please-connect">\n        <p>{{\'please_connect_to_the_internet\' | translate}}</p>\n    </div>\n    <div #map id="map">\n        <ion-spinner></ion-spinner>\n    </div>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\track\track.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__["a" /* GoogleMaps */]])
    ], TrackPage);
    return TrackPage;
}());

//# sourceMappingURL=track.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category_category__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_my_location_models__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectarea_selectarea__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__categorysearch_categorysearch__ = __webpack_require__(418);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, service, geolocation, loadingCtrl, toastCtrl, diagnostic, alertCtrl, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.categoriesAll = new Array();
        this.subscriptions = [];
        this.selectedLocation = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION));
        this.categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_CATEGORY));
        if (this.categories)
            this.categoriesAll = this.categories;
        else
            this.translate.get('loading_categories').subscribe(function (value) {
                _this.presentLoading(value);
            });
        this.refreshCategories();
    }
    HomePage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var newSelectedLocation = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION));
        this.selectedLocation = newSelectedLocation;
        if (!this.selectedLocation) {
            this.translate.get('select_location_text').subscribe(function (value) {
                _this.showToast(value);
            });
            this.checkForLocation(false);
        }
    };
    HomePage.prototype.refreshCategories = function () {
        var _this = this;
        var subscription = this.service.categoryParent(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            _this.dismissLoading();
            var cats = res.data;
            _this.categories = cats;
            _this.categoriesAll = _this.categories;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_CATEGORY, JSON.stringify(_this.categories));
        }, function (err) {
            _this.dismissLoading();
            console.log('cat_err', err);
        });
        this.subscriptions.push(subscription);
    };
    HomePage.prototype.checkForLocation = function (select) {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (isAvailable) {
            if (isAvailable) {
                if (select) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__selectarea_selectarea__["a" /* SelectareaPage */], { forsearch: true });
                }
                else {
                    _this.geolocation.getCurrentPosition().then(function (resp) {
                        _this.selectedLocation = new __WEBPACK_IMPORTED_MODULE_3__models_my_location_models__["a" /* MyLocation */]();
                        _this.translate.get('home').subscribe(function (value) {
                            _this.selectedLocation.name = value;
                        });
                        _this.selectedLocation.lat = String(resp.coords.latitude);
                        _this.selectedLocation.lng = String(resp.coords.longitude);
                        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION, JSON.stringify(_this.selectedLocation));
                        _this.translate.get('current_location_success').subscribe(function (value) {
                            _this.showToast(value);
                        });
                    }).catch(function (error) {
                        console.log('Error getting location', error);
                        _this.translate.get('current_location_error').subscribe(function (value) {
                            _this.showToast(value);
                        });
                    });
                }
            }
            else {
                _this.alertLocationServices();
            }
        }).catch(function (e) {
            console.error(e);
            _this.alertLocationServices();
        });
    };
    HomePage.prototype.alertLocationServices = function () {
        var _this = this;
        this.translate.get(['location_services_title', 'location_services_message', 'okay']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['location_services_title'],
                subTitle: text['location_services_message'],
                buttons: [{
                        text: text['okay'],
                        role: 'cancel',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__selectarea_selectarea__["a" /* SelectareaPage */], { forsearch: true });
                        }
                    }]
            });
            alert.present();
        });
    };
    HomePage.prototype.searchCats = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__categorysearch_categorysearch__["a" /* CategorySearchPage */]);
    };
    HomePage.prototype.subCatPage = function (cat) {
        var _this = this;
        if (this.selectedLocation) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__category_category__["a" /* CategoryPage */], { cat: cat });
        }
        else {
            this.translate.get('err_select_location').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    HomePage.prototype.getItems = function (searchbar) {
        this.filterCategories(searchbar.srcElement.value);
    };
    HomePage.prototype.filterCategories = function (query) {
        var filtered = new Array();
        if (query && query.length) {
            for (var _i = 0, _a = this.categoriesAll; _i < _a.length; _i++) {
                var cat = _a[_i];
                if (cat.title.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                    filtered.push(cat);
                }
            }
            this.categories = filtered;
        }
        else {
            this.categories = this.categoriesAll;
        }
    };
    HomePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    HomePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    HomePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\home\home.html"*/'<ion-header class="bg-transparent">\n\n	<ion-navbar>\n\n		<ion-title>\n\n			<ion-icon name="pin" class="text-white pin-icon"></ion-icon>\n\n			<span class="city" style="margin-left: 0 !important;" (click)="checkForLocation(true)">\n\n				<ion-label class="my_address text-white" *ngIf="selectedLocation">\n\n					{{\'location_for_service\' | translate}}<br>{{selectedLocation.name}}\n\n				</ion-label>\n\n				<ion-label *ngIf="!selectedLocation" class="text-white">\n\n					{{\'select_location\' | translate}}\n\n				</ion-label>\n\n			</span>\n\n		</ion-title>\n\n	</ion-navbar>\n\n	<div class="banner">\n\n		<img src="assets/imgs/banner.jpg">\n\n		<h1 class="text-white">{{\'how_can_we_help_you_today\' | translate}}</h1>\n\n	</div>\n\n	<div class="d-flex search_box" (click)="searchCats()">\n\n		<ion-icon name="md-search" text-start></ion-icon>\n\n		<h2>{{\'search_for_service\' | translate}}</h2>\n\n	</div>\n\n	<!-- <div class="search-box d-flex"></div> -->\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n\n\n\n\n	<div class="home-menu">\n\n		<ion-row *ngIf="categories && categories.length">\n\n			<ion-col *ngFor="let cat of categories" col-4 (click)="subCatPage(cat)">\n\n				<div class="menu-item">\n\n					<img data-src="{{cat.image_url}}">\n\n					<p class="text-ellipsis">{{cat.title}}</p>\n\n				</div>\n\n			</ion-col>\n\n		</ion-row>\n\n	</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategorySearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listofplumber_listofplumber__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__category_category__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CategorySearchPage = /** @class */ (function () {
    function CategorySearchPage(navCtrl, params, service, loadingCtrl, toastCtrl, translate) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.isLoading = false;
        this.subscriptions = [];
    }
    CategorySearchPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    CategorySearchPage.prototype.getItems = function (searchbar) {
        var _this = this;
        this.searchQuery = searchbar.srcElement.value;
        this.isLoading = true;
        this.translate.get('searching_service').subscribe(function (value) {
            _this.presentLoading(value);
        });
        this.subscriptions.push(this.service.categorySearch(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.searchQuery).subscribe(function (res) {
            _this.isLoading = false;
            _this.dismissLoading();
            var cats = res.data;
            _this.subCategories = cats;
        }, function (err) {
            _this.isLoading = false;
            _this.dismissLoading();
            console.log('cat_sub_err', err);
        }));
    };
    CategorySearchPage.prototype.subCatDetail = function (cat) {
        this.navCtrl.push(cat.parent_id ? __WEBPACK_IMPORTED_MODULE_2__listofplumber_listofplumber__["a" /* ListofplumberPage */] : __WEBPACK_IMPORTED_MODULE_6__category_category__["a" /* CategoryPage */], { cat: cat });
    };
    CategorySearchPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CategorySearchPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CategorySearchPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CategorySearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-categorysearch',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\categorysearch\categorysearch.html"*/'<ion-header class="bg-thime">\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n    <ion-searchbar (ionInput)="getItems($event)" debounce="1000" placeholder="{{\'search_for_service\' | translate}}">\n    </ion-searchbar>\n</ion-header>\n\n<ion-content>\n    <div class="empty-view" *ngIf="!isLoading && (!subCategories || !subCategories.length)">\n        <div style="text-align:center">\n            <img src="assets/imgs/empty_category.png" alt="no offers" />\n            <span *ngIf="searchQuery && searchQuery.length" style="color:#9E9E9E; font-weight:bold;">\n                {{\'empty_categories_sub\' | translate}}\n            </span>\n        </div>\n    </div>\n    <ion-list *ngIf="subCategories && subCategories.length" no-lines>\n        <ion-item *ngFor="let cat of subCategories" (click)="subCatDetail(cat)">\n            <h2><span class="text-ellipsis">{{cat.title}}</span>\n                <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n            </h2>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\categorysearch\categorysearch.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], CategorySearchPage);
    return CategorySearchPage;
}());

//# sourceMappingURL=categorysearch.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manageaddress_manageaddress__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_contact__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__privacy_privacy__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signin_signin__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_firebase_service__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__managelanguage_managelanguage__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_crop__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__faqs_faqs__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_app_version__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_market__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_social_sharing__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__tabs_tabs__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var AccountPage = /** @class */ (function () {
    function AccountPage(navCtrl, app, alertCtrl, service, loadingCtrl, translate, toastCtrl, firebaseService, file, imagePicker, cropService, platform, appVersion, market, socialSharing) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.firebaseService = firebaseService;
        this.file = file;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.platform = platform;
        this.appVersion = appVersion;
        this.market = market;
        this.socialSharing = socialSharing;
        this.loadingShown = false;
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_USER));
    }
    AccountPage.prototype.loginIfNot = function () {
        if (!this.userMe) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signin_signin__["a" /* SigninPage */]);
        }
    };
    AccountPage.prototype.openAction = function () {
        var _this = this;
        if (this.userMe) {
            this.platform.ready().then(function () {
                if (_this.platform.is("cordova")) {
                    _this.imagePicker.getPictures({
                        maximumImagesCount: 1,
                    }).then(function (results) {
                        if (results && results[0]) {
                            _this.reduceImages(results).then(function () {
                                console.log('cropped_images');
                            });
                        }
                    }, function (err) {
                        console.log("getPictures", JSON.stringify(err));
                    });
                }
            });
        }
        else {
            this.translate.get("alert_login_short").subscribe(function (value) { return _this.showToast(value); });
            this.loginIfNot();
        }
    };
    AccountPage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, { quality: 100 }).then(function (cropped_image) {
                    _this.resolveUri(cropped_image);
                });
            });
        }, Promise.resolve());
    };
    AccountPage.prototype.resolveUri = function (uri) {
        var _this = this;
        console.log('uri: ' + uri);
        if (this.platform.is("android") && uri.startsWith('content://') && uri.indexOf('/storage/') != -1) {
            uri = "file://" + uri.substring(uri.indexOf("/storage/"), uri.length);
            console.log('file: ' + uri);
        }
        this.file.resolveLocalFilesystemUrl(uri).then(function (entry) {
            console.log(entry);
            var fileEntry = entry;
            fileEntry.file(function (success) {
                var mimeType = success.type;
                console.log(mimeType);
                var dirPath = entry.nativeURL;
                _this.upload(dirPath, entry.name, mimeType);
            }, function (error) {
                console.log(error);
            });
        });
    };
    AccountPage.prototype.upload = function (path, name, mime) {
        var _this = this;
        console.log('original: ' + path);
        var dirPathSegments = path.split('/');
        dirPathSegments.pop();
        path = dirPathSegments.join('/');
        console.log('dir: ' + path);
        this.file.readAsArrayBuffer(path, name).then(function (buffer) {
            _this.translate.get("uploading_image").subscribe(function (value) {
                _this.presentLoading(value);
            });
            _this.progress = true;
            _this.firebaseService.uploadBlob(new Blob([buffer], { type: mime })).then(function (url) {
                _this.progress = false;
                _this.dismissLoading();
                console.log("Url is", url);
                _this.userMe.image_url = String(url);
                _this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_TOKEN), { image_url: String(url) }).subscribe(function (res) {
                    console.log(res);
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_USER, JSON.stringify(res));
                }, function (err) {
                    console.log('update_user', err);
                });
            }).catch(function (err) {
                _this.progress = false;
                _this.dismissLoading();
                _this.showToast(JSON.stringify(err));
                console.log(err);
                _this.translate.get("uploading_fail").subscribe(function (value) {
                    _this.presentErrorAlert(value);
                });
            });
        }).catch(function (err) {
            _this.dismissLoading();
            _this.showToast(JSON.stringify(err));
            console.log(err);
        });
    };
    AccountPage.prototype.manageaddress = function () {
        var _this = this;
        if (this.userMe) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__manageaddress_manageaddress__["a" /* ManageaddressPage */], { edit: true });
        }
        else {
            this.translate.get("alert_login_short").subscribe(function (value) { return _this.showToast(value); });
            this.loginIfNot();
        }
    };
    AccountPage.prototype.contact = function () {
        var _this = this;
        if (this.userMe) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__contact_contact__["a" /* ContactPage */]);
        }
        else {
            this.translate.get("alert_login_short").subscribe(function (value) { return _this.showToast(value); });
            this.loginIfNot();
        }
    };
    AccountPage.prototype.privacy = function () {
        var _this = this;
        var terms = __WEBPACK_IMPORTED_MODULE_11__models_helper_models__["a" /* Helper */].getSetting("privacy_policy");
        if (terms && terms.length) {
            this.translate.get('privacy_policy').subscribe(function (value) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__privacy_privacy__["a" /* PrivacyPage */], { toShow: terms, heading: value });
            });
        }
    };
    AccountPage.prototype.about = function () {
        var _this = this;
        var terms = __WEBPACK_IMPORTED_MODULE_11__models_helper_models__["a" /* Helper */].getSetting("about_us");
        if (terms && terms.length) {
            this.translate.get('about_us').subscribe(function (value) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__privacy_privacy__["a" /* PrivacyPage */], { toShow: terms, heading: value });
            });
        }
    };
    AccountPage.prototype.chooseLanguage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__managelanguage_managelanguage__["a" /* ManagelanguagePage */]);
    };
    AccountPage.prototype.faqs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__faqs_faqs__["a" /* FaqsPage */]);
    };
    AccountPage.prototype.shareApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is("cordova")) {
                _this.appVersion.getPackageName().then(function (pn) {
                    if (_this.platform.is("android")) {
                        _this.socialSharing.share("https://play.google.com/store/apps/details?id=" + pn).then(function (res) {
                            // Success!
                        }).catch(function (error) {
                            console.log("socialSharing", error);
                            _this.market.open(pn);
                        });
                    }
                    else {
                        _this.market.open(pn);
                    }
                });
            }
        });
    };
    AccountPage.prototype.alertLogout = function () {
        var _this = this;
        if (this.userMe) {
            this.translate.get(['logout_title', 'logout_message', 'no', 'yes']).subscribe(function (text) {
                var alert = _this.alertCtrl.create({
                    title: text['logout_title'],
                    message: text['logout_message'],
                    buttons: [{
                            text: text['no'],
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        }, {
                            text: text['yes'],
                            handler: function () {
                                window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_USER);
                                window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_TOKEN);
                                window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS);
                                window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST);
                                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_19__tabs_tabs__["a" /* TabsPage */]);
                            }
                        }]
                });
                alert.present();
            });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signin_signin__["a" /* SigninPage */]);
        }
    };
    AccountPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    AccountPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    AccountPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AccountPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(["error", "dismiss"]).subscribe(function (value) {
            var alert = _this.alertCtrl.create({
                title: value["error"],
                subTitle: msg,
                buttons: [value["dismiss"]]
            });
            alert.present();
        });
    };
    AccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\account\account.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'account\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-list no-lines>\n\n        <ion-item class="profile">\n\n            <ion-avatar item-start (click)="openAction()">\n\n                <img *ngIf="userMe && userMe.image_url" data-src="{{userMe.image_url}}">\n\n                <img *ngIf="!userMe || !userMe.image_url" src="assets/imgs/empty_dp.png">\n\n                <ion-icon name="md-camera"></ion-icon>\n\n            </ion-avatar>\n\n            <div (click)="loginIfNot()">\n\n                <h2>\n\n                    <span *ngIf="userMe" class="text-ellipsis">\n\n                        {{userMe.name}}\n\n                    </span>\n\n                    <span *ngIf="!userMe" class="text-ellipsis">\n\n                        {{\'hey_guest\' | translate}}\n\n                    </span>\n\n                </h2>\n\n                <p *ngIf="userMe" class="text-grey">{{userMe.mobile_number}}</p>\n\n                <p *ngIf="userMe" class="text-grey">{{userMe.email}}</p>\n\n                <p *ngIf="!userMe" class="text-grey" [innerHTML]="\'alert_login_msg\' | translate"></p>\n\n            </div>\n\n        </ion-item>\n\n\n\n        <ion-item (click)="manageaddress()">\n\n            <h2>\n\n                <ion-icon name="ios-pin" class="mr-auto text-thime"></ion-icon>\n\n                <span class="text-ellipsis">{{\'manage_address\' | translate}}</span>\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item (click)="contact()">\n\n            <h2>\n\n                <ion-icon name="ios-mail" class="mr-auto text-thime"></ion-icon>\n\n                <span class="text-ellipsis">{{\'contact_us\' | translate}}</span>\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item (click)="privacy()">\n\n            <h2>\n\n                <ion-icon name="md-lock" class="mr-auto text-thime"></ion-icon>\n\n                <span class="text-ellipsis">{{\'privacy_policy\' | translate}}</span>\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item (click)="about()">\n\n            <h2>\n\n                <ion-icon class="mr-auto text-thime">\n\n                    <img src="assets/imgs/about-icon.png">\n\n                </ion-icon>\n\n                <span class="text-ellipsis">{{\'about_us\' | translate}}</span>\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item (click)="faqs()">\n\n            <h2>\n\n                <ion-icon class="mr-auto text-thime">\n\n                    <img src="assets/imgs/faqs-icon.png">\n\n                </ion-icon>\n\n                <span class="text-ellipsis">{{\'faq\' | translate}}</span>\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item (click)="shareApp()">\n\n            <h2>\n\n                <ion-icon name="share" class="mr-auto text-thime"></ion-icon>\n\n                <span class="text-ellipsis">{{\'share\' | translate}}</span>\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item (click)="chooseLanguage()">\n\n            <h2>\n\n                <ion-icon name="md-globe" class="mr-auto text-thime"></ion-icon>\n\n                <span class="text-ellipsis">{{\'change_language\' | translate}}</span>\n\n            </h2>\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-list no-lines (click)="alertLogout()">\n\n        <ion-item class="sign-out">\n\n            <h2 text-center>\n\n                <strong *ngIf="userMe" class="text-ellipsis text-thime" text-center>\n\n                    {{\'sign_out\' | translate}}\n\n                </strong>\n\n                <strong *ngIf="!userMe" class="text-ellipsis text-thime" text-center>\n\n                    {{\'sign_in\' | translate}}\n\n                </strong>\n\n            </h2>\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\account\account.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_8__providers_firebase_service__["a" /* FirebaseClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__providers_firebase_service__["a" /* FirebaseClient */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_market__["a" /* Market */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], AccountPage);
    return AccountPage;
}());

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_support_request_models__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, service, callNumber, loadingCtrl, toastCtrl, translate) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.callNumber = callNumber;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.subscriptions = [];
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_USER));
        this.supportRequest = new __WEBPACK_IMPORTED_MODULE_3__models_support_request_models__["a" /* SupportRequest */](this.userMe.name, this.userMe.email, "");
    }
    ContactPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ContactPage.prototype.dialSupport = function () {
        var phoneNumber = __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getSetting("support_phone");
        if (phoneNumber) {
            this.callNumber.callNumber(phoneNumber, true).then(function (res) { return console.log('Launched dialer!', res); }).catch(function (err) { return console.log('Error launching dialer', err); });
        }
    };
    ContactPage.prototype.submitSupport = function () {
        var _this = this;
        if (!this.supportRequest.message || !this.supportRequest.message.length) {
            this.translate.get("err_valid_support_msg").subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get("supporting").subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.submitSupport(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.supportRequest).subscribe(function (res) {
                _this.dismissLoading();
                _this.translate.get("supporting_success").subscribe(function (value) {
                    _this.showToast(value);
                });
                _this.navCtrl.pop();
            }, function (err) {
                _this.navCtrl.pop();
                _this.dismissLoading();
                console.log('support', err);
            });
            this.subscriptions.push(subscription);
        }
    };
    ContactPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ContactPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ContactPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\contact\contact.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'contact_us\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <!--    <img src="../../assets/imgs/20.png">-->\n\n    <div class="call-now bg-thime">\n\n        <h6 text-center class=" text-white">{{\'call_to_speak_with_us\' | translate}}</h6>\n\n        <button class="btn text-thime" ion-button round full margin-top margin-bottom icon-start\n\n            (click)="dialSupport()">\n\n            <ion-icon name="md-call" padding-right></ion-icon><strong>{{\'call_now\' | translate}}</strong>\n\n        </button>\n\n    </div>\n\n    <h5 text-center margin-top margin-bottom padding-bottom class="text-thime">{{\'or_write_us_your_issue\' | translate}}\n\n    </h5>\n\n\n\n    <div class="form">\n\n        <ion-list no-lines padding-bottom>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-person" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'your_name\' | translate}}</ion-label>\n\n                <ion-input type="text" [readonly]="true" [(ngModel)]="userMe.name"></ion-input>\n\n            </ion-item>\n\n            <!-- <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-mail" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'your_email\' | translate}}</ion-label>\n\n                <ion-input type="email" [readonly]="true" [(ngModel)]="userMe.email"></ion-input>\n\n            </ion-item> -->\n\n            <ion-item>\n\n                <ion-avatar item-start style="margin-bottom: 3px; margin-right: 28px;">\n\n                    <ion-icon name="md-mail" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey">{{\'your_message\' | translate}}</ion-label>\n\n                <ion-textarea type="text" rows="1" maxLength="500" class="placeholder-color"\n\n                    [(ngModel)]="supportRequest.message">\n\n                </ion-textarea>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <button class="btn" ion-button round full margin-top (click)="submitSupport()">\n\n        {{\'submit\' | translate}}\n\n    </button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\contact\contact.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagelanguagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ManagelanguagePage = /** @class */ (function () {
    function ManagelanguagePage(config, events, app) {
        this.config = config;
        this.events = events;
        this.app = app;
        this.defaultLanguageCode = "en";
        var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
        this.defaultLanguageCode = (defaultLang && defaultLang.length) ? defaultLang : this.config.availableLanguages[0].code;
    }
    ManagelanguagePage.prototype.onLanguageClick = function (language) {
        this.defaultLanguageCode = language.code;
    };
    ManagelanguagePage.prototype.languageConfirm = function () {
        this.events.publish('language:selection', this.defaultLanguageCode);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE, this.defaultLanguageCode);
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
    };
    ManagelanguagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-managelanguage',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\managelanguage\managelanguage.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'change_language\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<ion-list no-lines radio-group [(ngModel)]="defaultLanguageCode" required>\n		<ion-item *ngFor="let language of config.availableLanguages" (click)="onLanguageClick(language)">\n			<ion-label>\n				<h3>{{language.name}}</h3>\n			</ion-label>\n			<ion-radio value="{{language.code}}" item-end></ion-radio>\n		</ion-item>\n	</ion-list>\n</ion-content>\n\n\n<ion-footer>\n	<button class="btn" ion-button full margin-top margin-bottom\n		(click)="languageConfirm()">{{\'confirm\' | translate}}</button>\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\managelanguage\managelanguage.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], ManagelanguagePage);
    return ManagelanguagePage;
}());

//# sourceMappingURL=managelanguage.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FaqsPage = /** @class */ (function () {
    function FaqsPage(service, loadingCtrl) {
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.loadingShown = false;
        this.faqs = new Array();
        this.subscriptions = [];
        var savedFaqs = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_FAQS));
        if (savedFaqs) {
            this.faqs = savedFaqs;
        }
        else {
            this.presentLoading("Just a moment");
        }
        this.refreshFaqs();
    }
    FaqsPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    FaqsPage.prototype.refreshFaqs = function () {
        var _this = this;
        this.subscriptions.push(this.service.faqs().subscribe(function (res) {
            _this.faqs = res;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_FAQS, JSON.stringify(_this.faqs));
            _this.dismissLoading();
        }, function (err) {
            console.log('faqs', err);
            _this.dismissLoading();
        }));
    };
    FaqsPage.prototype.expandFaq = function (faq) {
        this.curFaqId = (this.curFaqId == faq.id) ? -1 : faq.id;
    };
    FaqsPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    FaqsPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    FaqsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-faqs',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\faqs\faqs.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'faq\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n    <ion-list no-lines>\n        <ion-item *ngFor="let faq of faqs" [ngClass]="faq.id == curFaqId ? \'active\' : \'\' " (click)="expandFaq(faq)">\n            <h2>\n                <span class="text-ellipsis">{{faq.title}}</span>\n                <ion-icon name="ios-arrow-down-outline"></ion-icon>\n            </h2>\n            <p *ngIf="faq.id != curFaqId">{{faq.short_description}}</p>\n            <p *ngIf="faq.id == curFaqId">{{faq.description}}</p>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\faqs\faqs.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */]])
    ], FaqsPage);
    return FaqsPage;
}());

//# sourceMappingURL=faqs.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__requests_requests__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_account__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_chat__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__notifications_notifications__ = __webpack_require__(432);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TabsPage = /** @class */ (function () {
    function TabsPage(service) {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__requests_requests__["a" /* RequestsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_8__notifications_notifications__["a" /* NotificationsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__chat_chat__["a" /* ChatPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* AccountPage */];
        service.logActivity(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log('logActivity', err);
        });
    }
    TabsPage.prototype.ionViewDidEnter = function () {
        this.tabRef.select(2);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["v" /* Tabs */])
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\tabs\tabs.html"*/'<ion-tabs #myTabs>\n    <ion-tab [root]="tab1Root" tabTitle="{{\'requests\' | translate}}" tabIcon="md-calendar" tabsHideOnSubPages="true">\n    </ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="{{\'notis\' | translate}}" tabIcon="md-notifications" tabsHideOnSubPages="true">\n    </ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="{{\'categories\' | translate}}" tabIcon="md-apps" tabsHideOnSubPages="true">\n    </ion-tab>\n    <ion-tab [root]="tab4Root" tabTitle="{{\'chat\' | translate}}" tabIcon="md-chatboxes" tabsHideOnSubPages="true">\n    </ion-tab>\n    <ion-tab [root]="tab5Root" tabTitle="{{\'account\' | translate}}" tabIcon="md-person" tabsHideOnSubPages="true">\n    </ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\tabs\tabs.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_chat_models__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signin_signin__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, translate, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.chats = new Array();
        this.chatsAll = new Array();
        var component = this;
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_USER));
        if (this.userMe) {
            this.myInboxRef = __WEBPACK_IMPORTED_MODULE_6_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].REF_INBOX).child(this.userMe.id + "hc");
            this.myInboxRef.on('child_added', function (data) {
                var newMessage = data.val();
                if (newMessage && newMessage.id && newMessage.chatId) {
                    var newChat = __WEBPACK_IMPORTED_MODULE_3__models_chat_models__["a" /* Chat */].fromMessage(newMessage, (component.userMe.id + "hc") == newMessage.senderId);
                    component.chatsAll.push(newChat);
                    component.chatsAll.sort(function (one, two) { return (one.dateTimeStamp > two.dateTimeStamp ? -1 : 1); });
                    component.chats = component.chatsAll;
                    component.dismissToast();
                }
            });
            this.myInboxRef.on('child_changed', function (data) {
                var oldMessage = data.val();
                if (oldMessage && oldMessage.id && oldMessage.chatId) {
                    var oldChat = __WEBPACK_IMPORTED_MODULE_3__models_chat_models__["a" /* Chat */].fromMessage(oldMessage, ((component.userMe.id + "hc") == oldMessage.senderId));
                    var oldIndex = -1;
                    for (var i = 0; i < component.chatsAll.length; i++) {
                        if (oldChat.chatId == component.chatsAll[i].chatId) {
                            oldIndex = i;
                            break;
                        }
                    }
                    if (oldIndex != -1) {
                        component.chatsAll.splice(oldIndex, 1);
                        component.chatsAll.unshift(oldChat);
                        component.chats = component.chatsAll;
                    }
                }
            });
            this.translate.get("just_moment").subscribe(function (value) {
                _this.showToast(value);
            });
        }
    }
    ChatPage.prototype.loginPage = function () {
        if (!this.userMe)
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__signin_signin__["a" /* SigninPage */]);
    };
    ChatPage.prototype.chatscreen = function (chat) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__["a" /* ChatscreenPage */], { chat: chat });
    };
    ChatPage.prototype.showToast = function (message) {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        this.toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        this.toast.present();
    };
    ChatPage.prototype.dismissToast = function () {
        if (this.toast) {
            this.toast.dismiss();
            this.toast = null;
        }
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\chat\chat.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'chat\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div class="empty-view" *ngIf="(!chats || !chats.length)">\n\n        <div style="text-align:center" (click)="loginPage()">\n\n            <img src="assets/imgs/empty_category.png" alt="no offers" />\n\n            <span *ngIf="userMe" style="color:#9E9E9E; font-weight:bold;">\n\n                {{\'no_chats_to_show\' | translate}}\n\n            </span>\n\n            <span *ngIf="!userMe" style="color:#9E9E9E; font-weight:bold;">\n\n                {{\'alert_login_short\' | translate}}\n\n            </span>\n\n        </div>\n\n    </div>\n\n    <ion-list no-lines>\n\n        <ion-item *ngFor="let chat of chats" (click)="chatscreen(chat)">\n\n            <ion-avatar item-start>\n\n                <img *ngIf="chat.chatImage && chat.chatImage.length" data-src="{{chat.chatImage}}">\n\n                <img *ngIf="!chat.chatImage || !chat.chatImage.length" src="assets/imgs/empty_dp.png">\n\n            </ion-avatar>\n\n            <h2><span class="text-ellipsis">{{chat.chatName}}</span>\n\n                <span class="ml-auto small">{{chat.timeDiff}}</span>\n\n            </h2>\n\n            <p class="text-grey text-ellipsis">{{chat.lastMessage}}</p>\n\n        </ion-item>\n\n    </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\chat\chat.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_helper_models__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationsPage = /** @class */ (function () {
    function NotificationsPage() {
        this.notifications = new Array();
    }
    NotificationsPage.prototype.ionViewDidEnter = function () {
        var notifications = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS));
        if (notifications && notifications.length) {
            var locale = __WEBPACK_IMPORTED_MODULE_2__models_helper_models__["a" /* Helper */].getLocale();
            for (var _i = 0, notifications_1 = notifications; _i < notifications_1.length; _i++) {
                var noti = notifications_1[_i];
                noti.time = __WEBPACK_IMPORTED_MODULE_2__models_helper_models__["a" /* Helper */].formatMillisDate(Number(noti.time), locale);
                if (noti.title.toLowerCase().includes("pending")) {
                    //noti.title = "Pending";
                }
                else if (noti.title.toLowerCase().includes("accepted")) {
                    //noti.title = "Accepted";
                    noti.colorclass = "completed";
                }
                else if (noti.title.toLowerCase().includes("onway")) {
                    //noti.title = "On the way";
                }
                else if (noti.title.toLowerCase().includes("ongoing")) {
                    //noti.title = "On going";
                }
                else if (noti.title.toLowerCase().includes("complete")) {
                    //noti.title = "Complete";
                    noti.colorclass = "completed";
                }
                else if (noti.title.toLowerCase().includes("cancelled")) {
                    //noti.title = "Cancelled";
                    noti.colorclass = "cancelled";
                }
                else if (noti.title.toLowerCase().includes("rejected")) {
                    //noti.title = "Rejected";
                    noti.colorclass = "cancelled";
                }
                else if (noti.title.toLowerCase().includes("message")) {
                    //noti.title = "New Message";
                    noti.colorclass = "new_message";
                }
            }
            this.notifications = notifications.reverse();
        }
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\notifications\notifications.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>{{\'notis\' | translate}}</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n	<div class="empty-view" *ngIf="(!notifications || !notifications.length)">\n\n		<div style="text-align:center">\n\n			<img src="assets/imgs/empty_notification.png" alt="no offers" />\n\n			<span style="color:#9E9E9E; font-weight:bold;">\n\n				{{\'empty_notifications\' | translate}}\n\n			</span>\n\n		</div>\n\n	</div>\n\n	<ion-list *ngIf="notifications && notifications.length" no-lines>\n\n		<ion-item *ngFor="let item of notifications">\n\n			<ion-label>\n\n				<h2 class="d-flex"><span class="item_title {{item.colorclass}}">{{item.title}}</span> <span class="end" text-end>{{item.time}}</span></h2>\n\n				<p>{{item.detail}}</p>\n\n			</ion-label>\n\n		</ion-item>\n\n	</ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\notifications\notifications.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(442);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_add_address_title_add_address_title__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_account_account__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_booking_booking__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_booknow_booknow__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_category_category__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_chatscreen_chatscreen__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_contact_contact__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_listofplumber_listofplumber__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_manageaddress_manageaddress__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_privacy_privacy__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_plumberprofile_plumberprofile__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_requests_requests__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_signup_signup__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_signin_signin__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_tabs_tabs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_otp_otp__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_facebook__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_google_plus__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__app_config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_common_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_rate_rate__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_geolocation__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_network__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_connectivity_service__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_google_maps__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_selectarea_selectarea__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_onesignal__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_call_number__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ngx_translate_http_loader__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_diagnostic__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_track_track__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_managelanguage_managelanguage__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_in_app_browser__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_image_picker__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_crop__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_file__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_faqs_faqs__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_categorysearch_categorysearch__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_ionic_img_viewer__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_notifications_notifications__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_app_version__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_market__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_social_sharing__ = __webpack_require__(430);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_37__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_add_address_title_add_address_title__["a" /* Add_address_titlePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_booknow_booknow__["a" /* BooknowPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_chatscreen_chatscreen__["a" /* ChatscreenPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_listofplumber_listofplumber__["a" /* ListofplumberPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_manageaddress_manageaddress__["a" /* ManageaddressPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_plumberprofile_plumberprofile__["a" /* PlumberprofilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_rate_rate__["a" /* RatePage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_selectarea_selectarea__["a" /* SelectareaPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_track_track__["a" /* TrackPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_faqs_faqs__["a" /* FaqsPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_categorysearch_categorysearch__["a" /* CategorySearchPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_27__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_47_ionic_img_viewer__["b" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_36__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_36__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_27__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_add_address_title_add_address_title__["a" /* Add_address_titlePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_booknow_booknow__["a" /* BooknowPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_chatscreen_chatscreen__["a" /* ChatscreenPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_listofplumber_listofplumber__["a" /* ListofplumberPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_manageaddress_manageaddress__["a" /* ManageaddressPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_plumberprofile_plumberprofile__["a" /* PlumberprofilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_rate_rate__["a" /* RatePage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_selectarea_selectarea__["a" /* SelectareaPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_track_track__["a" /* TrackPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_faqs_faqs__["a" /* FaqsPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_categorysearch_categorysearch__["a" /* CategorySearchPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_31__providers_connectivity_service__["a" /* Connectivity */],
                __WEBPACK_IMPORTED_MODULE_32__providers_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_36__ngx_translate_core__["c" /* TranslateService */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_49__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_50__ionic_native_market__["a" /* Market */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_social_sharing__["a" /* SocialSharing */],
                { provide: __WEBPACK_IMPORTED_MODULE_26__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_26__app_config__["b" /* BaseAppConfig */] },
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_notification_models__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var MyApp = /** @class */ (function () {
    function MyApp(config, platform, events, oneSignal, translate, statusBar, splashScreen, clientService) {
        var _this = this;
        this.config = config;
        this.platform = platform;
        this.oneSignal = oneSignal;
        this.translate = translate;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.clientService = clientService;
        this.rtlSide = "left";
        //window.localStorage.setItem(Constants.KEY_LOCATION, "{\"name\":\"Laxmi Nagar, New Delhi, Delhi, India\",\"lat\":28.689638299999995,\"lng\":77.29134669999996}");
        this.initializeApp();
        this.refreshSettings();
        events.subscribe('language:selection', function (language) {
            _this.clientService.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_TOKEN), { language: language }).subscribe(function (res) {
                console.log(res);
            }, function (err) {
                console.log('update_user', err);
            });
            _this.globalize(language);
        });
        events.subscribe("user:login", function (user) {
            _this.userMe = user;
            if (_this.platform.is('cordova') && _this.userMe)
                _this.updatePlayerId();
        });
    }
    MyApp.prototype.getSuitableLanguage = function (language) {
        window.localStorage.setItem("locale", language);
        language = language.substring(0, 2).toLowerCase();
        console.log('check for: ' + language);
        return this.config.availableLanguages.some(function (x) { return x.code == language; }) ? language : 'en';
    };
    MyApp.prototype.refreshSettings = function () {
        this.clientService.getSettings().subscribe(function (res) {
            console.log('setting_setup_success', res);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_SETTING, JSON.stringify(res));
        }, function (err) {
            console.log('setting_setup_error', err);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.show();
            __WEBPACK_IMPORTED_MODULE_11_firebase___default.a.initializeApp({
                apiKey: _this.config.firebaseConfig.apiKey,
                authDomain: _this.config.firebaseConfig.authDomain,
                databaseURL: _this.config.firebaseConfig.databaseURL,
                projectId: _this.config.firebaseConfig.projectId,
                storageBucket: _this.config.firebaseConfig.storageBucket,
                messagingSenderId: _this.config.firebaseConfig.messagingSenderId
            });
            if (_this.platform.is('cordova'))
                _this.initOneSignal();
            _this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_USER));
            setTimeout(function () {
                _this.splashScreen.hide();
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */]);
                if (_this.platform.is('cordova') && _this.userMe)
                    _this.updatePlayerId();
            }, 3000);
            var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
            _this.globalize(defaultLang);
        });
    };
    MyApp.prototype.globalize = function (languagePriority) {
        this.translate.setDefaultLang("en");
        var defaultLangCode = this.config.availableLanguages[0].code;
        this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
        this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_LOCALE, languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    };
    MyApp.prototype.setDirectionAccordingly = function (lang) {
        switch (lang) {
            case 'ar': {
                this.platform.setDir('ltr', false);
                this.platform.setDir('rtl', true);
                this.rtlSide = "right";
                break;
            }
            case 'iw': {
                this.platform.setDir('ltr', false);
                this.platform.setDir('rtl', true);
                this.rtlSide = "right";
                break;
            }
            default: {
                this.platform.setDir('rtl', false);
                this.platform.setDir('ltr', true);
                this.rtlSide = "left";
                break;
            }
        }
        // this.translate.use('ar');
        // this.platform.setDir('ltr', false);
        // this.platform.setDir('rtl', true);
    };
    MyApp.prototype.initOneSignal = function () {
        if (this.config.oneSignalAppId && this.config.oneSignalAppId.length && this.config.oneSignalGPSenderId && this.config.oneSignalGPSenderId.length) {
            this.oneSignal.startInit(this.config.oneSignalAppId, this.config.oneSignalGPSenderId);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                console.log(data);
                var notifications = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS));
                if (!notifications)
                    notifications = new Array();
                notifications.push(new __WEBPACK_IMPORTED_MODULE_10__models_notification_models__["a" /* MyNotification */]((data.payload.additionalData && data.payload.additionalData.title) ? data.payload.additionalData.title : data.payload.title, (data.payload.additionalData && data.payload.additionalData.body) ? data.payload.additionalData.body : data.payload.body, String(new Date().getTime())));
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS, JSON.stringify(notifications));
                var noti_ids_processed = JSON.parse(window.localStorage.getItem("noti_ids_processed"));
                if (!noti_ids_processed)
                    noti_ids_processed = new Array();
                noti_ids_processed.push(data.payload.notificationID);
                window.localStorage.setItem("noti_ids_processed", JSON.stringify(noti_ids_processed));
            });
            this.oneSignal.handleNotificationOpened().subscribe(function (data) {
                var noti_ids_processed = JSON.parse(window.localStorage.getItem("noti_ids_processed"));
                if (!noti_ids_processed)
                    noti_ids_processed = new Array();
                var index = noti_ids_processed.indexOf(data.notification.payload.notificationID);
                if (index == -1) {
                    var notifications = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS));
                    if (!notifications)
                        notifications = new Array();
                    notifications.push(new __WEBPACK_IMPORTED_MODULE_10__models_notification_models__["a" /* MyNotification */]((data.notification.payload.additionalData && data.notification.payload.additionalData.title) ? data.notification.payload.additionalData.title : data.notification.payload.title, (data.notification.payload.additionalData && data.notification.payload.additionalData.body) ? data.notification.payload.additionalData.body : data.notification.payload.body, String(new Date().getTime())));
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS, JSON.stringify(notifications));
                }
                else {
                    noti_ids_processed.splice(index, 1);
                    window.localStorage.setItem("noti_ids_processed", JSON.stringify(noti_ids_processed));
                }
            });
            this.oneSignal.endInit();
        }
    };
    MyApp.prototype.updatePlayerId = function () {
        var _this = this;
        this.oneSignal.getIds().then(function (id) {
            if (id && id.userId) {
                __WEBPACK_IMPORTED_MODULE_11_firebase___default.a.database().ref(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].REF_USERS_FCM_IDS).child((_this.userMe.id + "hc")).set(id.userId);
                var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
                _this.clientService.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_TOKEN), {
                    fcm_registration_id: id.userId,
                    language: (defaultLang && defaultLang.length) ? defaultLang : _this.config.availableLanguages[0].code
                }).subscribe(function (res) {
                    console.log('updateUser', res);
                }, function (err) {
                    console.log('updateUser', err);
                });
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_client_service__["a" /* ClientService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_9__node_modules_ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__providers_client_service__["a" /* ClientService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 256,
	"./af.js": 256,
	"./ar": 257,
	"./ar-dz": 258,
	"./ar-dz.js": 258,
	"./ar-kw": 259,
	"./ar-kw.js": 259,
	"./ar-ly": 260,
	"./ar-ly.js": 260,
	"./ar-ma": 261,
	"./ar-ma.js": 261,
	"./ar-sa": 262,
	"./ar-sa.js": 262,
	"./ar-tn": 263,
	"./ar-tn.js": 263,
	"./ar.js": 257,
	"./az": 264,
	"./az.js": 264,
	"./be": 265,
	"./be.js": 265,
	"./bg": 266,
	"./bg.js": 266,
	"./bm": 267,
	"./bm.js": 267,
	"./bn": 268,
	"./bn.js": 268,
	"./bo": 269,
	"./bo.js": 269,
	"./br": 270,
	"./br.js": 270,
	"./bs": 271,
	"./bs.js": 271,
	"./ca": 272,
	"./ca.js": 272,
	"./cs": 273,
	"./cs.js": 273,
	"./cv": 274,
	"./cv.js": 274,
	"./cy": 275,
	"./cy.js": 275,
	"./da": 276,
	"./da.js": 276,
	"./de": 277,
	"./de-at": 278,
	"./de-at.js": 278,
	"./de-ch": 279,
	"./de-ch.js": 279,
	"./de.js": 277,
	"./dv": 280,
	"./dv.js": 280,
	"./el": 281,
	"./el.js": 281,
	"./en-SG": 282,
	"./en-SG.js": 282,
	"./en-au": 283,
	"./en-au.js": 283,
	"./en-ca": 284,
	"./en-ca.js": 284,
	"./en-gb": 285,
	"./en-gb.js": 285,
	"./en-ie": 286,
	"./en-ie.js": 286,
	"./en-il": 287,
	"./en-il.js": 287,
	"./en-nz": 288,
	"./en-nz.js": 288,
	"./eo": 289,
	"./eo.js": 289,
	"./es": 290,
	"./es-do": 291,
	"./es-do.js": 291,
	"./es-us": 292,
	"./es-us.js": 292,
	"./es.js": 290,
	"./et": 293,
	"./et.js": 293,
	"./eu": 294,
	"./eu.js": 294,
	"./fa": 295,
	"./fa.js": 295,
	"./fi": 296,
	"./fi.js": 296,
	"./fo": 297,
	"./fo.js": 297,
	"./fr": 298,
	"./fr-ca": 299,
	"./fr-ca.js": 299,
	"./fr-ch": 300,
	"./fr-ch.js": 300,
	"./fr.js": 298,
	"./fy": 301,
	"./fy.js": 301,
	"./ga": 302,
	"./ga.js": 302,
	"./gd": 303,
	"./gd.js": 303,
	"./gl": 304,
	"./gl.js": 304,
	"./gom-latn": 305,
	"./gom-latn.js": 305,
	"./gu": 306,
	"./gu.js": 306,
	"./he": 307,
	"./he.js": 307,
	"./hi": 308,
	"./hi.js": 308,
	"./hr": 309,
	"./hr.js": 309,
	"./hu": 310,
	"./hu.js": 310,
	"./hy-am": 311,
	"./hy-am.js": 311,
	"./id": 312,
	"./id.js": 312,
	"./is": 313,
	"./is.js": 313,
	"./it": 314,
	"./it-ch": 315,
	"./it-ch.js": 315,
	"./it.js": 314,
	"./ja": 316,
	"./ja.js": 316,
	"./jv": 317,
	"./jv.js": 317,
	"./ka": 318,
	"./ka.js": 318,
	"./kk": 319,
	"./kk.js": 319,
	"./km": 320,
	"./km.js": 320,
	"./kn": 321,
	"./kn.js": 321,
	"./ko": 322,
	"./ko.js": 322,
	"./ku": 323,
	"./ku.js": 323,
	"./ky": 324,
	"./ky.js": 324,
	"./lb": 325,
	"./lb.js": 325,
	"./lo": 326,
	"./lo.js": 326,
	"./lt": 327,
	"./lt.js": 327,
	"./lv": 328,
	"./lv.js": 328,
	"./me": 329,
	"./me.js": 329,
	"./mi": 330,
	"./mi.js": 330,
	"./mk": 331,
	"./mk.js": 331,
	"./ml": 332,
	"./ml.js": 332,
	"./mn": 333,
	"./mn.js": 333,
	"./mr": 334,
	"./mr.js": 334,
	"./ms": 335,
	"./ms-my": 336,
	"./ms-my.js": 336,
	"./ms.js": 335,
	"./mt": 337,
	"./mt.js": 337,
	"./my": 338,
	"./my.js": 338,
	"./nb": 339,
	"./nb.js": 339,
	"./ne": 340,
	"./ne.js": 340,
	"./nl": 341,
	"./nl-be": 342,
	"./nl-be.js": 342,
	"./nl.js": 341,
	"./nn": 343,
	"./nn.js": 343,
	"./pa-in": 344,
	"./pa-in.js": 344,
	"./pl": 345,
	"./pl.js": 345,
	"./pt": 346,
	"./pt-br": 347,
	"./pt-br.js": 347,
	"./pt.js": 346,
	"./ro": 348,
	"./ro.js": 348,
	"./ru": 349,
	"./ru.js": 349,
	"./sd": 350,
	"./sd.js": 350,
	"./se": 351,
	"./se.js": 351,
	"./si": 352,
	"./si.js": 352,
	"./sk": 353,
	"./sk.js": 353,
	"./sl": 354,
	"./sl.js": 354,
	"./sq": 355,
	"./sq.js": 355,
	"./sr": 356,
	"./sr-cyrl": 357,
	"./sr-cyrl.js": 357,
	"./sr.js": 356,
	"./ss": 358,
	"./ss.js": 358,
	"./sv": 359,
	"./sv.js": 359,
	"./sw": 360,
	"./sw.js": 360,
	"./ta": 361,
	"./ta.js": 361,
	"./te": 362,
	"./te.js": 362,
	"./tet": 363,
	"./tet.js": 363,
	"./tg": 364,
	"./tg.js": 364,
	"./th": 365,
	"./th.js": 365,
	"./tl-ph": 366,
	"./tl-ph.js": 366,
	"./tlh": 367,
	"./tlh.js": 367,
	"./tr": 368,
	"./tr.js": 368,
	"./tzl": 369,
	"./tzl.js": 369,
	"./tzm": 370,
	"./tzm-latn": 371,
	"./tzm-latn.js": 371,
	"./tzm.js": 370,
	"./ug-cn": 372,
	"./ug-cn.js": 372,
	"./uk": 373,
	"./uk.js": 373,
	"./ur": 374,
	"./ur.js": 374,
	"./uz": 375,
	"./uz-latn": 376,
	"./uz-latn.js": 376,
	"./uz.js": 375,
	"./vi": 377,
	"./vi.js": 377,
	"./x-pseudo": 378,
	"./x-pseudo.js": 378,
	"./yo": 379,
	"./yo.js": 379,
	"./zh-cn": 380,
	"./zh-cn.js": 380,
	"./zh-hk": 381,
	"./zh-hk.js": 381,
	"./zh-tw": 382,
	"./zh-tw.js": 382
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 495;

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_models__ = __webpack_require__(27);

var Message = /** @class */ (function () {
    function Message() {
    }
    Message.prototype.fromRow = function (arg0) {
        this.senderName = arg0.senderName;
        this.senderImage = arg0.senderImage;
        this.senderStatus = arg0.senderStatus;
        this.recipientName = arg0.recipientName;
        this.recipientImage = arg0.recipientImage;
        this.recipientStatus = arg0.recipientStatus;
        this.recipientId = arg0.recipientId;
        this.senderId = arg0.senderId;
        this.chatId = arg0.chatId;
        this.id = arg0.id;
        this.body = arg0.body;
        this.dateTimeStamp = arg0.dateTimeStamp;
        this.timeDiff = __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].formatMillisDateTime(Number(this.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].getLocale());
        this.delivered = arg0.delivered == 1;
        this.sent = arg0.sent == 1;
    };
    return Message;
}());

//# sourceMappingURL=message.models.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentRequest; });
var AppointmentRequest = /** @class */ (function () {
    function AppointmentRequest() {
    }
    return AppointmentRequest;
}());

//# sourceMappingURL=appointment-request.models.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
var Address = /** @class */ (function () {
    function Address() {
    }
    return Address;
}());

//# sourceMappingURL=address.models.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressCreateRequest; });
var AddressCreateRequest = /** @class */ (function () {
    function AddressCreateRequest() {
    }
    return AddressCreateRequest;
}());

//# sourceMappingURL=address-create-request.models.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BaseAppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]("app.config");
var BaseAppConfig = {
    appName: "Sahayi customer",
    apiBase: "https://sahayi.app/sahayi/handyman/public/",
    googleApiKey: "AIzaSyDzMnF5al4CDKkNY-7y4xnnxlhRpEzA7Wk",
    oneSignalAppId: "e6c02420-f140-4bcb-850c-6ee21625501e",
    oneSignalGPSenderId: "533579646154",
    availableLanguages: [{
            code: 'en',
            name: 'English'
        }, {
            code: 'ar',
            name: 'عربى'
        }],
    firebaseConfig: {
        webApplicationId: "1:1032372413215:web:c6790ab8a40a872a18862a",
        apiKey: "AIzaSyBjrfusj1lGXJdhM-5YVkhcTMcz4V1Z2Bg",
        authDomain: "sahayiapp-18c8c.firebaseapp.com",
        databaseURL: "https://sahayiapp-18c8c.firebaseio.com",
        projectId: "sahayiapp-18c8c",
        storageBucket: "sahayiapp-18c8c.appspot.com",
        messagingSenderId: "1032372413215",
    },
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpRequest; });
var SignUpRequest = /** @class */ (function () {
    function SignUpRequest(name, email, password, mobile_number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.mobile_number = mobile_number;
        this.role = "customer";
    }
    return SignUpRequest;
}());

//# sourceMappingURL=signup-request.models.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocialLoginRequest; });
var SocialLoginRequest = /** @class */ (function () {
    function SocialLoginRequest(token, platform, os) {
        this.token = token;
        this.platform = platform;
        this.os = os;
    }
    return SocialLoginRequest;
}());

//# sourceMappingURL=sociallogin-request.models.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RateRequest; });
var RateRequest = /** @class */ (function () {
    function RateRequest() {
    }
    return RateRequest;
}());

//# sourceMappingURL=rate-request.models.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportRequest; });
var SupportRequest = /** @class */ (function () {
    function SupportRequest(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
    return SupportRequest;
}());

//# sourceMappingURL=support-request.models.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FirebaseClient = /** @class */ (function () {
    function FirebaseClient() {
    }
    FirebaseClient.prototype.uploadBlob = function (blob) {
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            storageRef.child(new Date().getTime().toString()).put(blob).then(function (snapshot) {
                console.log(snapshot);
                __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) { return resolve(url); }).catch(function (err) { return reject(err); });
            }, function (err) {
                reject(err);
            });
        });
    };
    FirebaseClient.prototype.uploadFile = function (file) {
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            storageRef.child(new Date().getTime().toString()).put(file).then(function (snapshot) {
                console.log(snapshot);
                __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) { return resolve(url); }).catch(function (err) { return reject(err); });
            }, function (err) {
                reject(err);
            });
        });
    };
    FirebaseClient.prototype.uploadImage = function (imageURI) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            var imageRef = storageRef.child('image').child('imageName');
            _this.encodeImageUri(imageURI, function (image64) {
                imageRef.putString(image64, 'data_url').then(function (snapshot) {
                    resolve(snapshot.downloadURL);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    FirebaseClient.prototype.encodeImageUri = function (imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            var aux = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
        };
        img.src = imageUri;
    };
    FirebaseClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], FirebaseClient);
    return FirebaseClient;
}());

//# sourceMappingURL=firebase.service.js.map

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyNotification; });
var MyNotification = /** @class */ (function () {
    function MyNotification(title, detail, time) {
        this.title = title;
        this.detail = detail;
        this.time = time;
    }
    return MyNotification;
}());

//# sourceMappingURL=notification.models.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__otp_otp__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__privacy_privacy__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_sociallogin_request_models__ = __webpack_require__(602);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};














var SigninPage = /** @class */ (function () {
    function SigninPage(config, navCtrl, loadingCtrl, toastCtrl, alertCtrl, service, translate, facebook, google, platform, app, events) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.translate = translate;
        this.facebook = facebook;
        this.google = google;
        this.platform = platform;
        this.app = app;
        this.events = events;
        this.loadingShown = false;
        this.getCountries();
        this.changeHint();
    }
    SigninPage.prototype.changeHint = function () {
        var _this = this;
        this.phoneNumber = "";
        if (this.countryCode && this.countryCode.length) {
            this.translate.get('enter_phone_number_exluding').subscribe(function (value) {
                _this.phoneNumberHint = value + " (+" + _this.countryCode + ")";
            });
        }
        else {
            this.translate.get('enter_phone_number').subscribe(function (value) {
                _this.phoneNumberHint = value;
            });
        }
    };
    SigninPage.prototype.getCountries = function () {
        var _this = this;
        this.service.getCountries().subscribe(function (data) {
            _this.countries = data;
        }, function (err) {
            console.log(err);
        });
    };
    SigninPage.prototype.privacy = function () {
        var _this = this;
        var terms = __WEBPACK_IMPORTED_MODULE_12__models_helper_models__["a" /* Helper */].getSetting("terms");
        if (terms && terms.length) {
            this.translate.get('terms_conditions').subscribe(function (value) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__privacy_privacy__["a" /* PrivacyPage */], { toShow: terms, heading: value });
            });
        }
    };
    SigninPage.prototype.alertPhone = function () {
        var _this = this;
        if (!this.countryCode || !this.countryCode.length) {
            this.translate.get("select_country").subscribe(function (value) { return _this.showToast(value); });
            return;
        }
        if (!this.phoneNumber || !this.phoneNumber.length) {
            this.showToast(this.phoneNumberHint);
            return;
        }
        this.translate.get(['alert_phone', 'no', 'yes']).subscribe(function (text) {
            _this.phoneNumberFull = "+" + _this.countryCode + _this.phoneNumber;
            var alert = _this.alertCtrl.create({
                title: _this.phoneNumberFull,
                message: text['alert_phone'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }, {
                        text: text['yes'],
                        handler: function () {
                            _this.checkIfExists();
                        }
                    }]
            });
            alert.present();
        });
    };
    SigninPage.prototype.checkIfExists = function () {
        var _this = this;
        this.translate.get('just_moment').subscribe(function (value) {
            _this.presentLoading(value);
            _this.service.checkUser({ mobile_number: _this.phoneNumberFull, role: "customer" }).subscribe(function (res) {
                console.log(res);
                _this.dismissLoading();
                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_7__otp_otp__["a" /* OtpPage */], { phoneNumberFull: _this.phoneNumberFull });
            }, function (err) {
                console.log(err);
                _this.dismissLoading();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */], { code: _this.countryCode, phone: _this.phoneNumber });
            });
        });
    };
    SigninPage.prototype.signInFacebook = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.translate.get('logging_facebook').subscribe(function (value) {
                _this.presentLoading(value);
                var os = _this.platform.is('ios') ? 'ios' : 'android';
                _this.facebook.login(["public_profile", 'email']).then(function (response) {
                    console.log("fb_success", JSON.stringify(response));
                    _this.translate.get('verifying_user').subscribe(function (value) {
                        _this.showToast(value);
                        _this.service.loginSocial(new __WEBPACK_IMPORTED_MODULE_13__models_sociallogin_request_models__["a" /* SocialLoginRequest */](response.authResponse.accessToken, "facebook", os)).subscribe(function (res) {
                            _this.dismissLoading();
                            _this.loginSocialSuccess(res);
                        }, function (err) {
                            _this.dismissLoading();
                            console.log(err);
                            if (err && err.status && err.status == 404) {
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
                            }
                            else {
                                _this.showToast(err.error.message);
                            }
                        });
                    });
                }).catch(function (error) {
                    console.log("fb_error", error);
                    _this.showToast("Facebook login failed");
                    _this.dismissLoading();
                });
            });
        }
    };
    SigninPage.prototype.signInGoogle = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.translate.get('logging_google').subscribe(function (value) {
                _this.presentLoading(value);
                var os = _this.platform.is('ios') ? 'ios' : 'android';
                _this.google.login({
                    'webClientId': _this.config.firebaseConfig.webApplicationId,
                    'offline': false,
                    'scopes': 'profile email'
                }).then(function (googleCredential) {
                    console.log('google_success', JSON.stringify(googleCredential));
                    _this.translate.get('verifying_user').subscribe(function (value) {
                        _this.showToast(value);
                        _this.service.loginSocial(new __WEBPACK_IMPORTED_MODULE_13__models_sociallogin_request_models__["a" /* SocialLoginRequest */](googleCredential.idToken, "google", os)).subscribe(function (res) {
                            _this.dismissLoading();
                            _this.loginSocialSuccess(res);
                        }, function (err) {
                            _this.dismissLoading();
                            console.log(err);
                            if (err && err.status && err.status == 404) {
                                if (googleCredential.displayName && googleCredential.email) {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */], { name: googleCredential.displayName, email: googleCredential.email });
                                }
                                else {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
                                }
                            }
                            else {
                                _this.showToast(err.error.message);
                            }
                        });
                    });
                }).catch(function (err) {
                    console.log('google_fail', err);
                    _this.dismissLoading();
                });
            });
        }
    };
    SigninPage.prototype.loginSocialSuccess = function (res) {
        if (res.user.mobile_verified == 1) {
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_USER, JSON.stringify(res.user));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_TOKEN, res.token);
            this.events.publish('user:login', res.user);
            this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a" /* TabsPage */]);
        }
        else {
            this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_7__otp_otp__["a" /* OtpPage */], { phoneNumberFull: res.user.mobile_number });
        }
    };
    SigninPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SigninPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    SigninPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(["error", "dismiss"]).subscribe(function (value) {
            var alert = _this.alertCtrl.create({
                title: value["error"],
                subTitle: msg,
                buttons: [value["dismiss"]]
            });
            alert.present();
        });
    };
    SigninPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\signin\signin.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'sign_in\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="logo-box">\n\n        <div class="logo">\n\n            <img src="assets/imgs/logo.jpeg">\n\n            <!-- <h1 class="text-white">{{config.appName}}</h1> -->\n\n        </div>\n\n    </div>\n\n\n\n    <p class="text-grey" text-center>{{\'sign_in_or_sign_up_to_continue\' | translate}}</p>\n\n\n\n    <div class="form">\n\n        <ion-list inset padding-bottom>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-globe" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label floating>{{\'select_country\' | translate}}</ion-label>\n\n                <ion-select [(ngModel)]="countryCode" multiple="false" class="text-thime" [okText]="\'okay\' | translate"\n\n                    [cancelText]="\'cancel\' | translate" (ionChange)="changeHint()">\n\n                    <ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries">{{country.name}}\n\n                    </ion-option>\n\n                </ion-select>\n\n                <!-- <ion-icon name="ios-arrow-down-outline" item-end class="text-thime"></ion-icon> -->\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-phone-portrait" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label floating>{{phoneNumberHint}}</ion-label>\n\n                <ion-input placeholder="" [(ngModel)]="phoneNumber" (keyup.enter)="alertPhone()" type="tel"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button class="btn" ion-button round full margin-top margin-bottom (click)="alertPhone()">\n\n            {{\'continue\' | translate}}\n\n        </button>\n\n        <!-- <div class="social">\n\n            <p class="text-light-grey" text-center>{{\'or_continue_with\' | translate}}</p>\n\n\n\n            <ion-row>\n\n                <ion-col col-6>\n\n                    <button class="btn text-thime" ion-button round full margin-top margin-bottom\n\n                        (click)="signInFacebook()">{{\'facebook\' | translate}}\n\n                    </button>\n\n                </ion-col>\n\n                <ion-col col-6>\n\n                    <button class="btn google" ion-button round full margin-top margin-bottom\n\n                        (click)="signInGoogle()">{{\'google\' | translate}}\n\n                    </button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div> -->\n\n    </div>\n\n    <p class="text-grey" text-center (click)="privacy()">\n\n        <small>\n\n            {{\'by_signing_up\' | translate}}\n\n            <ins>{{\'terms_condition\' | translate}}</ins>\n\n        </small>\n\n    </p>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\signin\signin.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_client_service__["a" /* ClientService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatscreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_message_models__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plumberprofile_plumberprofile__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ChatscreenPage = /** @class */ (function () {
    function ChatscreenPage(navParam, toastCtrl, service, navCtrl, translate, loadingCtrl) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.messages = new Array();
        this.loadingShown = false;
        this.subscriptions = [];
        this.chat = navParam.get('chat');
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_USER));
        this.chatChild = __WEBPACK_IMPORTED_MODULE_3__models_helper_models__["a" /* Helper */].getChatChild(this.chat.myId, this.chat.chatId);
        var component = this;
        this.inboxRef = __WEBPACK_IMPORTED_MODULE_8_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].REF_INBOX);
        this.chatRef = __WEBPACK_IMPORTED_MODULE_8_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].REF_CHAT);
        this.chatRef.child(this.chatChild).limitToLast(20).on("child_added", function (snapshot, prevChildKey) {
            var newMessage = snapshot.val();
            if (newMessage) {
                newMessage.timeDiff = __WEBPACK_IMPORTED_MODULE_3__models_helper_models__["a" /* Helper */].formatMillisDateTime(Number(newMessage.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_3__models_helper_models__["a" /* Helper */].getLocale());
                component.addMessage(newMessage);
                component.markDelivered();
                component.scrollList();
            }
        }, function (error) {
            console.error("child_added", error);
        });
        __WEBPACK_IMPORTED_MODULE_8_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].REF_USERS_FCM_IDS).child(this.chat.chatId).once("value", function (snap) {
            component.userPlayerId = snap.val();
        });
        this.translate.get("just_moment").subscribe(function (value) {
            _this.showToast(value);
        });
    }
    ChatscreenPage.prototype.ionViewDidEnter = function () {
        this.scrollList();
    };
    ChatscreenPage.prototype.scrollList = function () {
        this.content.scrollToBottom(300); //300ms animation speed
    };
    ChatscreenPage.prototype.notifyMessages = function () {
        this.service.postNotification(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_TOKEN), "provider", Number(this.chat.chatId) ? this.chat.chatId : this.chat.chatId.substring(0, this.chat.chatId.indexOf("hp"))).subscribe(function (res) { return console.log("notiS", res); }, function (err) { return console.log("notiF", err); });
    };
    ChatscreenPage.prototype.markDelivered = function () {
        if (this.messages && this.messages.length) {
            if (this.messages[this.messages.length - 1].senderId != this.chat.myId) {
                this.messages[this.messages.length - 1].delivered = true;
                this.chatRef.child(this.chatChild).child(this.messages[this.messages.length - 1].id).child("delivered").set(true);
            }
            // else {
            //   let toNotify;
            //   if (!this.messages[this.messages.length - 1].delivered) {
            //     toNotify = this.messages[this.messages.length - 1];
            //     this.messages[this.messages.length - 1].delivered = true;
            //   }
            //   if (toNotify) {
            //     this.notifyMessages(toNotify);
            //   }
            // }
        }
    };
    ChatscreenPage.prototype.addMessage = function (msg) {
        this.messages = this.messages.concat(msg);
        //this.storage.set(Constants.KEY_MESSAGES + this.chatChild, this.messages);
        if (this.chat && msg) {
            var isMeSender = msg.senderId == this.chat.myId;
            this.chat.chatImage = isMeSender ? msg.recipientImage : msg.senderImage;
            this.chat.chatName = isMeSender ? msg.recipientName : msg.senderName;
            this.chat.chatStatus = isMeSender ? msg.recipientStatus : msg.senderStatus;
        }
    };
    ChatscreenPage.prototype.sendOrBook = function () {
        if (this.newMessageText && this.newMessageText.length) {
            this.send();
        }
        else {
            this.bookNow();
        }
    };
    ChatscreenPage.prototype.bookNow = function () {
        var _this = this;
        this.translate.get('just_moment').subscribe(function (value) {
            _this.presentLoading(value);
            _this.subscriptions.push(_this.service.providerByUserId(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_TOKEN), Number(_this.chat.chatId) ? _this.chat.chatId : _this.chat.chatId.substring(0, _this.chat.chatId.indexOf("hp"))).subscribe(function (res) {
                _this.dismissLoading();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__plumberprofile_plumberprofile__["a" /* PlumberprofilePage */], { profile: res });
            }, function (err) {
                _this.dismissLoading();
                console.log('cat_sub_err', err);
            }));
        });
    };
    ChatscreenPage.prototype.send = function () {
        var _this = this;
        if (this.newMessageText && this.newMessageText.trim().length) {
            var toSend_1 = new __WEBPACK_IMPORTED_MODULE_4__models_message_models__["a" /* Message */]();
            toSend_1.chatId = this.chatChild;
            toSend_1.body = this.newMessageText;
            toSend_1.dateTimeStamp = String(new Date().getTime());
            toSend_1.delivered = false;
            toSend_1.sent = true;
            toSend_1.recipientId = this.chat.chatId;
            toSend_1.recipientImage = this.chat.chatImage;
            toSend_1.recipientName = this.chat.chatName;
            toSend_1.recipientStatus = this.chat.chatStatus;
            toSend_1.senderId = this.chat.myId;
            toSend_1.senderName = this.userMe.name;
            toSend_1.senderImage = (this.userMe.image_url && this.userMe.image_url.length) ? this.userMe.image_url : "assets/imgs/empty_dp.png";
            toSend_1.senderStatus = this.userMe.email;
            toSend_1.id = this.chatRef.child(this.chatChild).push().key;
            this.chatRef.child(this.chatChild).child(toSend_1.id).set(toSend_1).then(function (res) {
                _this.inboxRef.child(toSend_1.recipientId).child(toSend_1.senderId).set(toSend_1);
                _this.inboxRef.child(toSend_1.senderId).child(toSend_1.recipientId).set(toSend_1);
                _this.newMessageText = '';
                _this.notifyMessages();
            });
        }
        else {
            this.translate.get("type_message").subscribe(function (value) { return _this.showToast(value); });
        }
    };
    ChatscreenPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ChatscreenPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ChatscreenPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", Object)
    ], ChatscreenPage.prototype, "content", void 0);
    ChatscreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chatscreen',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\chatscreen\chatscreen.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>\n\n			<span class="profile">\n\n				<img *ngIf="chat.chatImage && chat.chatImage.length" data-src="{{chat.chatImage}}">\n\n				<img *ngIf="!chat.chatImage || !chat.chatImage.length" src="assets/imgs/empty_dp.png">\n\n			</span>\n\n			<span class="name"> {{chat.chatName}}</span>\n\n		</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content #content class="bg-light">\n\n\n\n	<ion-card *ngFor="let msg of messages" [ngClass]="(chat.myId == msg.senderId) ? \'send\' : \'received\'">\n\n		<h2>{{msg.body}}</h2>\n\n		<p>{{msg.timeDiff}}</p>\n\n	</ion-card>\n\n</ion-content>\n\n\n\n<ion-footer no-border>\n\n	<ion-list class="" no-lines>\n\n		<div class="d-flex input_field">\n\n			<ion-item>\n\n				<ion-textarea type="text" rows="1" [(ngModel)]="newMessageText" placeholder="{{\'type_message\' | translate}}"></ion-textarea>\n\n			</ion-item>\n\n			<h3 (click)="sendOrBook()" class="end">\n\n				<ion-icon *ngIf="newMessageText && newMessageText.length" name="md-send" text-start></ion-icon>\n\n				<ion-icon *ngIf="!newMessageText || !newMessageText.length" name="checkmark-circle" text-start>\n\n				</ion-icon>\n\n				<span *ngIf="newMessageText && newMessageText.length">\n\n					{{\'send\' | translate}}\n\n				</span>\n\n				<span *ngIf="!newMessageText || !newMessageText.length">\n\n					{{\'book\' | translate}}\n\n				</span>\n\n			</h3>\n\n		</div>\n\n	</ion-list>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\chatscreen\chatscreen.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */]])
    ], ChatscreenPage);
    return ChatscreenPage;
}());

//# sourceMappingURL=chatscreen.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlumberprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_chat_models__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manageaddress_manageaddress__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_helper_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__category_category__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_img_viewer__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__signin_signin__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var PlumberprofilePage = /** @class */ (function () {
    function PlumberprofilePage(navCtrl, params, service, iab, toastCtrl, callNumber, imageViewerCtrl, translate) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.iab = iab;
        this.toastCtrl = toastCtrl;
        this.callNumber = callNumber;
        this.imageViewerCtrl = imageViewerCtrl;
        this.translate = translate;
        this.plumber = "about";
        this.loadingShown = false;
        this.reviews = [];
        this.portfolios = [];
        this.subscriptions = [];
        this.loadingPortfolios = true;
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_USER));
        this.profile = params.get("profile");
        this.category = params.get("category");
        this.loadReviews();
        this.loadPortfolio();
    }
    PlumberprofilePage.prototype.loadPortfolio = function () {
        var _this = this;
        var subscription = this.service.providerPortfolio(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), String(this.profile.id)).subscribe(function (res) {
            _this.portfolios = res;
            _this.loadingPortfolios = false;
        }, function (err) {
            _this.loadingPortfolios = false;
            console.log('portfolio_list', err);
        });
        this.subscriptions.push(subscription);
    };
    PlumberprofilePage.prototype.loadReviews = function () {
        var _this = this;
        this.subscriptions.push(this.service.providerReviews(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), String(this.profile.id)).subscribe(function (res) {
            var reviews = res.data;
            _this.reviews = _this.reviews.concat(reviews);
        }, function (err) {
            console.log('review_list', err);
        }));
    };
    PlumberprofilePage.prototype.booknow = function () {
        var _this = this;
        if (this.userMe) {
            if (this.category) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__manageaddress_manageaddress__["a" /* ManageaddressPage */], { profile: this.profile, category: this.category });
            }
            else {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__category_category__["a" /* CategoryPage */], { cat: this.profile.primary_category, profile: this.profile });
            }
        }
        else {
            this.translate.get("alert_login_short").subscribe(function (value) { return _this.showToast(value); });
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__signin_signin__["a" /* SigninPage */]);
        }
    };
    PlumberprofilePage.prototype.callProvider = function () {
        this.callNumber.callNumber(this.profile.user.mobile_number, true).then(function (res) { return console.log('Launched dialer!', res); }).catch(function (err) { return console.log('Error launching dialer', err); });
    };
    PlumberprofilePage.prototype.linkPortfolio = function (portfolio) {
        if (__WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].isValidURL(portfolio.link)) {
            this.iab.create(portfolio.link);
        }
        else {
            var imageViewer = this.imageViewerCtrl.create(portfolio.image_url);
            imageViewer.present();
        }
    };
    PlumberprofilePage.prototype.chatscreen = function () {
        var _this = this;
        if (this.userMe) {
            var chat = new __WEBPACK_IMPORTED_MODULE_5__models_chat_models__["a" /* Chat */]();
            chat.chatId = this.profile.user.id + "hp";
            chat.chatImage = (this.profile.user.image_url && this.profile.user.image_url.length) ? this.profile.user.image_url : "assets/imgs/empty_dp.png";
            chat.chatName = this.profile.user.name;
            chat.chatStatus = this.profile.primary_category.title;
            chat.myId = this.userMe.id + "hc";
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__["a" /* ChatscreenPage */], { chat: chat });
        }
        else {
            this.translate.get("alert_login_short").subscribe(function (value) { return _this.showToast(value); });
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__signin_signin__["a" /* SigninPage */]);
        }
    };
    PlumberprofilePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PlumberprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-plumberprofile',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\plumberprofile\plumberprofile.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>\n\n			<!-- <span>\n\n                <ion-icon name="md-share"></ion-icon>\n\n            </span> -->\n\n		</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n	<div class="profile-box">\n\n		<div class="profile">\n\n			<div class="profile-img">\n\n				<img *ngIf="profile && profile.user.image_url" data-src="{{profile.user.image_url}}">\n\n				<img *ngIf="!profile || !profile.user.image_url" src="assets/imgs/empty_dp.png">\n\n			</div>\n\n\n\n			<div class="profile_details">\n\n				<h2>{{profile.user.name}}\n\n					<ion-icon *ngIf="profile.is_verified == 1" name="checkmark-circle"></ion-icon>\n\n					<span>{{profile.primary_category.title}}</span>\n\n				</h2>\n\n				<div class="other_details">\n\n					<div class="text">\n\n						<h2>\n\n							{{profile.priceToShow}}\n\n							<span text-center>/ {{profile.price_type | translate}}</span>\n\n						</h2>\n\n					</div>\n\n					<div *ngIf="profile.distance && profile.distance != \'-1\'" class="text">\n\n						<h2>\n\n							{{profile.distance}} km\n\n							<span text-center>{{\'away_from_you\' | translate}}</span>\n\n						</h2>\n\n					</div>\n\n					<div class="text rating">\n\n						<h2>\n\n							{{profile.ratings}}\n\n							<ion-icon name="star" class="text-green"></ion-icon>\n\n							<span text-center>{{profile.ratingscount}} {{\'rated_by\' | translate}}</span>\n\n						</h2>\n\n					</div>\n\n				</div>\n\n			</div>\n\n		</div>\n\n		<div class="btn_box d-flex">\n\n			<button ion-button icon-start full class="btn message-btn text-thime" (click)="callProvider()">\n\n				<ion-icon name="md-call"></ion-icon>\n\n				{{\'call\' | translate}}\n\n			</button>\n\n			<button ion-button icon-start full class="btn message-btn text-thime" (click)="chatscreen()">\n\n				<ion-icon name="md-text"></ion-icon>\n\n				{{\'message\' | translate}}\n\n			</button>\n\n		</div>\n\n		<ion-segment [(ngModel)]="plumber">\n\n			<ion-segment-button value="about">\n\n				{{\'about\' | translate}}\n\n			</ion-segment-button>\n\n			<ion-segment-button value="reviews">\n\n				{{\'reviews\' | translate}}\n\n			</ion-segment-button>\n\n			<ion-segment-button value="portfolio">\n\n				{{\'portfolio\' | translate}}\n\n			</ion-segment-button>\n\n		</ion-segment>\n\n	</div>\n\n	<div class="tab">\n\n		<div [ngSwitch]="plumber" class="tab-container">\n\n			<ion-list *ngSwitchCase="\'about\'" class="about">\n\n				<p>{{profile.about}}</p>\n\n				<div class="services">\n\n					<h6 class="text-thime">\n\n						{{\'services\' | translate}}\n\n					</h6>\n\n					<p *ngFor="let service of profile.subcategories">{{service.title}}</p>\n\n				</div>\n\n			</ion-list>\n\n\n\n			<div *ngSwitchCase="\'reviews\'">\n\n				<ion-list no-lines class="reviews">\n\n					<div class="empty-view" *ngIf="(!reviews || !reviews.length)">\n\n						<div style="text-align:center">\n\n							<img src="assets/imgs/empty_reviews.png" alt="no offers" />\n\n							<span style="color:#9E9E9E; font-weight:bold;">{{\'no_reviews_to_show\' | translate}}</span>\n\n						</div>\n\n					</div>\n\n					<ion-item *ngFor="let review of reviews">\n\n						<div class="reviews-details">\n\n							<div class="review-img">\n\n								<img *ngIf="review.user && review.user.image_url" data-src="{{review.user.image_url}}">\n\n								<img *ngIf="!review.user || !review.user.image_url" src="assets/imgs/empty_dp.png">\n\n							</div>\n\n							<h2 class="text-ellipsis">\n\n								{{review.user.name}}\n\n								<br>\n\n								<small class="text-green">\n\n									{{review.rating}}\n\n									<ion-icon name="star" class="text-green"></ion-icon>\n\n								</small>\n\n							</h2>\n\n							<p class="text-ellipsis">{{review.created_at}} </p>\n\n						</div>\n\n						<p>{{review.review}}</p>\n\n					</ion-item>\n\n				</ion-list>\n\n				<ion-infinite-scroll *ngIf="reviews && reviews.length" (ionInfinite)="doInfinite($event)">\n\n					<ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n				</ion-infinite-scroll>\n\n			</div>\n\n\n\n			<ion-list *ngSwitchCase="\'portfolio\'" no-lines class="portfolio">\n\n				<div class="empty-view" *ngIf="!loadingPortfolios && (!portfolios || !portfolios.length)">\n\n					<div style="text-align:center">\n\n						<img src="assets/imgs/empty_reviews.png" alt="no offers" />\n\n						<span style="color:#9E9E9E; font-weight:bold;">{{\'no_portfolios_to_show\' | translate}}</span>\n\n					</div>\n\n				</div>\n\n				<div class="empty-view" *ngIf="loadingPortfolios">\n\n					<div style="text-align:center">\n\n						<!-- <img src="assets/imgs/empty_reviews.png" alt="no offers" /> -->\n\n						<span style="color:#9E9E9E; font-weight:bold;">{{\'loading\' | translate}}</span>\n\n					</div>\n\n				</div>\n\n				<ion-row>\n\n					<ion-col col-6 *ngFor="let portfolio of portfolios">\n\n						<div class="img_box" (click)="linkPortfolio(portfolio)">\n\n							<img data-src="{{portfolio.image_url}}">\n\n						</div>\n\n					</ion-col>\n\n				</ion-row>\n\n			</ion-list>\n\n		</div>\n\n	</div>\n\n</ion-content>\n\n<ion-footer>\n\n	<!--\n\n    <ion-item class="add-item" (click)="booknow()">\n\n        <h2 class="text-thime" text-center>\n\n         {{\'book_now\' | translate}}\n\n        </h2>\n\n    </ion-item>\n\n-->\n\n	<button class="btn" ion-button full no-margin (click)="booknow()">\n\n		<ion-icon name="checkmark-circle" text-start></ion-icon>\n\n		{{\'book_now\' | translate}}\n\n	</button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\plumberprofile\plumberprofile.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_11_ionic_img_viewer__["a" /* ImageViewerController */], __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */]])
    ], PlumberprofilePage);
    return PlumberprofilePage;
}());

//# sourceMappingURL=plumberprofile.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageaddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__booknow_booknow__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selectarea_selectarea__ = __webpack_require__(145);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ManageaddressPage = /** @class */ (function () {
    function ManageaddressPage(navCtrl, params, service, loadingCtrl, translate, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.edit = false;
        this.isLoading = false;
        this.loadingShown = false;
        this.addresses = new Array();
        this.subscriptions = [];
        this.profile = params.get("profile");
        this.edit = params.get('edit');
        this.category = params.get('category');
        this.translate.get(this.edit ? "address_manage" : "address_select").subscribe(function (value) {
            _this.title = value;
        });
        if (window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST) == null) {
            this.translate.get("loading_address").subscribe(function (value) {
                _this.presentLoading(value);
            });
            this.getAddresses();
        }
    }
    ManageaddressPage.prototype.ionViewDidEnter = function () {
        var addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST));
        if (addresses != null) {
            this.addresses = addresses;
        }
    };
    ManageaddressPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ManageaddressPage.prototype.getAddresses = function () {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.addresses(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            _this.dismissLoading();
            _this.addresses = res;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_ADDRESS_LIST, JSON.stringify(_this.addresses));
            _this.isLoading = false;
        }, function (err) {
            _this.isLoading = false;
            _this.dismissLoading();
            console.log('address_list_err', err);
        });
        this.subscriptions.push(subscription);
    };
    ManageaddressPage.prototype.bookNow = function () {
        var _this = this;
        var address;
        for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
            var ad = _a[_i];
            if (ad.id == this.address_id) {
                address = ad;
                break;
            }
        }
        if (address) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__booknow_booknow__["a" /* BooknowPage */], { address: address, profile: this.profile, category: this.category });
        }
        else {
            this.translate.get("address_select").subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    ManageaddressPage.prototype.onAddNewClick = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__selectarea_selectarea__["a" /* SelectareaPage */]);
    };
    ManageaddressPage.prototype.onEditClick = function () {
        if (this.edit) {
            var address = void 0;
            for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
                var ad = _a[_i];
                if (ad.id == this.address_id) {
                    address = ad;
                    break;
                }
            }
            if (address) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__selectarea_selectarea__["a" /* SelectareaPage */], { address: address });
            }
        }
    };
    ManageaddressPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ManageaddressPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ManageaddressPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ManageaddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manageaddress',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\manageaddress\manageaddress.html"*/'<ion-header>\n	<ion-navbar>\n		<!--		<ion-title>{{title}}</ion-title>-->\n		<ion-title>{{\'manage_address\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<!--    <img src="../../assets/imgs/19.png">-->\n	<h2 class="d-flex">{{\'saved_address\' | translate}}</h2>\n	<div class="empty-view" *ngIf="!isLoading && (!addresses || !addresses.length)">\n		<div style="text-align:center">\n			<img src="assets/imgs/empty_address.png" alt="no offers" />\n			<span style="color:#9E9E9E; font-weight:bold;">\n				{{\'no_addresses_to_show\' | translate}}\n			</span>\n		</div>\n	</div>\n	<ion-list no-lines radio-group [(ngModel)]="address_id" name="case" required (ionChange)="onEditClick()">\n		<ion-item *ngFor="let address of addresses">\n			<ion-radio item-start value="{{address.id}}"></ion-radio>\n			<ion-label>\n				<h3>{{address.title}}</h3>\n				<p class="text-grey">\n					{{address.address}}\n				</p>\n			</ion-label>\n			<ion-icon *ngIf="edit" name="md-create" item-end></ion-icon>\n		</ion-item>\n	</ion-list>\n</ion-content>\n<ion-footer>\n	<h2 class="text-thime" text-center (click)="onAddNewClick()">\n		<ion-icon name="md-add-circle" text-start></ion-icon>{{\'add_new\' | translate}}\n	</h2>\n	<button *ngIf="!edit" class="btn" ion-button full no-margin (click)="bookNow()">\n		<ion-icon name="checkmark-circle" text-start></ion-icon>\n		{{\'book_now\' | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\manageaddress\manageaddress.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */]])
    ], ManageaddressPage);
    return ManageaddressPage;
}());

//# sourceMappingURL=manageaddress.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listofplumber_listofplumber__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manageaddress_manageaddress__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CategoryPage = /** @class */ (function () {
    function CategoryPage(navCtrl, params, service, loadingCtrl, toastCtrl, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.isLoading = false;
        this.subscriptions = [];
        this.parentCategory = params.get("cat");
        this.profile = params.get("profile");
        if (this.parentCategory) {
            this.translate.get('loading_categories_sub').subscribe(function (value) {
                _this.presentLoading(value);
            });
            this.loadChildCategories(this.parentCategory.id);
        }
    }
    CategoryPage.prototype.ionViewWillEnter = function () { };
    CategoryPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    CategoryPage.prototype.loadChildCategories = function (parentId) {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.categoryChildren(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), parentId).subscribe(function (res) {
            _this.isLoading = false;
            _this.dismissLoading();
            var cats = res.data;
            _this.subCategories = cats;
        }, function (err) {
            _this.isLoading = false;
            _this.dismissLoading();
            console.log('cat_sub_err', err);
        });
        this.subscriptions.push(subscription);
    };
    CategoryPage.prototype.subCatDetail = function (cat) {
        if (this.profile) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__manageaddress_manageaddress__["a" /* ManageaddressPage */], { profile: this.profile, category: cat });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__listofplumber_listofplumber__["a" /* ListofplumberPage */], { cat: cat });
        }
    };
    CategoryPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CategoryPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CategoryPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\category\category.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            <span>\n                <!-- <ion-icon name="md-search"></ion-icon> -->\n            </span>\n        </ion-title>\n    </ion-navbar>\n    <div class="logo-box bg-thime">\n        <div *ngIf="parentCategory" class="logo" text-center>\n            <img data-src="{{parentCategory.secondary_image_url}}">\n            <p class="text-white">{{parentCategory.title}}</p>\n        </div>\n    </div>\n</ion-header>\n\n<ion-content>\n    <div class="empty-view" *ngIf="!isLoading && (!subCategories || !subCategories.length)">\n        <div style="text-align:center">\n            <img src="assets/imgs/empty_category.png" alt="no offers" />\n            <span style="color:#9E9E9E; font-weight:bold;">\n                {{\'empty_categories_sub\' | translate}}\n            </span>\n        </div>\n    </div>\n    <ion-list *ngIf="subCategories && subCategories.length" no-lines>\n        <ion-item *ngFor="let cat of subCategories" (click)="subCatDetail(cat)">\n            <h2><span class="text-ellipsis">{{cat.title}}</span>\n                <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n            </h2>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_customer\src\pages\category\category.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ })

},[434]);
//# sourceMappingURL=main.js.map