import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePopups } from './src/hooks';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getValueOrPlaceholder, getImageOrPlaceholder } from './src/utils/dataHelpers';

// Simula datos de usuario
const useUserData = () => ({ name: 'User', location: 'Parque Patricios, Bs. As.' });

const LocationHeader = ({ name, location, onMenu }) => (
  <View style={styles.headerRow}>
    <View style={styles.profilePic}>
      <Ionicons name="person" size={28} color="#888" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.helloText}>Hola, {name}</Text>
      <View style={styles.locationRow}>
        <Ionicons name="location-sharp" size={16} color="#34A853" style={{ marginRight: 2 }} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
    </View>
    <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
    <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
      <Feather name="menu" size={28} color="#222" />
    </TouchableOpacity>
  </View>
);

const SearchBar = ({ value, onChange, onFilter }) => (
  <View style={styles.searchBarContainer}>
    <Ionicons name="search" size={22} color="#BDBDBD" style={{ marginLeft: 12 }} />
    <TextInput
      style={styles.searchInput}
      placeholder="Buscar"
      placeholderTextColor="#BDBDBD"
      value={value}
      onChangeText={onChange}
      autoCapitalize="none"
      accessible
      accessibilityLabel="Buscar"
    />
    <TouchableOpacity style={styles.filterButton} onPress={onFilter} accessibilityLabel="Filtrar">
      <Ionicons name="options" size={22} color="#fff" />
    </TouchableOpacity>
  </View>
);

const FilterChips = ({ chips, selected, onSelect }) => (
  <FlatList
    data={chips}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item}
    contentContainerStyle={{ paddingHorizontal: 8 }}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[styles.chip, selected === item && styles.chipActive]}
        onPress={() => onSelect(item)}
      >
        <Text style={[styles.chipText, selected === item && styles.chipTextActive]}>{item}</Text>
      </TouchableOpacity>
    )}
    style={{ marginVertical: 10, minHeight: 40 }}
  />
);

const PopupCard = ({ popup, onPress, onFavorite }) => (
  <View style={styles.popupCard}>
    <Image 
      source={{ uri: getImageOrPlaceholder(popup.imagen, 'https://via.placeholder.com/200x100?text=Sin+Imagen') }} 
      style={styles.popupImage} 
    />
    <Text style={styles.popupName}>{getValueOrPlaceholder(popup.nombre, 'Sin nombre')}</Text>
    <Text style={styles.popupAddress}>{getValueOrPlaceholder(popup.ubicacion, 'Ubicación no disponible')}</Text>
    <View style={styles.popupCardFooter}>
      <TouchableOpacity style={styles.verMasButton} onPress={onPress}>
        <Text style={styles.verMasText}>Ver más</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onFavorite} accessibilityLabel="Favorito">
        <Ionicons name={popup.isFavorite ? 'heart' : 'heart-outline'} size={24} color="#FF5BA0" />
      </TouchableOpacity>
    </View>
  </View>
 );

