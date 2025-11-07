import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { usePopups } from '../src/hooks';

const toNumber = (v) => {
  const n = typeof v === 'string' ? parseFloat(v) : v;
  return Number.isFinite(n) ? n : null;
};

const getCoords = (item) => {
  const lat = toNumber(item.lat ?? item.latitude ?? item.latitud);
  const lng = toNumber(item.lng ?? item.longitude ?? item.longitud ?? item.lon);
  if (lat == null || lng == null) return null;
  return { latitude: lat, longitude: lng };
};

export default function MapScreen({ navigation }) {
  const { popups, loading, error } = usePopups();
  const [location, setLocation] = useState(null);
  const [filter, setFilter] = useState('Todos'); // Todos | Favoritos | Barrio
  const [selectedBarrio, setSelectedBarrio] = useState(null);

  useEffect(() => {
    let subscription;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const current = await Location.getCurrentPositionAsync({});
      setLocation(current?.coords || null);
      subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      }, (pos) => setLocation(pos.coords));
    })();
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  const markers = useMemo(() => {
    let list = popups.filter((p) => getCoords(p));
    if (filter === 'Favoritos') list = list.filter((p) => p.isFavorite);
    if (filter === 'Barrio' && selectedBarrio)
      list = list.filter((p) => (p.barrio || p.barrio_nombre) === selectedBarrio);
    return list;
  }, [popups, filter, selectedBarrio]);

  const initialRegion = useMemo(() => {
    if (location) {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }
    // Buenos Aires fallback
    return { latitude: -34.6037, longitude: -58.3816, latitudeDelta: 0.1, longitudeDelta: 0.1 };
  }, [location]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation
        followsUserLocation
      >
        {markers.map((m) => {
          const coords = getCoords(m);
          if (!coords) return null;
          const title = m.nombre || m.name || 'Popup';
          const description = m.ubicacion || m.address || '';
          return (
            <Marker key={m.idpopup || m.id} coordinate={coords} title={title} description={description}>
              <Callout onPress={() => navigation.navigate('PopupDetailScreen', { popupId: m.idpopup || m.id })}>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{title}</Text>
                  {!!description && <Text style={styles.calloutDesc}>{description}</Text>}
                  <View style={styles.calloutButton}><Text style={styles.calloutButtonText}>Ver más</Text></View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.filterBar}>
        {['Todos', 'Favoritos', 'Barrio'].map((f) => (
          <TouchableOpacity key={f} style={[styles.filterChip, filter === f && styles.filterChipActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#34A853" />
        </View>
      )}
      {error && (
        <View style={styles.errorToast}><Text style={styles.errorText}>Error: {error}</Text></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterChip: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 6,
  },
  filterChipActive: { backgroundColor: '#FF5BA0' },
  filterText: { color: '#555', fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorToast: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 10,
    padding: 10,
  },
  errorText: { color: '#b91c1c', textAlign: 'center' },
  callout: { maxWidth: 220 },
  calloutTitle: { fontWeight: '700', marginBottom: 4 },
  calloutDesc: { color: '#555', marginBottom: 8 },
  calloutButton: { backgroundColor: '#34A853', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  calloutButtonText: { color: '#fff', fontWeight: '700' },
});


