import { Box, Divider, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { SRTFile } from '@younginch/subtitle';
import UploadSubtitle from './upload/uploadSubtitle';
import CheckSubtitle from './upload/checkSubtitle';
import UploadFinish from './upload/uploadFinish';

export default function Upload() {
  const steps = [
    { label: 'Step 1', description: '자막 업로드' },
    { label: 'Step 2', description: '확인 및 전송' },
    { label: 'Step 3', description: '검수 완료 후 게재' },
  ];

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [files, setFiles] = useState<File[]>();

  return (
    <Stack p="10px 20px 10px 20px" alignItems="center">
      <Box position="relative" p="20px 40px 20px 40px" w="100%">
        <Steps activeStep={activeStep} labelOrientation="vertical">
          {steps.map(({ label, description }) => (
            <Step
              label={label}
              key={label}
              description={description}
              className="upload-stepper"
              bg="1A202C"
              zIndex={2}
            />
          ))}
        </Steps>
        <Divider
          w="160px"
          mt="-63px"
          ml="99px"
          position="absolute"
          borderBottomWidth="2px"
          borderColor={activeStep >= 1 ? 'green.400' : 'gray.500'}
        />
        <Divider
          w="160px"
          mt="-63px"
          ml="320px"
          position="absolute"
          borderBottomWidth="2px"
          borderColor={activeStep >= 2 ? 'green.400' : 'gray.500'}
        />
      </Box>
      {
        // eslint-disable-next-line no-nested-ternary
        activeStep === 0 ? (
          <UploadSubtitle
            setFiles={setFiles}
            uploadCallback={() => nextStep()}
          />
        ) : activeStep === 1 ? (
          <CheckSubtitle
            files={files}
            setFiles={setFiles}
            sendCallback={() => nextStep()}
          />
        ) : (
          <UploadFinish />
        )
      }
    </Stack>
  );
}
