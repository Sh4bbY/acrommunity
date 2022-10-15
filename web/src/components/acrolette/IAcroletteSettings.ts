export interface IAcroletteSettings {
  imageSwitch: {
    type: 'timer' | 'button-click',
    duration: number,
  };
  poses: {
    exclude: [],
  };
  sound: {
    onSwitch: boolean,
  };
}
