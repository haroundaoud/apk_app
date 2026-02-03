import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { Alert } from "react-native";
import { auth, db } from "../firebase/firebaseConfig";

export default function HomeScreen() {
  
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);


  // 📡 LOAD TASKS
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  // ➕ ADD TASK
  const addTask = async () => {
    if (!task.trim()) return;
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "tasks"), {
      title: task,
      completed: false,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    setTask("");
  };

  // ✅ TOGGLE TASK
  const toggleTask = async (id: string, completed: boolean) => {
    await updateDoc(doc(db, "tasks", id), {
      completed: !completed,
    });
  };

  // 🗑 DELETE TASK
const deleteTask = (id: string) => {
  Alert.alert(
    "Delete task",
    "Are you sure you want to delete this task?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "tasks", id));
          } catch (error) {
            console.log("Error deleting task:", error);
          }
        },
      },
    ],
    { cancelable: true }
  );
};
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 To-Do List</Text>

      

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View
      style={[
        styles.task,
        item.completed && styles.taskFinished,
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => toggleTask(item.id, item.completed)}
      >
        <Text
          style={[
            styles.taskText,
            item.completed && styles.taskTextFinished,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
      
    </View>
  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
 delete: {
  fontSize: 18,
  marginLeft: 10,
},
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  details: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 60,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  task: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskFinished: {
    backgroundColor: "#d4edda",
  },
  taskText: {
    fontSize: 16,
  },
  taskTextFinished: {
    textDecorationLine: "line-through",
    color: "#6c757d",
  },
});