const TabBar = ({ current, onTab }) => (
  <View style={styles.tabBar}>
    <TouchableOpacity style={styles.tabItem} onPress={() => onTab('Home')}>
      <Ionicons name="home" size={26} color={current === 'Home' ? '#34A853' : '#BDBDBD'} />
      <Text style={[styles.tabText, current === 'Home' && { color: '#34A853' }]}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem} onPress={() => onTab('Explorar')}>
      <Ionicons name="search" size={24} color={current === 'Explorar' ? '#34A853' : '#BDBDBD'} />
      <Text style={[styles.tabText, current === 'Explorar' && { color: '#34A853' }]}>Explorar</Text>
    </TouchableOpacity>
    <View style={styles.qrWrapper}>
      <TouchableOpacity style={styles.qrButton} onPress={() => onTab('QR')} accessibilityLabel="QR Scanner">
        <Ionicons name="qr-code-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.tabItem} onPress={() => onTab('Favoritos')}>
      <Ionicons name="heart-outline" size={24} color={current === 'Favoritos' ? '#34A853' : '#BDBDBD'} />
      <Text style={[styles.tabText, current === 'Favoritos' && { color: '#34A853' }]}>Favoritos</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem} onPress={() => onTab('Perfil')}>
      <Ionicons name="person-outline" size={24} color={current === 'Perfil' ? '#34A853' : '#BDBDBD'} />
      <Text style={[styles.tabText, current === 'Perfil' && { color: '#34A853' }]}>Perfil</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { name, location } = useUserData();
  const [search, setSearch] = useState('');
  const [barrios, setBarrios] = useState(['Todos los barrios']); // Chips estáticos por ahora
  const [selectedBarrio, setSelectedBarrio] = useState('Todos los barrios');
  
  // Usar el hook personalizado para obtener popups
  const { popups, loading, error, refetch } = usePopups();

  // Por ahora usamos barrios estáticos, pero puedes implementar la lógica de barrios dinámicos después
  useEffect(() => {
    // Aquí puedes implementar la lógica para obtener barrios dinámicos si es necesario
    // Por ahora mantenemos los barrios estáticos
  }, []);

  // La función fetchPopups ahora se maneja automáticamente con el hook usePopups
  // El filtrado por barrio se puede implementar después cuando tengas la lógica de barrios dinámicos

  // El hook usePopups se ejecuta automáticamente al montar el componente
  // No necesitamos un useEffect adicional

  const handleFavorite = async (popup) => {
    // Por ahora solo actualizamos el estado local
    // Aquí puedes implementar la lógica para actualizar favoritos en tu API
    const updated = !popup.isFavorite;
    // TODO: Implementar actualización de favoritos en tu API
    console.log('Toggle favorite for popup:', popup.idpopup, 'to:', updated);
  };

  // DEBUG LOGS para depuración en tiempo real
  console.log('barrios', barrios);
  console.log('selectedBarrio', selectedBarrio);
  console.log('popups', popups);
  console.log('loading', loading);
  console.log('error', error);

  // Chips de barrios: fallback si no hay datos
  const chipsToShow = barrios.length > 1 ? barrios : ['Todos los barrios', 'Flores', 'Palermo', 'Recoleta'];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
          <LocationHeader name={name} location={location} onMenu={() => {}} />
          <SearchBar value={search} onChange={setSearch} onFilter={() => {}} />
          <FilterChips chips={chipsToShow} selected={selectedBarrio} onSelect={setSelectedBarrio} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recomendado para vos</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.sectionLink}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>😢 {error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          ) : loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Cargando popups...</Text>
            </View>
          ) : popups.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay pop-ups disponibles 😢</Text>
              <Text style={styles.emptySubtext}>Intenta más tarde o verifica tu conexión</Text>
            </View>
          ) : (
            <FlatList
              data={popups}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.idpopup?.toString() || item.id?.toString()}
              renderItem={({ item }) => (
                <PopupCard
                  popup={item}
                  onPress={() => navigation.navigate('PopupDetailScreen', { popupId: item.idpopup || item.id })}
                  onFavorite={() => handleFavorite(item)}
                />
              )}
              contentContainerStyle={{ paddingHorizontal: 8 }}
              style={{ minHeight: 260 }}
            />
          )}
        </ScrollView>
        <TabBar current="Home" onTab={(tab) => {
          if (tab === 'Explorar') {
            navigation.navigate('Explorar');
          }
        }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  helloText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    color: '#34A853',
    fontSize: 13,
    fontWeight: '500',
  },
  logo: {
    width: 54,
    height: 32,
    marginHorizontal: 8,
  },
  menuButton: {
    padding: 6,
    marginLeft: 2,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 2,
    height: 44,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#222',
    backgroundColor: 'transparent',
  },
  filterButton: {
    backgroundColor: '#34A853',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  chip: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  chipActive: {
    backgroundColor: '#FF5BA0',
  },
  chipText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  sectionLink: {
    color: '#34A853',
    fontSize: 14,
    fontWeight: '600',
  },
  popupCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    padding: 10,
  },
  popupImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F1F5F9',
  },
  popupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  popupAddress: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  popupCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verMasButton: {
    backgroundColor: '#34A853',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  verMasText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 10,
  },
  qrWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  qrButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#34A853',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 2,
    fontWeight: '500',
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF5BA0',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#34A853',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#34A853',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#FF5BA0',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default HomeScreen; 
