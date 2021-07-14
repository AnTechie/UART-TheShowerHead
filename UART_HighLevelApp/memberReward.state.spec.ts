import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { NotificationTypes } from '../enums/notification-types.enum';
import { MemberRewardPolicy, MemberRewardPolicyType } from '../interface/memberReward';
import { StoreGroup } from '../interface/passplay-common';
import { Store as CommonStore } from '../interface/passplay-common';
import { MemberRewardState } from './memberReward.state';
import { MemberRewardsService } from '../services/member-rewards.service';
import { AddMemberReward, GetMemberRewardPolicyTypes, GetMemberRewards, SetMemberReward } from '../actions/memberReward.action';

describe('Member Reward State', () => {
    let store: Store;

    const unlockPolicyTypeData = [
        { type: 'Geo Fence', id: NotificationTypes.geoFence },
        { type: 'On The Fly', id: NotificationTypes.onTheFly },
        { type: 'Service', id: NotificationTypes.service},
        { type: 'Post Purchase', id: NotificationTypes.postPurchase}

    ];

    const testStore: CommonStore = {
      storeNumber: 1,
      storeName: 'test'
    };

    const testStoreGroup: StoreGroup = {
      group: 1,
      stores: [testStore]
    };

    const testMemberRewardPolicy = {
        id: 331,
        active: false,
        avatarUrl: 'https://public.passplay.nike-cloud.com/benefit_avatar/white_swoosh.png',
        amount: 0,
        audienceId: null,
        benefitId: '6f817864-4a44-4f95-b645-2439c8f4995a',
        benefitIdLink: null,
        countryCode: 100,
        description: 'Barcelona GWP',
        discountTypeId: 1,
        expirationHours: 7,
        expirationHoursLink: null,
        gender: 'M',
        invitationId: null,
        isOnTheFly: false,
        items: null,
        itemType: null,
        limit: null,
        localeCurrencyCode: 'EUR',
        maxAllowed: 1,
        maxActive: 1,
        notificationTypeDescription: 'passplay:store:unlock',
        notificationTypeId: 1,
        notificationUri: 'mynike://x-callback-url/editorial-thread?thread-id=6f817864-4a44-4f95-b645-2439c8f4995a',
        promoCode: null,
        promoCodeType: null,
        redemptionLocationGroupId: null,
        redemptionStoreGroup: testStoreGroup,
        serviceTypeId: null,
        storeGroup: testStoreGroup,
        storeIdOverride: 'a688e0ae-abf5-4fcc-97b0-91def8da2340',
        threshold: 1,
        triggerId: null,
        validFrom: '2019-12-24T11:00:00+00:00',
        validTo: '2020-01-07T15:00:00+00:00'
    };

    const testPolicies: MemberRewardPolicy[] = [testMemberRewardPolicy];

    class UnlockMock {
        getUnlockPolicyTypes(): Observable<MemberRewardPolicyType[]> {
            return of(unlockPolicyTypeData);
        }
        getUnlockPolicies(): Observable<MemberRewardPolicy[]> {
            return of(testPolicies);
        }
        addUnlockPolicy(policy: MemberRewardPolicy, stores: number[]): Observable<object> {
            return of({});
        }
    }
    const unlockSvcMock = new UnlockMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([MemberRewardState])],
        providers: [
            { provide: MemberRewardsService, useValue: unlockSvcMock }
          ]
        });

        store = TestBed.inject(Store);
    });

    describe('getMemberRewardPolicyTypes', () => {
        it('it gets the member reward policy types', () => {
            store.dispatch(new GetMemberRewardPolicyTypes());

            const memberRewardState = store.selectSnapshot(x => x.memberRewardState);

            expect(memberRewardState.memberRewardPolicyTypes).toEqual(unlockPolicyTypeData);
        });
    });

    describe('getMemberRewardPolicies', () => {
        it('it gets the member reward policies', () => {
            store.dispatch(new GetMemberRewards());

            const memberRewardState = store.selectSnapshot(x => x.memberRewardState);

            expect(memberRewardState.memberRewardPolicies).toEqual(testPolicies);
        });
    });

    describe('setMemberReward', () => {
        it('sets the member reward', () => {
            store.dispatch(new SetMemberReward(testMemberRewardPolicy));

            const memberRewardState = store.selectSnapshot(x => x.memberRewardState);

            expect(memberRewardState.selectedMemberReward).toEqual(testMemberRewardPolicy);
        });
    });

    describe('addMemberReward', () => {
        it('adds the member reward and resets the selected member Reward', () => {
            spyOn(unlockSvcMock, 'addUnlockPolicy').and.callThrough();

            store.dispatch(new SetMemberReward(testMemberRewardPolicy));
            store.dispatch(new AddMemberReward());

            const memberRewardState = store.selectSnapshot(x => x.memberRewardState);

            expect(memberRewardState.selectedMemberReward).toEqual(null);
            expect(unlockSvcMock.addUnlockPolicy).toHaveBeenCalled();
        });
    });

    describe('getMemberRewardPolicyTypeList', () => {
        it('it gets the discount types', () => {
            store.dispatch(new GetMemberRewardPolicyTypes());

            const memberRewardPolicyTypes = store.selectSnapshot(MemberRewardState.getMemberRewardPolicyTypeList);

            expect(memberRewardPolicyTypes).toEqual(unlockPolicyTypeData);
        });
    });

    describe('getMemberRewardPolicyList', () => {
        it('it gets the countries', () => {
            store.dispatch(new GetMemberRewards());

            const memberRewardPolicies = store.selectSnapshot(MemberRewardState.getMemberRewardPolicyList);

            expect(memberRewardPolicies).toEqual(testPolicies);
        });
    });

    describe('getSelectedMemberReward', () => {
        it('it gets the selected member reward', () => {
            store.dispatch(new SetMemberReward(testMemberRewardPolicy));

            const selectedMemberReward = store.selectSnapshot(MemberRewardState.getSelectedMemberReward);

            expect(selectedMemberReward).toEqual(testMemberRewardPolicy);
        });
    });
});
