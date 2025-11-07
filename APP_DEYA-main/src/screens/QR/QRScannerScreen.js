import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const QRScannerScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Actualizar estado de carga basado en permisos
    if (permission !== null) {
      setIsLoading(false);
      
      // Solicitar permisos automáticamente si es posible
      if (!permission.granted && permission.canAskAgain) {
        requestPermission();
      }
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = ({ type, data }) => {
    // Prevenir escaneos múltiples del mismo código
    if (scanned && lastScannedCode === data) {
      return;
    }

    // Solo procesar códigos QR (aunque barcodeScannerSettings ya filtra, 
    // es una verificación adicional por seguridad)
    if (type !== 'qr') {
      return;
    }

    setScanned(true);
    setLastScannedCode(data);

    // Mostrar alerta de éxito
    Alert.alert(
      '¡Felicitaciones!',
      '🎉 ¡Felicitaciones! Ganaste 5 puntos en Deyá Rewards.',
      [
        {
          text: 'Aceptar',
          onPress: () => {
            // Resetear el estado después de un breve delay para permitir escanear otro código
            setTimeout(() => {
              setScanned(false);
            }, 2000);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (isLoading || permission === null) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#E2A9D9" />
          <Text style={[styles.permissionText, { fontFamily: 'Coolvetica' }]}>
            Cargando escáner...
          </Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={[styles.permissionText, { fontFamily: 'Coolvetica' }]}>
            Se necesita acceso a la cámara para escanear códigos QR
          </Text>
          {permission.canAskAgain && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={requestPermission}
            >
              <Text style={[styles.backButtonText, { fontFamily: 'Coolvetica' }]}>
                Otorgar Permiso
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={[styles.backButtonText, { fontFamily: 'Coolvetica' }]}>
              Volver
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      {/* Overlay con efecto blur/glassmorphism */}
      <View style={styles.overlay}>
        {/* Zona superior oscura */}
        <View style={styles.overlayTop} />

        {/* Zona central con el marco del escáner */}
        <View style={styles.overlayCenter}>
          {/* Zona izquierda oscura */}
          <View style={styles.overlaySide} />

          {/* Marco central con efecto glassmorphism */}
          <View style={styles.scannerFrameContainer}>
            <View style={styles.frameWrapper}>
              <BlurView intensity={15} tint="dark" style={styles.blurBackground} />
              <Image
                source={require('../../../assets/escaner.png')}
                style={styles.scannerFrame}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Zona derecha oscura */}
          <View style={styles.overlaySide} />
        </View>

        {/* Zona inferior oscura con instrucciones */}
        <View style={styles.overlayBottom}>
          <BlurView intensity={30} tint="dark" style={styles.instructionsContainer}>
            <Text style={[styles.instructionsText, { fontFamily: 'Coolvetica' }]}>
              Apunta la cámara hacia el código QR
            </Text>
          </BlurView>
          <TouchableOpacity style={styles.backButtonOverlay} onPress={handleGoBack}>
            <Text style={[styles.backButtonTextOverlay, { fontFamily: 'Coolvetica' }]}>
              Volver
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  overlay: {
    flex: 1,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayCenter: {
    flexDirection: 'row',
    height: width * 0.8,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scannerFrameContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  scannerFrame: {
    width: '95%',
    height: '95%',
    zIndex: 1,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Platform.select({ ios: 34, android: 24, default: 24 }),
  },
  instructionsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  instructionsText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#E2A9D9',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 24,
  },
  backButtonText: {
    color: '#1a1a1a',
    fontSize: 18,
  },
  backButtonOverlay: {
    backgroundColor: '#E2A9D9',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  backButtonTextOverlay: {
    color: '#1a1a1a',
    fontSize: 18,
  },
});

export default QRScannerScreen;

