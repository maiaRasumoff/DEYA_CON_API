import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PersonalizacionExitosaScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoHome = () => {
    // Animación de salida antes de navegar
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Home');
    });
  };

  return (
    <ImageBackground 
      source={require('./assets/fondoWelcome.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View 
            style={[
              styles.animationContainer,
              {
                transform: [
                  { scale: scaleAnim },
                  { translateY: slideAnim }
                ],
                opacity: fadeAnim
              }
            ]}
          >
            {/* Ícono central animado */}
            <View style={styles.iconContainer}>
              <Text style={styles.successIcon}>🎉</Text>
              <View style={styles.iconGlow} />
            </View>

            {/* Título principal */}
            <Text style={styles.title}>
              ¡Listo! Personalizamos tu experiencia 🎉
            </Text>

            {/* Subtítulo */}
            <Text style={styles.subtitle}>
              Ahora vas a ver los eventos y marcas que más se parecen a vos.
            </Text>

            {/* Elementos decorativos */}
            <View style={styles.decorativeElements}>
              <View style={[styles.decorativeDot, styles.dot1]} />
              <View style={[styles.decorativeDot, styles.dot2]} />
              <View style={[styles.decorativeDot, styles.dot3]} />
            </View>
          </Animated.View>

          {/* Botón de acción */}
          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleGoHome}
              activeOpacity={0.8}
            >
              <Text style={styles.homeButtonText}>Ir al inicio</Text>
              <Text style={styles.homeButtonIcon}>🏠</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  successIcon: {
    fontSize: 80,
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: 'rgba(52, 168, 83, 0.3)',
    borderRadius: 50,
    zIndex: 1,
  },
  title: {
    fontFamily: 'Neuton-Light',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'Coolvetica',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    maxWidth: width * 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  decorativeElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  decorativeDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: 'rgba(52, 168, 83, 0.6)',
    borderRadius: 4,
  },
  dot1: {
    top: '20%',
    left: '10%',
  },
  dot2: {
    top: '60%',
    right: '15%',
  },
  dot3: {
    bottom: '30%',
    left: '20%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#34A853',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
    minWidth: 200,
  },
  homeButtonText: {
    fontFamily: 'Coolvetica',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  homeButtonIcon: {
    fontSize: 20,
  },
});

export default PersonalizacionExitosaScreen;
