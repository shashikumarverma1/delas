import React, { useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useOfflineVideoStore } from '../store/useOffLineVideos';
import { CustomHeader } from '../components/customHeader';


const OfflineVideoScreen = ({navigation}) => {
  const { videos, downloadAndTrack } = useOfflineVideoStore();
// console.log("videos", videos);
const onPessBack = React.useCallback(() => navigation.goBack(), [navigation]);
  return (
  <View>
<CustomHeader navigation={navigation} leftLeble={"<- Goback"} rightLeble={undefined} onPessBack={onPessBack} onPressRight={undefined}/>
      <FlatList
      data={videos}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 16, padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>

          {item.isDownloaded ? (
            <Text style={{ color: 'green' }}>✅ Downloaded</Text>
          ) : (
            <>
              <Text style={{ color: 'orange' }}>
                Downloading: {item.progress ?? 0}%
              </Text>
              <Button title="Download" onPress={() => downloadAndTrack(item)} />
            </>
          )}
        </View>
      )}
    />
  </View>
  );
};

export default OfflineVideoScreen;
