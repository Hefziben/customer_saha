import { Component, ViewChild } from '@angular/core';
import { NavParams, ToastController, Loading, LoadingController, NavController } from 'ionic-angular';
import { Chat } from '../../models/chat.models';
import { User } from '../../models/user.models';
import { Constants } from '../../models/constants.models';
import { Helper } from '../../models/helper.models';
import { Message } from '../../models/message.models';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { PlumberprofilePage } from '../plumberprofile/plumberprofile';
import { ClientService } from '../../providers/client.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-chatscreen',
  templateUrl: 'chatscreen.html',
  providers: [ClientService]
})
export class ChatscreenPage {
  @ViewChild('content') content: any;
  private chat: Chat;
  private userMe: User;
  private chatChild: string;
  private userPlayerId: string;
  private newMessageText: string;
  private chatRef: firebase.database.Reference;
  private inboxRef: firebase.database.Reference;
  private messages = new Array<Message>();
  private loading: Loading;
  private loadingShown: Boolean = false;
  private subscriptions: Array<Subscription> = [];

  constructor(navParam: NavParams, private toastCtrl: ToastController, private service: ClientService, private navCtrl: NavController,
    private translate: TranslateService, private loadingCtrl: LoadingController) {
    this.chat = navParam.get('chat');
    this.userMe = JSON.parse(window.localStorage.getItem(Constants.KEY_USER));
    this.chatChild = Helper.getChatChild(this.chat.myId, this.chat.chatId);

    const component = this;
    this.inboxRef = firebase.database().ref(Constants.REF_INBOX);
    this.chatRef = firebase.database().ref(Constants.REF_CHAT);
    this.chatRef.child(this.chatChild).limitToLast(20).on("child_added", function (snapshot, prevChildKey) {
      var newMessage = snapshot.val() as Message;
      if (newMessage) {
        newMessage.timeDiff = Helper.formatMillisDateTime(Number(newMessage.dateTimeStamp), Helper.getLocale());
        component.addMessage(newMessage);
        component.markDelivered();
        component.scrollList();
      }
    }, function (error) {
      console.error("child_added", error);
    });

    firebase.database().ref(Constants.REF_USERS_FCM_IDS).child(this.chat.chatId).once("value", function (snap) {
      component.userPlayerId = snap.val();
    });
    this.translate.get("just_moment").subscribe(value => {
      this.showToast(value);
    });
  }

  ionViewDidEnter() {
    this.scrollList();
  }

  scrollList() {
    this.content.scrollToBottom(300);//300ms animation speed
  }

  notifyMessages() {
    this.service.postNotification(window.localStorage.getItem(Constants.KEY_TOKEN), "provider", Number(this.chat.chatId) ? this.chat.chatId : this.chat.chatId.substring(0, this.chat.chatId.indexOf("hp"))).subscribe(res => console.log("notiS", res), err => console.log("notiF", err));
  }

  markDelivered() {
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
  }

  addMessage(msg: Message) {
    this.messages = this.messages.concat(msg);
    //this.storage.set(Constants.KEY_MESSAGES + this.chatChild, this.messages);
    if (this.chat && msg) {
      let isMeSender = msg.senderId == this.chat.myId;
      this.chat.chatImage = isMeSender ? msg.recipientImage : msg.senderImage;
      this.chat.chatName = isMeSender ? msg.recipientName : msg.senderName;
      this.chat.chatStatus = isMeSender ? msg.recipientStatus : msg.senderStatus;
    }
  }

  sendOrBook() {
    if (this.newMessageText && this.newMessageText.length) {
      this.send();
    } else {
      this.bookNow();
    }
  }

  bookNow() {
    this.translate.get('just_moment').subscribe(value => {
      this.presentLoading(value);
      this.subscriptions.push(this.service.providerByUserId(window.localStorage.getItem(Constants.KEY_TOKEN), Number(this.chat.chatId) ? this.chat.chatId : this.chat.chatId.substring(0, this.chat.chatId.indexOf("hp"))).subscribe(res => {
        this.dismissLoading();
        this.navCtrl.push(PlumberprofilePage, { profile: res });
      }, err => {
        this.dismissLoading();
        console.log('cat_sub_err', err);
      }));
    });
  }

  send() {
    if (this.newMessageText && this.newMessageText.trim().length) {
      let toSend = new Message();
      toSend.chatId = this.chatChild;
      toSend.body = this.newMessageText;
      toSend.dateTimeStamp = String(new Date().getTime());
      toSend.delivered = false;
      toSend.sent = true;
      toSend.recipientId = this.chat.chatId;
      toSend.recipientImage = this.chat.chatImage;
      toSend.recipientName = this.chat.chatName;
      toSend.recipientStatus = this.chat.chatStatus;
      toSend.senderId = this.chat.myId;
      toSend.senderName = this.userMe.name;
      toSend.senderImage = (this.userMe.image_url && this.userMe.image_url.length) ? this.userMe.image_url : "assets/imgs/empty_dp.png";
      toSend.senderStatus = this.userMe.email;
      toSend.id = this.chatRef.child(this.chatChild).push().key;

      this.chatRef.child(this.chatChild).child(toSend.id).set(toSend).then(res => {
        this.inboxRef.child(toSend.recipientId).child(toSend.senderId).set(toSend);
        this.inboxRef.child(toSend.senderId).child(toSend.recipientId).set(toSend);
        this.newMessageText = '';
        this.notifyMessages();
      });
    } else {
      this.translate.get("type_message").subscribe(value => this.showToast(value));
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