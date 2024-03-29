import { Box, createIcon } from '@chakra-ui/react';

type IconProps = {
  size: number | string;
  // eslint-disable-next-line react/require-default-props
  fill?: string;
};

export const SubCloudSVG = createIcon({
  displayName: 'SubCloud Logo ',
  viewBox: '0 0 740 640',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M344.63086,89.46647c91.75941,0,166.99546,56.97585,174.1405,129.39647c48.80328,9.93893,86.14452,65.01781,86.14452,131.47472c0,65.94489-36.76806,120.68639-85.01855,131.23697l-.11278,75.68546-116.8136-66.32496c-98.01612,0-232.3118,0-232.3118,0-66.69551,0-121.48678-67.103-121.48678-140.59748s54.06739-133.07352,120.7629-133.07352c.24146,0,.48275.00078.72388.00234c8.08456-71.65973,82.88761-127.80002,173.9717-127.80002l.00001.00002ZM322.22452,328.77159v-50.63286h-155.01571v50.63286h155.01571Zm189.08987,0v-50.63286h-137.29741v50.63286h137.29741Zm0,92.09558v-50.63286h-180.40573v50.63286h180.40573Zm-231.35227,0v-50.63286h-112.75331v50.63286h112.75331Z"
        fill="inherit"
        strokeWidth="0"
      />
    </g>
  ),
});

export function SubcloudIcon({ size, fill }: IconProps) {
  return (
    <Box minW={size} minH={size}>
      <SubCloudSVG w={size} h={size} fill={fill || '#00dbdb'} />
    </Box>
  );
}
