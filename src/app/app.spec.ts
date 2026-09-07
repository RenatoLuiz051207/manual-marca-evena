import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('Evena app', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('creates the manual', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('lets the visitor pause and resume motion', () => {
    const app = TestBed.createComponent(App).componentInstance;
    const initial = app.motionEnabled();
    app.toggleMotion();
    expect(app.motionEnabled()).toBe(!initial);
    app.toggleMotion();
    expect(app.motionEnabled()).toBe(initial);
  });
});
