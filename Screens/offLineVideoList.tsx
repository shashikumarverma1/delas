import React, {  } from 'react';
import { View,  FlatList } from 'react-native';
import { CustomHeader } from '../components/customHeader';
import { useVideoStore } from '../store/useVideos';
import VideoItemCard from '../components/renderVideoCard';

const OfflineVideoScreen = ({ navigation }) => {
  const {  downloadAndTrack , getDownloadedVideos } = useVideoStore();

  const onPessBack = React.useCallback(() => navigation.goBack(), [navigation]);
  return (
    <View>
      <CustomHeader navigation={navigation} leftLeble={"<- Goback"} rightLeble={undefined} onPessBack={onPessBack} onPressRight={undefined} />
      <FlatList
        data={getDownloadedVideos()}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
     <>
         <VideoItemCard item={item} downloadAndTrack={downloadAndTrack}/>
     </>
        )}
      />
    </View>
  );
};

export default OfflineVideoScreen;
