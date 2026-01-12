import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useDocument } from "@/src/presentation/hooks/document/useDocument";
import Entypo from "@expo/vector-icons/Entypo";

export default function Index() {
  const { data, isLoading, error } = useDocument({
    depth: 2,
    locale: "en",
    trash: false,
    draft: false,
  });

  const [openDocId, setOpenDocId] = useState<number | null>(null);

  const toggleDoc = (id: number) => {
    setOpenDocId((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error instanceof Error) {
    return (
      <View style={styles.center}>
        <Text>No documents found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Pages privées</Text>

      {data?.map((doc) => {
        const isOpen = openDocId === doc.id;

        return (
          <View key={doc.id} style={styles.card}>
            <Pressable onPress={() => toggleDoc(doc.id)} style={styles.header}>
              <Entypo
                name="chevron-small-right"
                size={24}
                color="#828282"
                style={[styles.chevron, isOpen && styles.chevronOpen]}
              />

              <Text style={styles.title}>{doc.title || "Voici un titre"}</Text>
            </Pressable>

            {isOpen && (
              <Text style={styles.content}>
                {doc.content || "Voici un contenu"}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#191919",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#828282",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
  chevronOpen: {
    transform: [{ rotate: "90deg" }],
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    color: "#d1d1d1",
    marginTop: 10,
    marginLeft: 34,
    lineHeight: 20,
  },
});
