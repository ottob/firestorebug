import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import { initializeApp } from 'firebase/app';
import { doc, getDoc, initializeFirestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "vitalt-dev",
};

const firebaseApp = initializeApp(firebaseConfig)

// This doesnt work.
const firestore = getFirestore(firebaseApp)

// This works.
// const db = initializeFirestore(firebaseApp, {
//   useFetchStreams: false,
// } as any)

// This also works.
// const firestore = initializeFirestore(firebaseApp, {
//   experimentalForceLongPolling: true,
// })

export default function App() {
  const check = useCallback(async () => {
    try {
      const docRef = doc(firestore, "app_allowedversions", "ios");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        Alert.alert('It worked')
        // console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.error(e)
    }
  }, [firestore])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button onPress={check}  title="Go" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
