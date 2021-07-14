import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetCountries, GetDiscountTypes } from '../actions/common.action';
import { tap } from 'rxjs/operators';
import { Country, DiscountType } from '../interface/passplay-common';
import { PassplayCommonService } from '../services/passplay-common.service';
import { Injectable } from '@angular/core';

export class CommonStateModel {
    discountTypes: DiscountType[];
    countries: Country[];
}

@State<CommonStateModel>({
    name: 'commonState',
    defaults: {
        countries: [],
        discountTypes: []
    }
})
@Injectable()
export class CommonState {

    constructor(private passPlayCommonService: PassplayCommonService) {
    }

    @Selector()
    static getCountryList(state: CommonStateModel) {
        return state.countries;
    }

    @Selector()
    static getDiscountTypeList(state: CommonStateModel) {
        return state.discountTypes;
    }

    @Action(GetCountries)
    getCountries({ patchState }: StateContext<CommonStateModel>) {
        return this.passPlayCommonService.getCountries().pipe(tap((result) => {
            patchState({
                countries: result
            });
        }));
    }

    @Action(GetDiscountTypes)
    getDiscountTypes({ patchState }: StateContext<CommonStateModel>) {
        return this.passPlayCommonService.getDiscountTypes().pipe(tap((result) => {
            patchState({
                discountTypes: result
            });
        }));
    }
}
