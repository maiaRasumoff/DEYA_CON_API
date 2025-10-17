import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Coolvetica': require('../../assets/Fonts/Coolvetica Rg.otf'),
    'Neuton-Light': require('../../assets/Fonts/Neuton-Light.ttf'),
  });
};
