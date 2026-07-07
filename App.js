import { useState } from "react";
import { View, StyleSheet, Platform, StatusBar, Text } from "react-native";
import Focus from "./src/features/Focus";
import Timer from "./src/components/Timer";

export default function App() {
    const [currentSubject, setCurrentSubject] = useState("");
    console.log(currentSubject);
    return (
        <View style={styles.container}>
            {!currentSubject ? <Focus addSubject={setCurrentSubject} /> : <Timer focusSubject={currentSubject} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
