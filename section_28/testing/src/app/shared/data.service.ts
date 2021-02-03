import { ResolvedReflectiveFactory } from "@angular/core"

export class DataService {
  getDetails() {
    const resultPromise: Promise<string> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data');
      },1500);
    });
    return resultPromise;
  }
}