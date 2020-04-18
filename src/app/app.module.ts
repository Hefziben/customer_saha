import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Add_address_titlePage } from '../pages/add_address_title/add_address_title';
import { AccountPage } from '../pages/account/account';
import { BookingPage } from '../pages/booking/booking';
import { BooknowPage } from '../pages/booknow/booknow';
import { CategoryPage } from '../pages/category/category';
import { ChatPage } from '../pages/chat/chat';
import { ChatscreenPage } from '../pages/chatscreen/chatscreen';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ListofplumberPage } from '../pages/listofplumber/listofplumber';
import { ManageaddressPage } from '../pages/manageaddress/manageaddress';
import { PrivacyPage } from '../pages/privacy/privacy';
import { PlumberprofilePage } from '../pages/plumberprofile/plumberprofile';
import { RequestsPage } from '../pages/requests/requests';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { OtpPage } from '../pages/otp/otp';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus';
import { APP_CONFIG, BaseAppConfig } from "./app.config";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RatePage } from '../pages/rate/rate';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { Connectivity } from '../providers/connectivity-service';
import { GoogleMaps } from '../providers/google-maps';
import { SelectareaPage } from '../pages/selectarea/selectarea';
import { OneSignal } from '@ionic-native/onesignal';
import { CallNumber } from '@ionic-native/call-number';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TrackPage } from '../pages/track/track';
import { ManagelanguagePage } from '../pages/managelanguage/managelanguage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { FaqsPage } from '../pages/faqs/faqs';
import { CategorySearchPage } from '../pages/categorysearch/categorysearch';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AppVersion } from '@ionic-native/app-version';
import { Market } from '@ionic-native/market';
import { SocialSharing } from '@ionic-native/social-sharing';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    Add_address_titlePage,
    BookingPage,
    BooknowPage,
    CategoryPage,
    ChatPage,
    ChatscreenPage,
    ContactPage,
    HomePage,
    ListofplumberPage,
    ManageaddressPage,
    NotificationsPage,
    PrivacyPage,
    PlumberprofilePage,
    RequestsPage,
    SignupPage,
    SigninPage,
    TabsPage,
    OtpPage,
    RatePage,
    SelectareaPage,
    TrackPage,
    FaqsPage,
    ManagelanguagePage,
    CategorySearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Add_address_titlePage,
    AccountPage,
    BookingPage,
    BooknowPage,
    CategoryPage,
    ChatPage,
    ChatscreenPage,
    ContactPage,
    HomePage,
    ListofplumberPage,
    ManageaddressPage,
    NotificationsPage,
    PrivacyPage,
    PlumberprofilePage,
    RequestsPage,
    SignupPage,
    SigninPage,
    TabsPage,
    OtpPage,
    RatePage,
    SelectareaPage,
    TrackPage,
    FaqsPage,
    ManagelanguagePage,
    CategorySearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    Connectivity,
    GoogleMaps,
    Facebook,
    GooglePlus,
    OneSignal,
    CallNumber,
    TranslateService,
    Diagnostic,
    InAppBrowser,
    ImagePicker,
    Crop,
    File,
    AppVersion,
    Market,
    SocialSharing,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }