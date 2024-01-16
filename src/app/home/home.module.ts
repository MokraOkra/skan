import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { MiniProfileModule } from "./mini-profile/mini-profile.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
        CommonModule,
        MiniProfileModule
    ],
    providers: [],
  })
  export class HomeModule { }