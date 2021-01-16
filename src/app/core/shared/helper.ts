import copy from 'copy-to-clipboard'
import { Constant } from './constants';

export interface IDateTime {
    weekDay: number,
    dayName: string,
    monthDay: number,
    monthName: string,
    month: number,
    year: number,
    time12h: string,
    hh: number,
    mm: number,
    timeZone: string
}

export class Helper {

    static htmlTagRemover(htmlStr: string): string {
        try {
            if (!this.isStringNullOrEmpty(htmlStr)) {
                return htmlStr.replace(/(<([^>]+)>)/ig, '');
            }
        } catch (error) { }
        return '';
    }


    static extractImage(htmlStr: string) {

    }


    static isStringNullOrEmpty(str: string): boolean {
        if (typeof str === 'string' && str !== null && str !== undefined && str !== '') {
            return false;
        }
        return true;
    }


    static subStrUrl(url: string): string {
        if (!this.isStringNullOrEmpty(url)) {
            url = url.replace(Constant.apiRoboUrl, '')
            //let idxOfHtml = url.lastIndexOf('.');
            // url = url.substr(0, idxOfHtml);
            return url;
        }
        return '';
    }


    static getPropertyType(type: any | any[]) {
        if (type && type.hasOwnProperty('length')) {
            return 'array';
        }
        else if (type && typeof type === 'object') {
            return 'object';
        }
        else if (type && typeof type === 'string') {
            return 'string';
        }
        else if (type && typeof type === 'number') {
            return 'number';
        }
        else if (type && typeof type === 'number' && type.toString().indexOf('.') > 0) {
            return 'decimal'
        }
    }


    static formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    static format12to24(time) {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return (sHours + ":" + sMinutes);
    }

    static addTimeToDate(date, time24) {
        var dt = date;
        dt.setHours('00', '00', '00');
        var arr = time24 ? time24.split(':') : [];
        if (arr) {
            dt.setHours(arr[0], arr[1]);
        }
        return dt;
    }

    static dateTimeObj(datetime: Date | string) {
        if (!datetime) { throw 'invalid date' }
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dateTimeO: IDateTime;
        let date: Date;
        if (typeof datetime === 'string') {
            date = new Date(datetime);
        }
        dateTimeO = {
            weekDay: date.getDay(),
            dayName: dayNames[date.getDay() + 1],
            month: date.getMonth() + 1,
            monthName: monthNames[date.getMonth()],
            monthDay: date.getDate(),
            year: date.getFullYear(),
            hh: date.getHours(),
            mm: date.getMinutes(),
            time12h: this.formatAMPM(date),
            timeZone: '',
        }
        return dateTimeO;
    }

    static toNumber(val: string) {
        if (!val) { throw 'invalid string' }
        return parseInt(val);
    }


    static copyToClipboard(copiedContent) {
        copy(copiedContent);
    }

    static firstElement(arr: any[]): any {
        if (arr && arr.length > 0) {
            return arr[0]
        }
        return null;
    }

    static setLocalStorage(key: string, value: string) {
        return localStorage.setItem(key, value);
    }
    static getLocalStorage(key: string) {
        return localStorage.getItem(key);
    }
    static removeLocalStorage(key: string) {
        return localStorage.removeItem(key);
    }

    static cleanHtml(html: string) {
        //html = html.replace(/(style="|dir=|id=")([a-zA-z -:;]+")\s?/gi,"")
        //html = html.replace(/(<\/?)(span|font?[ a-z"=\w]+)>/gim,'')
        html = html.replace(/(line|margin|padding|font|vertical|white|background)[-a-z: 0-9.]+;/gim, '')
        return html;
    }

}