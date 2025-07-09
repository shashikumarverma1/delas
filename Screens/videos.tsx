import React = require("react")
import { View, FlatList, StyleSheet } from "react-native"
import { useVideoStore } from "../store/useVideos";
import { CustomHeader } from "../components/customHeader";
import VideoItemCard from "../components/renderVideoCard";


export const Videos = ({ navigation }) => {
  const { videos, fetchVideos, downloadAndTrack } = useVideoStore();

  React.useEffect(() => {
    fetchVideos();
  }, []);
 const filteredVideos = videos.filter((video) => video.isDownloaded);
  const onPressRight = React.useCallback(() => navigation.navigate("OfflineVideoScreen"), [navigation])

  return <View style={{ flex: 1, backgroundColor: '#fff' }}>

    <CustomHeader navigation={navigation} leftLeble={"videos"} rightLeble={"✅ Offline"} onPressRight={onPressRight} onPessBack={undefined} />

    <FlatList
      data={videos}
      keyExtractor={(item , index) =>item?.id}
      renderItem={({ item }) => {
     
        return (
        <VideoItemCard item={item} downloadAndTrack={downloadAndTrack}/>
        )
      }}
    />

  </View>


}

const styles = StyleSheet.create({

})