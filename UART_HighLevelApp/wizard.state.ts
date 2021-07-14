import { State, Action, StateContext, Selector } from '@ngxs/store';
import { WizardConfig } from '../interface/wizardConfig';
import { NextWizardStep, PreviousWizardStep, SetWizardConfig } from '../actions/wizard.action';
import { Injectable } from '@angular/core';
import { DefaultWizard } from '../components/general/member-rewards/common/wizard-steps.enum';

export class WizardStateModel {
    wizardConfig: WizardConfig;
    currentStepIndex: number;
    currentStep: string;
}

@State<WizardStateModel>({
    name: 'wizardState',
    defaults: {
        wizardConfig: DefaultWizard,
        currentStepIndex: 0,
        currentStep: null
    }
})
@Injectable()
export class WizardState {

    @Selector()
    static getWizardConfig(state: WizardStateModel) {
        return state.wizardConfig;
    }

    @Selector()
    static getCurrentStep(state: WizardStateModel) {
        return state.currentStep;
    }

    @Selector()
    static getCurrentStepIndex(state: WizardStateModel) {
        return state.currentStepIndex;
    }

    @Action(SetWizardConfig)
    setWizardConfig({ patchState }: StateContext<WizardStateModel>, { payload }: SetWizardConfig) {
        patchState({
            wizardConfig: payload,
            currentStepIndex: 1,
            currentStep: payload.steps[1]
        });
    }

    @Action(NextWizardStep)
    nextWizardStep({ getState, patchState }: StateContext<WizardStateModel>) {
        const state = getState();
        const newIndex = state.currentStepIndex + 1;
        patchState({
            currentStepIndex: newIndex >= state.wizardConfig.steps.length ? state.currentStepIndex : newIndex,
            currentStep: newIndex >= state.wizardConfig.steps.length ? state.currentStep : state.wizardConfig.steps[newIndex]
        });
    }

    @Action(PreviousWizardStep)
    previousWizardStep({ getState, patchState }: StateContext<WizardStateModel>) {
        const state = getState();
        const newIndex = state.currentStepIndex - 1;
        patchState({
            currentStepIndex: newIndex < 0 ? state.currentStepIndex : newIndex,
            currentStep: newIndex < 0 ? state.currentStep : state.wizardConfig.steps[newIndex]
        });
    }
}
