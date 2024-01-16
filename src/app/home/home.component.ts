import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../Services/UserService';
import { HomeData } from '../Models/HomeData';
import { Subscription, lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  phraseParam = '';
  cityParam = '';
  homeData: HomeData[] = [];

  subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private route: ActivatedRoute) {};

  async ngOnInit(): Promise<void> {
    const phrase = this.route.snapshot.queryParams['phrase'] ?? '';
    const city = this.route.snapshot.queryParams['city'] ?? '';
    this.homeData = await lastValueFrom(this.userService.getHomeData(phrase, city));
    this.phraseParam = phrase;
    this.cityParam = city;

    this.subscription = this.route.queryParams.subscribe(async (params) => {
      const phrase = params['phrase'] ?? '';
      const city = params['city'] ?? '';
      if (phrase !== this.phraseParam || city !== this.cityParam) {
      this.phraseParam = phrase;
      this.cityParam = city;
      this.homeData = await lastValueFrom(this.userService.getHomeData(phrase, city));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
