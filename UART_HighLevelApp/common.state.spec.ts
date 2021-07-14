import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { GetCountries, GetDiscountTypes } from '../actions/common.action';
import { SpecialDiscountTypes } from '../constants/discountTypes';
import { Country, DiscountType } from '../interface/passplay-common';
import { PassplayCommonService } from '../services/passplay-common.service';
import { CommonState } from './common.state';

describe('Common State', () => {
    let store: Store;

    const mockCountries: Country[] = [
        {
            currencyCode: 'USD',
            countryCode: 100,
            name: 'United States',
            geo: 'NA',
        },
        {
            currencyCode: 'CAD',
            countryCode: 200,
            name: 'Canada',
            geo: 'NA',
        }
    ];
    const mockDiscountTypes = [
        SpecialDiscountTypes.none,
        SpecialDiscountTypes.itemLevel,
        { id: 1, type: 'Threshold' },
        { id: 2, type: 'concept2' },
        { id: 3, type: 'concept3' },
        { id: 4, type: 'concept4' },
    ];

    class PassplayCommonMock {
        getDiscountTypes(): Observable<DiscountType[]> {
            return of(mockDiscountTypes);
        }
        getCountries(): Observable<Country[]> {
            return of(mockCountries);
        }
    }

    const serviceMock = new PassplayCommonMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([CommonState])],
        providers: [
            { provide: PassplayCommonService, useValue: serviceMock }
          ]
        });

        store = TestBed.inject(Store);
    });

    describe('getCountries', () => {
        it('it gets the countries', () => {
            store.dispatch(new GetCountries());

            const commonState = store.selectSnapshot(x => x.commonState);

            expect(commonState.countries).toEqual(mockCountries);
        });
    });

    describe('getDiscountTypes', () => {
        it('it gets the discount types', () => {
            store.dispatch(new GetDiscountTypes());

            const commonState = store.selectSnapshot(x => x.commonState);

            expect(commonState.discountTypes).toEqual(mockDiscountTypes);
        });
    });

    describe('getCountryList', () => {
        it('it gets the countries', () => {
            store.dispatch(new GetCountries());

            const countryList = store.selectSnapshot(CommonState.getCountryList);

            expect(countryList).toEqual(mockCountries);
        });
    });

    describe('getDiscountTypeList', () => {
        it('it gets the discount types', () => {
            store.dispatch(new GetDiscountTypes());

            const discountTypeList = store.selectSnapshot(CommonState.getDiscountTypeList);

            expect(discountTypeList).toEqual(mockDiscountTypes);
        });
    });
});
