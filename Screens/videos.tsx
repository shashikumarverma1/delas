import React = require("react")
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native"
import { useVideoStore } from "../store/useVideos";
import { CustomHeader } from "../components/customHeader";
import VideoItemCard from "../components/renderVideoCard";


export const Videos = ({ navigation }) => {
  const { videos, fetchVideos, downloadAndTrack } = useVideoStore();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchVideos();
    setLoading(false)
  }, []);

  const onPressRight = React.useCallback(() => navigation.navigate("OfflineVideoScreen"), [navigation])
  if (loading) {
    return <View style={styles.loading}>
      <ActivityIndicator
        size="large" // or "large"
        color="#FF0000" // any color
        style={{ marginVertical: 10 }}
      />
    </View>
  }
  return <View style={{ flex: 1, backgroundColor: '#fff' }}>

    <CustomHeader navigation={navigation} leftLeble={"videos"} rightLeble={"✅ Offline"} onPressRight={onPressRight} onPessBack={undefined} />

    <FlatList
      ListEmptyComponent={
      !loading &&  <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray', fontSize: 16 }}>
          No video found.
        </Text>}
      data={videos}
      keyExtractor={(item, index) => item?.id}
      renderItem={({ item }) => {

        return (
          <VideoItemCard item={item} downloadAndTrack={downloadAndTrack} />
        )
      }}
    />

  </View>


}

const styles = StyleSheet.create({
loading:{ flex: 1, justifyContent: 'center', alignItems: 'center' }
})