import { DataStorageService } from "../shared/data-storage.service";

export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpDate: Date){}

  get token() {
    // This is a getter. It allows the user to getthe private attribute, but it can be controlled and validated. 
    // Also it can't be changed. 
    // usage: user.token
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
      
    }
    return this._token;
  }
}