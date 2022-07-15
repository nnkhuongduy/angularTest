import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from "moment";
import { HumanizeDurationLanguage, HumanizeDuration, } from "humanize-duration-ts";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSlotDetails } from 'src/app/store';
import { ISlot } from 'src/app/models/search.model';

@Component({
  selector: 'app-slot-details',
  templateUrl: './slot-details.component.html',
  styleUrls: ['./slot-details.component.scss']
})
export class SlotDetailsComponent implements OnInit, OnDestroy {
    result: ISlot; // Slot details result
    subscription: Subscription;

    constructor(
    private location: Location,
    public route: ActivatedRoute,
    public store: Store,
  ) { }

  public langService: HumanizeDurationLanguage = new HumanizeDurationLanguage();
    public humanizer: HumanizeDuration = new HumanizeDuration(this.langService);

  ngOnInit(): void {
    // Subscribe to get slot details from query params and entites data
    this.subscription = this.store
      .select(selectSlotDetails)
      .subscribe((slot) => {
        this.result = slot;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
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
