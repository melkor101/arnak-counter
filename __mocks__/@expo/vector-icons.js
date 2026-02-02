import React from 'react';
import { Text } from 'react-native';

export const MaterialCommunityIcons = ({ name, size, color, testID, ...props }) => (
  <Text testID={testID || `icon-${name}`} {...props}>{name}</Text>
);
