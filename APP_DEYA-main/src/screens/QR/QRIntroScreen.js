import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const QRIntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/fondoSplashScreen.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.centerContent}>
          <Image
            source={require('../../../assets/escaner.png')}
            style={styles.qrIcon}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottomContainerWrapper}>
          <BlurView intensity={30} tint="light" style={styles.glassContainer}>
            <Text style={[styles.descriptionText, { fontFamily: 'Coolvetica' }]}> 
              Escanea los QRs de los eventos de <Text style={styles.italic}>POP-UPs</Text> y gana puntos y recompensas de la marca.
            </Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.goBack()}>
              <Text style={[styles.ctaText, { fontFamily: 'Coolvetica' }]}>Continuar</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </ImageBackground>
    </View>
  );
};

const BOTTOM_SAFE_GUESS = Platform.select({ ios: 24, android: 16, default: 16 });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIcon: {
    width: 240,
    height: 240,
  },
  bottomContainerWrapper: {
    width: '92%',
    height: 100,
    alignSelf: 'center',
    marginBottom: BOTTOM_SAFE_GUESS,
    minHeight: height * 0.3,
    justifyContent: 'center',
  },
  glassContainer: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.35)',
    paddingVertical: 26,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  descriptionText: {
    color: '#111',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 18,
  },
  italic: {
    fontStyle: 'italiexplc',
  },
  ctaButton: {
    backgroundColor: '#E2A9D9',
    borderWidth: 1,
    borderColor:'#000000',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#1a1a1a',
    fontSize: 18,
  },
});

export default QRIntroScreen;


