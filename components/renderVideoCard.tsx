import React from 'react';
import { View, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import VideoDownloadUI from './videoDownloadUi';


const VideoItemCard = ({ item, downloadAndTrack }) => {
  return (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 20,
      }}
    >
      {item?.isDownloaded ? (
        <>
          <Video
            source={{ uri: item?.filePath }}
            useNativeControls
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            onLoadStart={() => console.log('Loading video...')}
            onLoad={() => console.log('Video loaded')}
            onError={(e) => console.log('Playback error:', e)}
            style={{
              width: '100%',
              height: 200,
              backgroundColor: 'red',
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <Text>{item?.title}</Text>
          <View
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{'✅ Offline'}</Text>
          </View>
        </>
      ) : (
        <>
          <Image
            source={{ uri: item?.thumbnailUrl }}
            style={{ width: '100%', height: 200, borderRadius: 10 }}
          />
          <Text>{item?.title}</Text>
          <VideoDownloadUI item={item} downloadAndTrack={downloadAndTrack} />
        </>
      )}
    </View>
  );
};

export default VideoItemCard;
