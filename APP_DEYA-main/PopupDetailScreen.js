import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { usePopupDetail } from './src/hooks';
import { getValueOrPlaceholder, getImageOrPlaceholder, formatPrice } from './src/utils/dataHelpers';

const PopupDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { popupId } = route.params;

  const { popupDetail, loading, error, refetch } = usePopupDetail(popupId);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFavorite = () => {
    // TODO: Implementar lógica de favoritos
    console.log('Toggle favorite for popup:', popupId);
  };

  const renderInfoRow = (icon, label, value, isImportant = false) => {
    if (!value) return null;
    
    return (
      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Ionicons name={icon} size={20} color="#34A853" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={[styles.infoValue, isImportant && styles.infoValueImportant]}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalle del Popup</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#34A853" />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalle del Popup</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="sad-outline" size={64} color="#FF5BA0" />
          <Text style={styles.errorText}>😢 {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!popupDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalle del Popup</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontró información del popup</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Popup</Text>
        <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
          <Ionicons 
            name={popupDetail.isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color="#FF5BA0" 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Imagen principal */}
        <Image
          source={{ 
            uri: getImageOrPlaceholder(popupDetail.imagen, 'https://via.placeholder.com/400x250?text=Sin+Imagen') 
          }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        {/* Información principal */}
        <View style={styles.mainInfo}>
          <Text style={styles.popupName}>{getValueOrPlaceholder(popupDetail.nombre, 'Sin nombre')}</Text>
          <Text style={styles.popupDescription}>
            {getValueOrPlaceholder(popupDetail.descripcion, 'Sin descripción disponible')}
          </Text>
        </View>

        {/* Información detallada */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Información del Popup</Text>
          
          {renderInfoRow('location', 'Ubicación', popupDetail.ubicacion, true)}
          {renderInfoRow('business', 'Barrio', popupDetail.nombreBarrio)}
          {renderInfoRow('time', 'Horarios', popupDetail.horarios)}
          {renderInfoRow('call', 'Teléfono', popupDetail.telefono)}
          {renderInfoRow('mail', 'Email', popupDetail.email)}
          {renderInfoRow('globe', 'Sitio web', popupDetail.sitioWeb)}
          
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="attach-money" size={20} color="#34A853" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Precio</Text>
              <Text style={styles.infoValue}>{formatPrice(popupDetail.precio)}</Text>
            </View>
          </View>
        </View>

        {/* Información del usuario si existe */}
        {popupDetail.usuario && (
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Información del Usuario</Text>
            {renderInfoRow('person', 'Nombre', popupDetail.usuario.nombre)}
            {renderInfoRow('mail', 'Email', popupDetail.usuario.email)}
            {renderInfoRow('call', 'Teléfono', popupDetail.usuario.telefono)}
          </View>
        )}

        {/* Información adicional */}
        {popupDetail.informacionAdicional && (
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Información Adicional</Text>
            <Text style={styles.additionalInfo}>
              {popupDetail.informacionAdicional}
            </Text>
          </View>
        )}

        {/* Botón de acción */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contactar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  favoriteButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  mainImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#F1F5F9',
  },
  mainInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  popupName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  popupDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    width: 24,
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
  },
  infoValueImportant: {
    fontWeight: '600',
    color: '#34A853',
  },
  additionalInfo: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  actionSection: {
    padding: 20,
    paddingBottom: 40,
  },
  contactButton: {
    backgroundColor: '#34A853',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF5BA0',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#34A853',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PopupDetailScreen; 