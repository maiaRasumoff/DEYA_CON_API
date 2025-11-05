import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, Alert, ActivityIndicator, Platform, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import supabase from './lib/supabase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await Clipboard.setStringAsync(email);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Email copiado', ToastAndroid.SHORT);
      } else {
        Alert.alert('Email copiado');
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo copiar al portapapeles.');
    }
  };

  const handleLogin = async () => {
    const emailTrimmed = email.trim().toLowerCase();
    const passwordTrimmed = password.trim();
    
    // Validaciones básicas
    if (!emailTrimmed) {
      Alert.alert('Error', 'Por favor ingresa tu email.');
      return;
    }
    
    if (!passwordTrimmed) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña.');
      return;
    }

    setLoading(true);
    try {
      // Consultar directamente en la tabla usuario
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('email', emailTrimmed)
        .eq('contrasenia', passwordTrimmed)
        .maybeSingle();

      if (error) {
        console.log('Error en consulta:', error);
        Alert.alert('Error', 'Error de conexión. Intenta nuevamente.');
        return;
      }

      if (!data) {
        Alert.alert('Error', 'Email o contraseña incorrectos.');
        return;
      }

      console.log('Usuario autenticado:', data);
      Alert.alert('Éxito', `Bienvenido ${data.nombreuser}!`);
      navigation.replace('Home');
      
    } catch (err) {
      console.log('Error en login:', err);
      Alert.alert('Error', 'Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('./assets/fondoInicio.png')} 
      style={styles.mainContainer}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Inicia Sesión en</Text>
        <Text style={styles.brandTitle}>Deyá</Text>
        <View style={styles.card}>
        <View style={styles.inputWithIconContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            accessible
            accessibilityLabel="Campo de email"
          />
          <TouchableOpacity
            style={styles.copyIcon}
            onPress={handleCopyEmail}
            accessible
            accessibilityLabel="Copiar email"
          >
            <Ionicons name="copy-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            accessible
            accessibilityLabel="Campo de contraseña"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
            accessible
            accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿No tenés una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Registrate</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Botón continuar"
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continuar</Text>}
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 40,
    color: '#333',
    fontFamily: 'serif',
    fontWeight: '600',
  },
  brandTitle: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
    fontFamily: 'serif',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#333',
    width: '70%',
    fontFamily: 'sans-serif',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  inputWithIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '70%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '70%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  copyIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
    fontFamily: 'sans-serif',
  },
  registerLink: {
    fontSize: 14,
    color: '#E5A5FF',
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },
  button: {
    backgroundColor: '#FEA6F0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    width: '70%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});

export default LoginScreen;
