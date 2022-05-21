import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';

/*
Contains the default text styles
Scaled by device size
*/

let fontSizeRatio: number = 1;

if (PixelRatio.get() <= 2) {
  fontSizeRatio = 0.8;
}
const styles = StyleSheet.create({
  smallText: {
    fontSize: 15 * fontSizeRatio,
    textAlign: 'center',
  },
  mediumText: {
    fontSize: 20 * fontSizeRatio,
    textAlign: 'center',
  },
  largeText: {
    fontSize: 30 * fontSizeRatio,
    textAlign: 'center',
  },
});

export default styles;
