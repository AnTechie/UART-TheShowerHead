import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store, Select } from '@ngxs/store';
import { NextWizardStep, PreviousWizardStep, SetWizardConfig } from '../actions/wizard.action';
import { OnTheFlyWizard } from '../components/general/member-rewards/common/wizard-steps.enum';
import { WizardConfig } from '../interface/wizardConfig';
import { WizardState } from './wizard.state';

describe('Wizard State', () => {
  let store: Store;

  const testWizardConfig: WizardConfig = {
      title: 'Test',
      steps: ['oneStep', 'twoStep']
  };

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([WizardState])]
        });

        store = TestBed.inject(Store);
    });

    describe('setWizardConfig', () => {
        it('it inits the wizard config', () => {
            store.dispatch(new SetWizardConfig(OnTheFlyWizard));

            const wizardConfig = store.selectSnapshot(x => x.wizardState.wizardConfig);
            const currentStepIndex = store.selectSnapshot(x => x.wizardState.currentStepIndex);
            const currentStep = store.selectSnapshot(x => x.wizardState.currentStep);

            expect(wizardConfig).toBeTruthy();
            expect(currentStepIndex).toEqual(1);
            expect(currentStep).toBeTruthy(wizardConfig.steps[1]);
        });
    });

    describe('nextWizardStep', () => {
        it('it increases the index when not at last step', () => {
            store.dispatch(new SetWizardConfig(OnTheFlyWizard));
            store.dispatch(new NextWizardStep());

            const wizardState = store.selectSnapshot(x => x.wizardState);

            expect(wizardState.currentStep).toEqual(OnTheFlyWizard.steps[2]);
            expect(wizardState.currentStepIndex).toEqual(2);
        });

        it('it does not increase the index when at last step', () => {
            store.dispatch(new SetWizardConfig(testWizardConfig));
            store.dispatch(new NextWizardStep());

            let state = store.selectSnapshot(x => x.wizardState);

            expect(state.currentStep).toEqual(testWizardConfig.steps[1]);
            expect(state.currentStepIndex).toEqual(1);

            store.dispatch(new NextWizardStep());

            state = store.selectSnapshot(x => x.wizardState);

            expect(state.currentStep).toEqual(testWizardConfig.steps[1]);
            expect(state.currentStepIndex).toEqual(1);
        });
    });

    describe('previousWizardStep', () => {
        it('it decreases the index when not at first step', () => {
            store.dispatch(new SetWizardConfig(OnTheFlyWizard));
            store.dispatch(new NextWizardStep());

            let state = store.selectSnapshot(x => x.wizardState);

            expect(state.currentStep).toEqual(OnTheFlyWizard.steps[2]);
            expect(state.currentStepIndex).toEqual(2);

            store.dispatch(new PreviousWizardStep());

            state = store.selectSnapshot(x => x.wizardState);

            expect(state.currentStep).toEqual(OnTheFlyWizard.steps[1]);
            expect(state.currentStepIndex).toEqual(1);
        });

        it('it does not decrease the index when at first step', () => {
            store.dispatch(new SetWizardConfig(testWizardConfig));
            store.dispatch(new PreviousWizardStep());

            const state = store.selectSnapshot(x => x.wizardState);

            expect(state.currentStep).toEqual(testWizardConfig.steps[0]);
            expect(state.currentStepIndex).toEqual(0);
        });
    });

    describe('getCurrentStep', () => {
        it('gets the current step', () => {
            store.dispatch(new SetWizardConfig(OnTheFlyWizard));

            let currentStep = store.selectSnapshot(WizardState.getCurrentStep);

            expect(currentStep).toEqual(OnTheFlyWizard.steps[1]);

            store.dispatch(new NextWizardStep());

            currentStep = store.selectSnapshot(WizardState.getCurrentStep);

            expect(currentStep).toEqual(OnTheFlyWizard.steps[2]);
        });
    });

    describe('getCurrentStepIndex', () => {
        it('gets the current step index', () => {
            store.dispatch(new SetWizardConfig(OnTheFlyWizard));

            let currentStepIndex = store.selectSnapshot(WizardState.getCurrentStepIndex);

            expect(currentStepIndex).toEqual(1);

            store.dispatch(new NextWizardStep());

            currentStepIndex = store.selectSnapshot(WizardState.getCurrentStepIndex);

            expect(currentStepIndex).toEqual(2);
        });
    });

    describe('getWizardConfig', () => {
        it('gets the wizard config', () => {
            store.dispatch(new SetWizardConfig(OnTheFlyWizard));

            const wizardConfig = store.selectSnapshot(WizardState.getWizardConfig);

            expect(wizardConfig).toEqual(OnTheFlyWizard);
        });
    });
});
