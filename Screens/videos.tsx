import React = require("react")
import { View , FlatList , Text , Image, TouchableOpacity} from "react-native"
import Video from 'react-native-video';
import { useOfflineVideoStore } from "../store/useVideos";
import { CustomHeader } from "../components/customHeader";

export const Videos=({navigation})=>{
     const { videos, fetchVideos } = useOfflineVideoStore();
  const {  downloadAndTrack , markDownloaded } = useOfflineVideoStore();
  React.useEffect(() => {
    fetchVideos();
  }, []);


  console.log("videos", videos);
    return <View style={{ flex: 1, backgroundColor: '#fff' }}>
         <CustomHeader navigation={navigation} leftLeble={"videos"} rightLeble={""} onPessBack={undefined}/>
    <FlatList
  data={videos}
  keyExtractor={(item) => item.title}
  renderItem={({ item }) => {
    console.log("item", item);
    return (
         <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' , paddingHorizontal:20 }}>
      
     
      <Image
        source={{ uri: item?.thumbnailUrl }} width={200} height={200}
        style={{ width: '100%', height: 200, borderRadius: 10 }}/>
        <Text>{item?.title}</Text> 
        <TouchableOpacity onPress={() => {downloadAndTrack(item) }} style={{ backgroundColor: '#007BFF', padding: 10, 
        borderRadius: 5, marginTop: 10 , flexDirection:"row" , justifyContent:"center" , alignItems:"center"

        }}>
          <Text style={{color:"#ffffff" , textAlign:"center"}}>Download</Text>
        </TouchableOpacity>
      {/* <Text>{item.isDownloaded ? '✅ Offline' : `⬇ ${item.progress}%`}</Text> */}
      {/* {item.isDownloaded && (
        <Video
          source={{ uri: `file://${item.filePath}` }}
          style={{ width: '100%', height: 200 }}
          controls
        />
      )} */}
    </View>
    )
  }}
/>
    </View>
   

}