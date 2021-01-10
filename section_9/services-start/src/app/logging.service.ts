export class LoggingService{
  // A service is just a normal TS class
  logStatusChange(status: string){
    console.log('A server status changed, new status: ' + status);
  }
}