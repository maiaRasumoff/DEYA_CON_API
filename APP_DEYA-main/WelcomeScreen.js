import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Font from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;
  const float4 = useRef(new Animated.Value(0)).current;
  const fontsLoadedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Coolvetica: require('./assets/fonts/Coolvetica.ttf'),
          Neuton: require('./assets/fonts/Neuton-Regular.ttf'),
        });
        if (isMounted) {
          fontsLoadedRef.current = true;
        }
      } catch (e) {}
    };
    loadFonts();

    const makeFloat = (anim, delayMs) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: -12, duration: 1500, delay: delayMs, useNativeDriver: true, easing: undefined }),
          Animated.timing(anim, { toValue: 0, duration: 1500, useNativeDriver: true, easing: undefined }),
        ])
      ).start();
    };
    makeFloat(float1, 0);
    makeFloat(float2, 300);
    makeFloat(float3, 600);
    makeFloat(float4, 900);

    return () => { isMounted = false; };
  }, [float1, float2, float3, float4]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFE5E1", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />

      <View style={styles.imageContainer}>
        <BlurView intensity={30} tint="light" style={styles.blurBackdrop} />
        <Image source={require('./assets/popup.jpg')} style={styles.popupImage} />

        <Animated.Image
          source={require('./assets/popupCherry.png')}
          style={[styles.floatingImg, styles.floatTopLeft, { transform: [{ translateY: float1 }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('./assets/popupLoewe.png')}
          style={[styles.floatingImg, styles.floatTopRight, { transform: [{ translateY: float2 }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('./assets/popupRosa.png')}
          style={[styles.floatingImg, styles.floatBottomLeft, { transform: [{ translateY: float3 }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('./assets/popupLacoste')}
          style={[styles.floatingImg, styles.floatBottomRight, { transform: [{ translateY: float4 }] }]}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.title, { fontFamily: 'Coolvetica' }]}>POP-UPS CERCA TUYO</Text>
      <Text style={[styles.subtitle, { fontFamily: 'Neuton' }]}>
        Deyá te muestra dónde y cuándo encontrarlos, mientras sumás puntos por visitarlos.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}> 
          <Text style={[styles.registerButtonText, { fontFamily: 'Neuton' }]}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.loginButtonText, { fontFamily: 'Neuton' }]}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ICON_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  logo: {
    width: 70,
    height: 50,
    marginBottom: 16,
    marginTop: 8,
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurBackdrop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    overflow: 'hidden',
  },
  popupImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingImg: {
    position: 'absolute',
    width: 90,
    height: 90,
  },
  floatTopLeft: { top: -10, left: -30 },
  floatTopRight: { top: -20, right: -30 },
  floatBottomLeft: { bottom: -10, left: -28 },
  floatBottomRight: { bottom: -14, right: -26 },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
    color: '#111',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
  },
  registerButton: {
    backgroundColor: '#F472B6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#F472B6',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen; 