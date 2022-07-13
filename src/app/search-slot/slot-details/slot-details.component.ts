import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from "moment";
import { HumanizeDurationLanguage, HumanizeDuration, } from "humanize-duration-ts";
import { select, Store } from '@ngrx/store';
import { ISlotsState } from 'src/app/store/slots/reducers/search-slot.reducer';
//import { entities } from 'src/app/store/slots/selectors/search-slot.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slot-details',
  templateUrl: './slot-details.component.html',
  styleUrls: ['./slot-details.component.scss']
})
export class SlotDetailsComponent implements OnInit {

    //filterArr$ = this.store.pipe(select(state.entitie));
    results$: Observable<ISlotsState[]>
    constructor(
    private location: Location,
    public route: ActivatedRoute,
    public store: Store<ISlotsState>,
  ) { }

  public langService: HumanizeDurationLanguage = new HumanizeDurationLanguage();
    public humanizer: HumanizeDuration = new HumanizeDuration(this.langService);

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
}

public getDuration(start: string, end: string) {
    const duration = moment
        .duration(moment(end).diff(moment(start)))
        .asMilliseconds();
    return this.humanizer.humanize(duration, { serialComma: false });
}

}
