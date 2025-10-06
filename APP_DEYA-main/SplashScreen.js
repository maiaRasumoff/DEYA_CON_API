import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('WelcomeScreen');
    }, 2000); // 2 segundos
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('./assets/fondoSplashScreen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
});

export default SplashScreen; 