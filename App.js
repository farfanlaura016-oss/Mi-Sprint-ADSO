import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';

const CATEGORIAS = ['Análisis', 'Diseño', 'Código'];

export default function App() {
  // Datos de identidad
  const nombreAprendiz = "Laura Sofya Farfán Muñoz";
  const ficha = "3409609";

  // Estados
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [tareas, setTareas] = useState([]);

  // Agregar tarea con validación
  const agregarTarea = () => {
    if (!titulo.trim()) {
      Alert.alert("Advertencia", "Por favor ingresa un título válido para la tarea.");
      return;
    }

    const nuevaTarea = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      categoria: categoria,
      completada: false
    };

    setTareas([...tareas, nuevaTarea]);
    setTitulo('');
  };

  // Alternar estado Pendiente/Completada
  const alternarEstadoTarea = (id) => {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: !tarea.completada };
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
  };

  // Eliminar tarea
  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasFiltradas);
  };

  // Indicadores de avance
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = total - completadas;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F7" />

      {/* Encabezado Identidad */}
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>Mi Sprint ADSO 🌸</Text>
        <Text style={styles.aprendizText}>{nombreAprendiz}</Text>
        <Text style={styles.fichaText}>Ficha: {ficha}</Text>
      </View>

      {/* Resumen de Avance */}
      <View style={styles.summaryContainer}>
        <View style={styles.cardStat}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.cardStat, styles.statPendienteCard]}>
          <Text style={[styles.statNumber, { color: '#D97706' }]}>{pendientes}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={[styles.cardStat, styles.statCompletadaCard]}>
          <Text style={[styles.statNumber, { color: '#DB2777' }]}>{completadas}</Text>
          <Text style={styles.statLabel}>Completadas</Text>
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="¿Qué tarea vas a realizar?"
          placeholderTextColor="#C4B5FD"
          value={titulo}
          onChangeText={setTitulo}
        />

        <View style={styles.categoriesContainer}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                categoria === cat && styles.categoryChipSelected
              ]}
              onPress={() => setCategoria(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  categoria === cat && styles.categoryTextSelected
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={agregarTarea}>
          <Text style={styles.addButtonText}>✨ Agregar Tarea</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tareas */}
      <View style={styles.listContainer}>
        {tareas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🎀 Todavía no hay tareas registradas en este sprint.</Text>
          </View>
        ) : (
          <FlatList
            data={tareas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.taskItem,
                  item.completada && styles.taskItemCompleted
                ]}
              >
                <View style={styles.taskInfo}>
                  <Text
                    style={[
                      styles.taskTitle,
                      item.completada && styles.taskTitleCompleted
                    ]}
                  >
                    {item.titulo}
                  </Text>
                  <View style={styles.taskBadges}>
                    <Text style={styles.badgeCategory}>{item.categoria}</Text>
                    <Text
                      style={[
                        styles.badgeStatus,
                        item.completada ? styles.badgeSuccess : styles.badgeWarning
                      ]}
                    >
                      {item.completada ? 'Completada' : 'Pendiente'}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      item.completada ? styles.btnUndo : styles.btnComplete
                    ]}
                    onPress={() => alternarEstadoTarea(item.id)}
                  >
                    <Text style={styles.actionBtnText}>
                      {item.completada ? 'Deshacer' : 'Listo'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.btnDelete]}
                    onPress={() => eliminarTarea(item.id)}
                  >
                    <Text style={styles.actionBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB', // Fondo rosa ultra sutil y limpio
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerContainer: {
    backgroundColor: '#FFE4E6', // Rosa pastel muy suave
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  appTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#9F1239', // Texto rosado oscuro elegante
  },
  aprendizText: {
    fontSize: 13,
    color: '#BE123C',
    marginTop: 4,
    fontWeight: '500',
  },
  fichaText: {
    fontSize: 12,
    color: '#E11D48',
    marginTop: 2,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardStat: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#FDA4AF',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  statPendienteCard: {
    borderBottomWidth: 3,
    borderBottomColor: '#FBBF24',
  },
  statCompletadaCard: {
    borderBottomWidth: 3,
    borderBottomColor: '#FDA4AF',
  },
  statNumber: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#881337',
  },
  statLabel: {
    fontSize: 11,
    color: '#9F1239',
    marginTop: 2,
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#FDA4AF',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FECDD3',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#FFF1F2',
    color: '#881337',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryChip: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECDD3',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
  },
  categoryChipSelected: {
    backgroundColor: '#FDA4AF',
    borderColor: '#F43F5E',
  },
  categoryText: {
    fontSize: 12,
    color: '#9F1239',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FB7185',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FB7185',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  emptyText: {
    fontSize: 13,
    color: '#9F1239',
    textAlign: 'center',
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  taskItemCompleted: {
    backgroundColor: '#FFF1F2',
    opacity: 0.75,
  },
  taskInfo: {
    flex: 1,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#881337',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#FDA4AF',
  },
  taskBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeCategory: {
    fontSize: 10,
    backgroundColor: '#FFF1F2',
    color: '#9F1239',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
    overflow: 'hidden',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  badgeStatus: {
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    fontWeight: '500',
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
    color: '#B45309',
  },
  badgeSuccess: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnComplete: {
    backgroundColor: '#34D399',
  },
  btnUndo: {
    backgroundColor: '#CBD5E1',
  },
  btnDelete: {
    backgroundColor: '#F87171',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});