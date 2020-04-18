import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import { Observable } from "rxjs/Observable";
import { APP_CONFIG, AppConfig } from "../app/app.config";
import { Country } from '../models/country.models';
import { Setting } from '../models/setting.models';
import { ResetPasswordResponse } from '../models/reset-password-request.models';
import { AuthResponse } from '../models/auth-response.models';
import { SignUpRequest } from '../models/signup-request.models';
import { BaseListResponse } from '../models/base-list.models';
import { Address } from '../models/address.models';
import { AddressCreateRequest } from '../models/address-create-request.models';
import { AppointmentRequest } from '../models/appointment-request.models';
import { SupportRequest } from '../models/support-request.models';
import { User } from '../models/user.models';
import { Appointment } from '../models/appointment.models';
import { RateRequest } from '../models/rate-request.models';
import { ProviderPortfolio } from '../models/provider-portfolio.models';
import { SocialLoginRequest } from '../models/sociallogin-request.models';
import { Faq } from '../models/faq.models';
import { Helper } from '../models/helper.models';
import { ProviderProfile } from '../models/provider-profile.models';

@Injectable()
export class ClientService {
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {

    }

    public getCountries(): Observable<Array<Country>> {
        return this.http.get<Array<Country>>('./assets/json/countries.json').concatMap((data) => {
            return Observable.of(data);
        });
    }

