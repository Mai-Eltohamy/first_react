import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, deleteTask, updateTask } from '../redux/taskslice';

export default function TodoScreen() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ title: newTask, completed: false }));
      setNewTask('');
    }
  };

  const handleToggleComplete = (task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity onPress={() => handleToggleComplete(item)}>
              <Text style={[styles.taskText, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
  addButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, marginLeft: 10 },
  addText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  taskRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  taskText: { fontSize: 18 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { fontSize: 18, color: 'red' },
});
