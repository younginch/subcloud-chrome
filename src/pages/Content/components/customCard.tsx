/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@chakra-ui/react';
import React, { ForwardedRef } from 'react';

type CustomProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line import/prefer-default-export
export const CustomCard = React.forwardRef(
  ({ children, ...rest }: CustomProps, ref: ForwardedRef<any>) => (
    <Box p="1" ref={ref} {...rest}>
      {children}
    </Box>
  )
);
