import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePostsComponent } from './game-posts.component';

describe('GamePostsComponent', () => {
  let component: GamePostsComponent;
  let fixture: ComponentFixture<GamePostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamePostsComponent]
    });
    fixture = TestBed.createComponent(GamePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
