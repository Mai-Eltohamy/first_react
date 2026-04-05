import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { apiService } from '../services/gitServices';
import CustomButton from '../components/custombutton';
export default function UserProfileScreen() {
  const username = 'octocat'; 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getUserByUsername(username);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#007aff" /></View>;
  if (error) return <View style={styles.center}><Text style={styles.errorText}>{error}</Text><CustomButton title="Retry" onPress={fetchUserData} /></View>;
  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{user.name || user.login}</Text>
      <Text style={styles.login}>@{user.login}</Text>
      <Text style={styles.value}>Location: {user.location || 'N/A'}</Text>
      <Text style={styles.value}>Company: {user.company || 'N/A'}</Text>
      <Text style={styles.value}>Followers: {user.followers}</Text>
      <Text style={styles.value}>Following: {user.following}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginVertical: 20, borderWidth: 2, borderColor: '#007aff' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  login: { fontSize: 16, color: '#666', marginBottom: 20 },
  value: { fontSize: 16, color: '#333', marginBottom: 10 },
  errorText: { color: '#dc3545', fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
;