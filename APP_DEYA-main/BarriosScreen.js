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

const BarriosScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params || {};
  
  const [barrios, setBarrios] = useState([]);
  const [selectedBarrios, setSelectedBarrios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBarrios();
  }, []);

  const loadBarrios = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('barrio')
        .select('*')
        .order('nombrebarrio', { ascending: true });

      if (error) {
        console.error('Error al cargar barrios:', error);
        Alert.alert('Error', 'No se pudieron cargar los barrios');
        return;
      }

      setBarrios(data || []);
    } catch (error) {
      console.error('Error al cargar barrios:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const toggleBarrio = (id) => {
    setSelectedBarrios(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      } else {
        Alert.alert('Límite alcanzado', 'Solo puedes seleccionar hasta 3 barrios');
        return prev;
      }
    });
  };

  const handleContinue = async () => {
    if (selectedBarrios.length === 0) {
      Alert.alert('Selección requerida', 'Por favor selecciona al menos un barrio');
      return;
    }

    try {
      setSaving(true);
      
      // Insertar las relaciones usuario-barrio
      const relations = selectedBarrios.map(idbarrio => ({
        iduser: user.iduser,
        idbarrio: idbarrio
      }));

      const { error } = await supabase
        .from('usuariosXbarrios')
        .insert(relations);

      if (error) {
        console.error('Error al guardar barrios:', error);
        Alert.alert('Error', 'No se pudieron guardar tus preferencias');
        return;
      }

      // Navegar a la pantalla de éxito
      navigation.navigate('PersonalizacionExitosaScreen');
    } catch (error) {
      console.error('Error al guardar barrios:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const renderBarrio = ({ item }) => {
    const isSelected = selectedBarrios.includes(item.idbarrio);
    
    return (
      <TouchableOpacity
        style={[
          styles.barrioButton,
          isSelected && styles.barrioButtonSelected
        ]}
        onPress={() => toggleBarrio(item.idbarrio)}
        activeOpacity={0.7}
      >
        <Text style={styles.barrioIcon}>
          {item.emoji || '📍'}
        </Text>
        <Text style={[
          styles.barrioText,
          isSelected && styles.barrioTextSelected
        ]}>
          {item.nombrebarrio || item.nombre}
        </Text>
        <Text style={[
          styles.barrioCheckmark,
          isSelected && styles.barrioCheckmarkSelected
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
          <Text style={styles.loadingText}>Cargando barrios...</Text>
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
              Elegí hasta tres barrios que frecuentás para encontrar eventos cerca tuyo.
            </Text>
          </View>

          <View style={styles.selectionInfo}>
            <Text style={styles.selectionCount}>
              {selectedBarrios.length}/3 seleccionados
            </Text>
          </View>

          <View style={styles.barriosList}>
            {barrios.map((item, index) => (
              <View key={item.idbarrio?.toString() || item.id?.toString()} style={[
                styles.barrioContainer,
                index % 2 === 0 ? styles.barrioContainerLeft : styles.barrioContainerRight
              ]}>
                {renderBarrio({ item })}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleContinue}
            disabled={selectedBarrios.length === 0 || saving}
            activeOpacity={0.8}
          >
            {selectedBarrios.length === 0 ? (
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
  barriosList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  barrioContainer: {
    width: '48%',
    marginBottom: 12,
  },
  barrioContainerLeft: {
    // No additional styling needed
  },
  barrioContainerRight: {
    // No additional styling needed
  },
  barrioButton: {
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
  barrioButtonSelected: {
    backgroundColor: '#fff',
    borderColor: '#FF5BA0',
    borderWidth: 1.5,
  },
  barrioIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  barrioText: {
    fontFamily: 'Coolvetica',
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  barrioTextSelected: {
    color: '#000',
    fontWeight: '600',
  },
  barrioCheckmark: {
    fontSize: 16,
    color: '#E5E7EB',
  },
  barrioCheckmarkSelected: {
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

export default BarriosScreen;
