import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { DataService } from '../shared/data.service';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {

  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name from the service', () => {
    let userService = fixture.debugElement.injector.get(UserService);
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display user name if user is logged in', () => {
    const compiled = fixture.nativeElement;
    // Put app in logged in state
    component.isLoggedIn = true;
    // Detect changes after component has been updated
    fixture.detectChanges();    
    expect(compiled.querySelector('p').textContent).toContain(component.user.name);
  });

  it('should\'t display user name if user is not logged in', () => {
    const compiled = fixture.nativeElement;
    // Put app in logged in state
    component.isLoggedIn = false;
    // Detect changes after component has been updated
    fixture.detectChanges();    
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
    expect(compiled.querySelector('p').textContent).toContain('please log in');
  });

  it('should\'t fetch data successfully if not called asynchronously', () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toBe(undefined);
  });

  it('should fetch data successfully if called asynchronously', waitForAsync (() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    });    
  }));

  it('should fetch data successfully if called asynchronously', fakeAsync (() => {
    // For fakeAsync, the fixture and component need to be initialized in the test.
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.data).toBe('Data');
  }));
});
