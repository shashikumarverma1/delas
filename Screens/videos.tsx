import React = require("react")
import { View , FlatList , Text , Image, TouchableOpacity} from "react-native"
import { Video } from 'expo-av';
import { useVideoStore } from "../store/useVideos";
import { CustomHeader } from "../components/customHeader";
import { useOfflineVideoStore } from "../store/useOffLineVideos";

export const Videos=({navigation})=>{
     const { videos, fetchVideos } = useVideoStore();
  const {  downloadAndTrack , markDownloaded , videos : OfflineVideos } = useOfflineVideoStore();
  React.useEffect(() => {
    fetchVideos();
  }, []);

const onPressRight =React.useCallback(()=>navigation.navigate("OfflineVideoScreen") , [navigation])
  console.log("videos", OfflineVideos);
    return <View style={{ flex: 1, backgroundColor: '#fff' }}>
      
         <CustomHeader navigation={navigation} leftLeble={"videos"} rightLeble={"OfflineVideo"} onPressRight={onPressRight}/>
   
   <Video
        // ref={videoRef}
        source={{
          uri: 'file:///data/user/0/host.exp.exponent/files/For_Bigger_Blazes.mp4',
        }}
        useNativeControls
        resizeMode="cover"
        shouldPlay
        isLooping
        onLoadStart={() => console.log('Loading video...')}
        onLoad={() => console.log('Video loaded')}
        onError={(e) => console.log('Playback error:', e)}
        style={{width:"100%" , height:200 ,backgroundColor:'red' , borderRadius:10}}
      />
   
    <FlatList
  data={[]}
  keyExtractor={(index) => index.toString()}
  renderItem={({ item }) => {
    // console.log("item", item);
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
      {/* {!item.isDownloaded && (
        <Video
          source={{ uri: "file:///data/user/0/host.exp.exponent/files/For_Bigger_Blazes.mp4"
            // `file://${item.filePath}`
           }}
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