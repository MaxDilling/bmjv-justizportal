import { HStack, Spacer } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import * as React from 'react';
import { ProgressBarStep } from './ProgressBarStep';
import { t } from '@lingui/macro';

interface FeatureProps {
  currentStep: number;
  progressNextStepInput?: number | undefined;
}

const NUMBER_STEPS = 3;

export const StaticProgress = ({ currentStep, progressNextStepInput, ...rest }: FeatureProps) => {
  let progressNextStep = progressNextStepInput === undefined ? 0 : progressNextStepInput;
  let progressPercentages: number[] = [];
  for (let i = 1; i < currentStep; i++) {
    progressPercentages.push(100);
  }
  progressPercentages.push(progressNextStep);
  for (let i = currentStep + 2; i < NUMBER_STEPS; i++) {
    progressPercentages.push(0);
  }
  return (
    <HStack width="100%" spacing="-1px" justifyContent="center" alignContent="center" paddingTop={4}>
      <Spacer flex="1" />
      <ProgressBarStep filled={currentStep >= 1} title={t`1. Ansprüche Prüfen`} />
      <Progress colorScheme="green" size="sm" value={progressPercentages[0]} flex="1" zIndex="-1" />
      <ProgressBarStep filled={currentStep >= 2} title={t`2. Mögliche Ansprüche`} />
      <Progress colorScheme="green" size="sm" value={progressPercentages[1]} flex="1" zIndex="-1" />
      <ProgressBarStep filled={currentStep >= 3} title={t`3. Nächste Schritte`} />
      <Spacer flex="1" />
    </HStack>
  );
};
