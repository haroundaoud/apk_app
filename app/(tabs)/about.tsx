import * as Device from 'expo-device';
import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Device Details</Text>

      <Text style={styles.text}>Brand: {Device.brand}</Text>
      <Text style={styles.text}>Manufacturer: {Device.manufacturer}</Text>
      <Text style={styles.text}>Model Name: {Device.modelName}</Text>
      <Text style={styles.text}>Device Name: {Device.deviceName}</Text>
      <Text style={styles.text}>OS Name: {Device.osName}</Text>
      <Text style={styles.text}>OS Version: {Device.osVersion}</Text>
      <Text style={styles.text}>Platform API Level: {Device.platformApiLevel}</Text>
      <Text style={styles.text}>
        Device Type: {Device.deviceType === 1 ? 'Phone' : 'Tablet / Other'}
      </Text>
      <Text style={styles.text}>
        Is Device: {Device.isDevice ? 'Yes' : 'No (Emulator)'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    color: '#333',
    fontSize: 16,
    marginBottom: 8,
  },
});
