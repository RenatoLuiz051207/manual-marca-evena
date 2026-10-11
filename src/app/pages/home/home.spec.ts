import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('creates the home without scroll-lock or animation timers', () => {
    expect(TestBed.createComponent(Home).componentInstance).toBeTruthy();
  });
});
