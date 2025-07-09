import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import VideoDownloadUI from './videoDownloadUi';


const VideoItemCard = ({ item, downloadAndTrack }) => {
  return (
    <View
      style={styles.container}
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
            style={styles.video}
          />
          <Text>{item?.title}</Text>
          <View
            style={styles.offlineContainer}
          >
            <Text>{'✅ Offline'}</Text>
          </View>
        </>
      ) : (
        <>
          <Image
            source={{ uri: item?.thumbnailUrl }}
            style={styles.img}
          />
          <Text>{item?.title}</Text>
          <VideoDownloadUI item={item} downloadAndTrack={downloadAndTrack} />
        </>
      )}
    </View>
  );
};

export default VideoItemCard;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  offlineContainer: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
  },
  video: {
    width: '100%',
    height: 200,

    borderRadius: 10,
    marginVertical: 10,
  },

})