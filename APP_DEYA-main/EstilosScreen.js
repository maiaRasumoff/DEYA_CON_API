import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import supabase from './lib/supabase';

const EstilosScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params || {};
  
  const [estilos, setEstilos] = useState([]);
  const [selectedEstilos, setSelectedEstilos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadEstilos();
  }, []);

  const loadEstilos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('estilos')
        .select('*')
        .order('nombreestilo', { ascending: true });

      if (error) {
        console.error('Error al cargar estilos:', error);
        Alert.alert('Error', 'No se pudieron cargar los estilos');
        return;
      }

      setEstilos(data || []);
    } catch (error) {
      console.error('Error al cargar estilos:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const toggleEstilo = (id) => {
    setSelectedEstilos(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      } else {
        Alert.alert('Límite alcanzado', 'Solo puedes seleccionar hasta 3 estilos');
        return prev;
      }
    });
  };

  const handleContinue = async () => {
    if (selectedEstilos.length === 0) {
      Alert.alert('Selección requerida', 'Por favor selecciona al menos un estilo');
      return;
    }

    try {
      setSaving(true);
      
      // Insertar las relaciones usuario-estilo
      const relations = selectedEstilos.map(idestilo => ({
        iduser: user.iduser,
        idestilo: idestilo
      }));

      const { error } = await supabase
        .from('usuarioXestilos')
        .insert(relations);

      if (error) {
        console.error('Error al guardar estilos:', error);
        Alert.alert('Error', 'No se pudieron guardar tus preferencias');
        return;
      }

      // Navegar a la siguiente pantalla
      navigation.navigate('BarriosScreen', { user });
    } catch (error) {
      console.error('Error al guardar estilos:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const renderEstilo = ({ item }) => {
    const isSelected = selectedEstilos.includes(item.idestilo);
    
    return (
      <TouchableOpacity
        style={[
          styles.estiloButton,
          isSelected && styles.estiloButtonSelected
        ]}
        onPress={() => toggleEstilo(item.idestilo)}
        activeOpacity={0.7}
      >
        <Text style={styles.estiloIcon}>
          {item.emoji || '🎨'}
        </Text>
        <Text style={[
          styles.estiloText,
          isSelected && styles.estiloTextSelected
        ]}>
          {item.nombreestilo || item.nombre}
        </Text>
        <Text style={[
          styles.estiloCheckmark,
          isSelected && styles.estiloCheckmarkSelected
        ]}>
          {isSelected ? '✓' : '+'}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <ImageBackground 
        source={require('./assets/fondoWelcome.png')} 
        style={styles.container}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#34A853" />
          <Text style={styles.loadingText}>Cargando estilos...</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('./assets/fondoWelcome.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Contanos de vos</Text>
            <Text style={styles.subtitle}>
              Elegí uno o tres estilos con los que te identifiques para personalizar tu experiencia.
            </Text>
          </View>

          <View style={styles.selectionInfo}>
            <Text style={styles.selectionCount}>
              {selectedEstilos.length}/3 seleccionados
            </Text>
          </View>

          <View style={styles.estilosList}>
            {estilos.map((item, index) => (
              <View key={item.idestilo?.toString() || item.id?.toString()} style={[
                styles.estiloContainer,
                index % 2 === 0 ? styles.estiloContainerLeft : styles.estiloContainerRight
              ]}>
                {renderEstilo({ item })}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleContinue}
            disabled={selectedEstilos.length === 0 || saving}
            activeOpacity={0.8}
          >
            {selectedEstilos.length === 0 ? (
              <View style={styles.continueButtonDisabled}>
                <Text style={styles.continueButtonTextDisabled}>Continuar</Text>
              </View>
            ) : (
              <LinearGradient
                colors={['#F76C05', '#FF5BA0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueButton}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.continueButtonText}>Continuar</Text>
                )}
              </LinearGradient>
            )}
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Coolvetica',
    fontSize: 16,
    color: '#fff',
    marginTop: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Neuton-Light',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Coolvetica',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  selectionInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  selectionCount: {
    fontFamily: 'Coolvetica',
    fontSize: 14,
    color: '#FF5BA0',
    backgroundColor: 'rgba(255, 91, 160, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF5BA0',
  },
  estilosList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  estiloContainer: {
    width: '48%',
    marginBottom: 12,
  },
  estiloContainerLeft: {
    // No additional styling needed
  },
  estiloContainerRight: {
    // No additional styling needed
  },
  estiloButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  estiloButtonSelected: {
    backgroundColor: '#fff',
    borderColor: '#FF5BA0',
    borderWidth: 1.5,
  },
  estiloIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  estiloText: {
    fontFamily: 'Coolvetica',
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  estiloTextSelected: {
    color: '#000',
    fontWeight: '600',
  },
  estiloCheckmark: {
    fontSize: 16,
    color: '#E5E7EB',
  },
  estiloCheckmarkSelected: {
    color: '#FF5BA0',
  },
  footer: {
    paddingVertical: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontFamily: 'Coolvetica',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  continueButtonTextDisabled: {
    fontFamily: 'Coolvetica',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
});

export default EstilosScreen;
