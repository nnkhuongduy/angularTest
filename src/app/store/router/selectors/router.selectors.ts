import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterState } from '../../routerSerializer';

export interface State {
    router: fromRouter.RouterReducerState<RouterState>;
}

/**
 * Select router-store state
 */
const selectRouter = createFeatureSelector<
    State,
    fromRouter.RouterReducerState<RouterState>
>('router');

/**
 * Select a specified query param
 * @param param parameter name
 * @returns parameter value from the url
 */
export const selectQueryParam = (param: string) =>
    createSelector(selectRouter, ({ state }) => state.params[param]);