    public getSettings(): Observable<Array<Setting>> {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<Array<Setting>>(this.config.apiBase + "api/settings", { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public forgetPassword(resetRequest: any): Observable<ResetPasswordResponse> {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<ResetPasswordResponse>(this.config.apiBase + "api/forgot-password", JSON.stringify(resetRequest), { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public login(loginTokenRequest: any): Observable<AuthResponse> {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<AuthResponse>(this.config.apiBase + "api/login", JSON.stringify(loginTokenRequest), { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public loginSocial(socialLoginRequest: SocialLoginRequest): Observable<AuthResponse> {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<AuthResponse>(this.config.apiBase + "api/social/login", socialLoginRequest, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public signUp(signUpRequest: SignUpRequest): Observable<AuthResponse> {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<AuthResponse>(this.config.apiBase + "api/register", JSON.stringify(signUpRequest), { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public verifyMobile(verifyRequest: any): Observable<AuthResponse> {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<AuthResponse>(this.config.apiBase + "api/verify-mobile", JSON.stringify(verifyRequest), { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public checkUser(checkUserRequest: any): Observable<{}> {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<{}>(this.config.apiBase + "api/check-user", JSON.stringify(checkUserRequest), { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public categoryParent(token: string): Observable<BaseListResponse> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<BaseListResponse>(this.config.apiBase + "api/category", { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public categoryChildren(token: string, parentId: number): Observable<BaseListResponse> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<BaseListResponse>(this.config.apiBase + "api/category?category_id=" + parentId, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public providerByUserId(token: string, userId: string): Observable<ProviderProfile> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<ProviderProfile>(this.config.apiBase + "api/customer/users/provider/" + userId, { headers: myHeaders }).concatMap(p => {
            let currency = Helper.getSetting("currency");
            p.priceToShow = currency + " " + p.price;
            if (!p.distance) p.distance = "-1";
            if (Number(p.distance) > -1) p.distance = (Number(p.distance) / 1000).toFixed(2);
            p.ratings = Number(p.ratings).toFixed(2);
            return Observable.of(p);
        });
    }

    public providers(token: string, catId: string, lat: string, lang: string, pageNo: string): Observable<BaseListResponse> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<BaseListResponse>(this.config.apiBase + "api/customer/providers?category=" + catId + "&lat=" + lat + "&long=" + lang + "&page=" + pageNo, { headers: myHeaders }).concatMap(data => {
            let currency = Helper.getSetting("currency");
            for (let p of data.data) {
                p.priceToShow = currency + " " + p.price;
                if (!p.distance) p.distance = "-1";
                if (Number(p.distance) > -1) p.distance = (Number(p.distance) / 1000).toFixed(2);
                p.ratings = Number(p.ratings).toFixed(2);
            }
            return Observable.of(data);
        });
    }

    public categorySearch(token: string, query: string): Observable<BaseListResponse> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<BaseListResponse>(this.config.apiBase + "api/category?search=" + query, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public submitSupport(token: string, supportRequest: SupportRequest): Observable<{}> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<{}>(this.config.apiBase + "api/support", supportRequest, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public createAppointment(token: string, appointmentRequest: AppointmentRequest): Observable<{}> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<{}>(this.config.apiBase + "api/customer/appointment", appointmentRequest, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public addresses(token: string): Observable<Array<Address>> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<Array<Address>>(this.config.apiBase + "api/customer/address", { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public addAddress(token: string, addressRequest: AddressCreateRequest): Observable<Address> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<Address>(this.config.apiBase + "api/customer/address", addressRequest, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public deleteAddress(token: string, addressId: number): Observable<Address> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.delete<Address>(this.config.apiBase + "api/customer/address/" + addressId, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public updateAddress(token: string, addressId: number, addressRequest: AddressCreateRequest): Observable<Address> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.put<Address>(this.config.apiBase + "api/customer/address/" + addressId + "/update", addressRequest, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public updateUser(token: string, requestBody: any): Observable<User> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.put<User>(this.config.apiBase + "api/user", requestBody, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public logActivity(token: string): Observable<{}> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<{}>(this.config.apiBase + 'api/activity-log', {}, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public providerReviews(token: string, profileId: string): Observable<BaseListResponse> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<BaseListResponse>(this.config.apiBase + "api/customer/providers/" + profileId + "/ratings", { headers: myHeaders }).concatMap(data => {
            let locale = Helper.getLocale();
            for (let review of data.data) {
                review.created_at = Helper.formatTimestampDate(review.created_at, locale);
            }
            return Observable.of(data);
        });
    }

    public providerPortfolio(token: string, profileId: string): Observable<Array<ProviderPortfolio>> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<Array<ProviderPortfolio>>(this.config.apiBase + "api/customer/providers/" + profileId + "/portfolios", { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public appointments(token: string, pageNo: number): Observable<BaseListResponse> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get<BaseListResponse>(this.config.apiBase + "api/customer/appointment?page=" + pageNo, { headers: myHeaders }).concatMap(data => {
            let locale = Helper.getLocale();
            let currency = Helper.getSetting("currency");
            for (let ap of data.data) {
                ap.created_at = Helper.formatTimestampDateTime(ap.created_at, locale);
                ap.updated_at = Helper.formatTimestampDateTime(ap.updated_at, locale);
                for (let log of ap.logs) {
                    log.updated_at = Helper.formatTimestampDateTime(log.updated_at, locale);
                    log.created_at = Helper.formatTimestampDateTime(log.created_at, locale);
                }
                ap.date_formatted = Helper.formatTimestampDate(ap.date, locale);
                ap.time_from_formatted = ap.time_from.substr(0, ap.time_from.lastIndexOf(":"));
                ap.time_to_formatted = ap.time_to.substr(0, ap.time_to.lastIndexOf(":"));
                ap.provider.priceToShow = currency + " " + ap.provider.price;
                if (!ap.provider.distance) ap.provider.distance = "-1";
                if (Number(ap.provider.distance) > -1) ap.provider.distance = (Number(ap.provider.distance) / 1000).toFixed(2);
                ap.provider.ratings = Number(ap.provider.ratings).toFixed(2);
            }
            return Observable.of(data);
        });
    }

    public appointmentCancel(token: string, apId: number): Observable<Appointment> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<Appointment>(this.config.apiBase + "api/customer/appointment/" + apId + '/cancel', {}, { headers: myHeaders }).concatMap(data => {
            let locale = Helper.getLocale();
            let currency = Helper.getSetting("currency");
            data.updated_at = Helper.formatTimestampTime(data.updated_at, locale);
            data.created_at = Helper.formatTimestampTime(data.created_at, locale);
            for (let log of data.logs) {
                log.updated_at = Helper.formatTimestampTime(log.updated_at, locale);
                log.created_at = Helper.formatTimestampTime(log.created_at, locale);
            }
            data.provider.priceToShow = currency + " " + data.provider.price;
            if (!data.provider.distance) data.provider.distance = "-1";
            if (Number(data.provider.distance) > -1) data.provider.distance = (Number(data.provider.distance) / 1000).toFixed(2);
            data.provider.ratings = Number(data.provider.ratings).toFixed(2);
            return Observable.of(data);
        });
    }

    public appointmentUpdate(token: string, apId: number, updateRequest: any): Observable<Appointment> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.put<Appointment>(this.config.apiBase + "api/provider/appointment/" + apId, JSON.stringify(updateRequest), { headers: myHeaders }).concatMap(data => {
            let locale = Helper.getLocale();
            let currency = Helper.getSetting("currency");
            data.updated_at = Helper.formatTimestampTime(data.updated_at, locale);
            data.created_at = Helper.formatTimestampTime(data.created_at, locale);
            for (let log of data.logs) {
                log.updated_at = Helper.formatTimestampTime(log.updated_at, locale);
                log.created_at = Helper.formatTimestampTime(log.created_at, locale);
            }
            data.provider.priceToShow = currency + " " + data.provider.price;
            if (!data.provider.distance) data.provider.distance = "-1";
            if (Number(data.provider.distance) > -1) data.provider.distance = (Number(data.provider.distance) / 1000).toFixed(2);
            data.provider.ratings = Number(data.provider.ratings).toFixed(2);
            return Observable.of(data);
        });
    }

    public rateProvider(token: string, pId: number, rateRequest: RateRequest): Observable<{}> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<{}>(this.config.apiBase + "api/customer/providers/" + pId + "/ratings", JSON.stringify(rateRequest), { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public faqs(): Observable<Array<Faq>> {
        const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.get<Array<Faq>>(this.config.apiBase + 'api/faq-help', { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

    public postNotification(token: string, roleTo: string, userIdTo: string): Observable<any> {
        const myHeaders = (token && token.length) ? new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) : new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post<any>(this.config.apiBase + 'api/user/push-notification', { role: roleTo, user_id: userIdTo }, { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }

}