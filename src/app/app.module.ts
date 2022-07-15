import { AppComponent } from "./app/app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import SearchService from "./services/search.service";
import { SearchComponent } from "./search/search.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SearchSlotComponent } from "./search-slot/search-slot.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { searchSlotReducer } from "./store/slots/reducers/search-slot.reducer";
import { SlotEffects } from "./store/slots/effects/search-slot.effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouterSerializer } from './store/routerSerializer';
import { SlotDetailsComponent } from './search-slot/slot-details/slot-details.component';


@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SearchFormComponent,
        SearchResultsComponent,
        SearchSlotComponent,
        SlotDetailsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        StoreModule.forRoot({slots: searchSlotReducer, router: routerReducer}),
        //StoreModule.forRoot({reducers}),
        EffectsModule.forRoot([SlotEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot({
            serializer: RouterSerializer
        }),
        //StoreRouterConnectingModule.forRoot(),
    ],
    providers: [SearchService],
    bootstrap: [AppComponent],
})
export class AppModule {}
