import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlots from '../reducers/search-slot.reducer';
import { selectQueryParam } from '../../router/selectors/router.selectors';
import { ISlot } from 'src/app/models/search.model';

export const selectSlotState = createFeatureSelector<fromSlots.ISlotsState>(
    fromSlots.slotsFeatureKey,
);


export const selectSlotsLoading = createSelector(
    selectSlotState,
    fromSlots.getSlotsLoading,
);

export const selectSlotsEntities = createSelector(
    selectSlotState,
    fromSlots.getSlotsEntities,
);

export const selectSlotsErrors = createSelector(
    selectSlotState,
    fromSlots.getSlotsErrors,
);
  
/**
 * Select slot details from query param id and slot entities.
 * 
 * Keep in mind this method only works after the slot entities is filled (slots are fetched from API) (the slot list page is rendered before).
 * A better way to do this is to query slot detail from an API or cached entities.
 */
export const selectSlotDetails = createSelector(
    selectSlotsEntities,
    selectQueryParam('id'),
    (entities: ReadonlyArray<ISlot>, slotId) => 
        entities.find((m) => m.id === slotId)
);
