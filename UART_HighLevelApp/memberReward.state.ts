import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MemberRewardPolicy, MemberRewardPolicyType } from '../interface/memberReward';
import { AddMemberReward, GetMemberRewardPolicyTypes, GetMemberRewards, SetMemberReward } from '../actions/memberReward.action';
import { MemberRewardsService } from '../services/member-rewards.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class MemberRewardStateModel {
    memberRewardPolicyTypes: MemberRewardPolicyType[];
    memberRewardPolicies: MemberRewardPolicy[];
    selectedMemberReward: MemberRewardPolicy;
}

@State<MemberRewardStateModel>({
    name: 'memberRewardState',
    defaults: {
        memberRewardPolicyTypes: [],
        memberRewardPolicies: [],
        selectedMemberReward: {}
    }
})
@Injectable()
export class MemberRewardState {

    constructor(private memberRewardService: MemberRewardsService) {
    }

    @Selector()
    static getMemberRewardPolicyTypeList(state: MemberRewardStateModel) {
        return state.memberRewardPolicyTypes;
    }

    @Selector()
    static getMemberRewardPolicyList(state: MemberRewardStateModel) {
        return state.memberRewardPolicies;
    }

    @Selector()
    static getSelectedMemberReward(state: MemberRewardStateModel) {
        return state.selectedMemberReward;
    }

    @Action(SetMemberReward)
    setMemberReward({ getState, patchState }: StateContext<MemberRewardStateModel>, { payload }: SetMemberReward) {
        const memberReward = getState().selectedMemberReward;
        patchState({
            selectedMemberReward: {...memberReward, ...payload}
        });
    }

    @Action(GetMemberRewardPolicyTypes)
    getMemberRewardPolicyTypes({ patchState }: StateContext<MemberRewardStateModel>) {
        return this.memberRewardService.getUnlockPolicyTypes().pipe(tap((result) => {
            patchState({
                memberRewardPolicyTypes: result,
            });
        }));
    }

    @Action(GetMemberRewards)
    getMemberRewardPolicies({ patchState }: StateContext<MemberRewardStateModel>) {
        return this.memberRewardService.getUnlockPolicies().pipe(tap((result) => {
            patchState({
                memberRewardPolicies: result,
            });
        }));
    }

    @Action(AddMemberReward)
    addMemberReward({ getState, patchState }: StateContext<MemberRewardStateModel>) {
        const state = getState();
        return this.memberRewardService.addUnlockPolicy(state.selectedMemberReward).pipe(tap(() => {
            patchState({
                selectedMemberReward: null
            });
        }));
    }
}
