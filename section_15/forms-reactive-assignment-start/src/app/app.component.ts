import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectStatus = ['stable', 'critical', 'finished']
  projectForm: FormGroup;

  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.validateProjectName]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.validateEmailAsync),
      'status': new FormControl('stable', Validators.required)
    });
  }

  onSubmit(){
    console.log(this.projectForm)
  }

  validateProjectName(control: FormControl) : {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {'projectNameForbidden': true};
    }
    return null;
  }

  validateEmailAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(()=>{
            if (control.value === 'test@test.com') {
              resolve({'emailIsForbidden': true})
            } else {
              resolve(null);
            }
          }, 1500);
        });
    return promise
  }
}

