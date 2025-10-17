import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import supabase from './lib/supabase';
import { SafeAreaView } from 'react-native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const emailTrimmed = email.trim().toLowerCase();
    const nombreTrimmed = nombre.trim();
    const passwordTrimmed = password.trim();

    // Validaciones básicas
    if (!emailTrimmed) {
      Alert.alert('Error', 'Por favor ingresa tu email.');
      return;
    }

    if (!nombreTrimmed) {
      Alert.alert('Error', 'Por favor ingresa tu nombre.');
      return;
    }

    if (!passwordTrimmed) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña.');
      return;
    }

    if (passwordTrimmed.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      // Verificar si el email ya existe
      const { data: existingUser, error: checkError } = await supabase
        .from('usuario')
        .select('email')
        .eq('email', emailTrimmed)
        .maybeSingle();

      if (checkError) {
        console.log('Error verificando email:', checkError);
        Alert.alert('Error', 'Error de conexión. Intenta nuevamente.');
        return;
      }

      if (existingUser) {
        Alert.alert('Error', 'Este email ya está registrado.');
        return;
      }

      // Insertar nuevo usuario en la tabla usuario
      const { data, error } = await supabase
        .from('usuario')
        .insert([{
          nombreuser: nombreTrimmed,
          email: emailTrimmed,
          contrasenia: passwordTrimmed
        }])
        .select();

      if (error) {
        console.log('Error insertando usuario:', error);
        Alert.alert('Error', 'No se pudo registrar el usuario. Intenta nuevamente.');
        return;
      }

      console.log('Usuario registrado:', data);
      
      // Obtener el usuario recién registrado
      const newUser = data[0];
      
      // Navegar directamente a la personalización
      navigation.replace('EstilosScreen', { user: newUser });
      
    } catch (err) {
      console.log('Error en registro:', err);
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
      <SafeAreaView style={styles.safeArea}>
        {/* Icono volver */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>

        {/* Contenedor tipo tarjeta */}
        <View style={styles.container}>
          <Text style={styles.title}>Crea tu cuenta en</Text>
          <Text style={styles.brandTitle}>Deyá</Text>
          <View style={styles.card}>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#aaa"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
              </TouchableOpacity>
            </View>

            {/* Separador */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>registrate con</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Íconos sociales */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('./assets/X_Logo.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('./assets/Google_Logo.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('./assets/Facebook_Logo.png')} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>

            {/* Botón registrarse */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>Registrarse</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#FFFEF7',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 16,
  },
  logo: {
    width: 84,
    height: 60,
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
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    marginHorizontal: 12,
    color: '#666',
    fontSize: 14,
    fontFamily: 'sans-serif',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  registerButton: {
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
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});

export default RegisterScreen;
