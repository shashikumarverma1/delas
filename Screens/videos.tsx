import React = require("react")
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native"
import { Video } from 'expo-av';
import { useVideoStore } from "../store/useVideos";
import { CustomHeader } from "../components/customHeader";
import VideoDownloadUI from "../components/videoDownloadUi";
import VideoItemCard from "../components/renderVideoCard";


export const Videos = ({ navigation }) => {
  const { videos, fetchVideos, downloadAndTrack } = useVideoStore();

  React.useEffect(() => {
    fetchVideos();
  }, []);
 const filteredVideos = videos.filter((video) => !video.isDownloaded);

  const onPressRight = React.useCallback(() => navigation.navigate("OfflineVideoScreen"), [navigation])
  // console.log("videos", OfflineVideos);
  return <View style={{ flex: 1, backgroundColor: '#fff' }}>

    <CustomHeader navigation={navigation} leftLeble={"videos"} rightLeble={"OfflineVideo"} onPressRight={onPressRight} />

    <FlatList
      data={videos}
      keyExtractor={(item , index) =>item.title + index.toString()}
      renderItem={({ item }) => {
        console.log("item", item);
        return (
        <VideoItemCard item={item} downloadAndTrack={downloadAndTrack}/>
        )
      }}
    />

  </View>


}