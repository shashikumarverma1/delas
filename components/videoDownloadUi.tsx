import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const VideoDownloadUI = ({ item, downloadAndTrack }) => {
  const renderAction = useMemo(() => {
    return item?.progress || item?.isDownloaded ? (
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
        <Text>
          {item?.isDownloaded ? '✅ Offline' : `${item?.progress ?? 0}%`}
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => {
          console.log('item', item);
          downloadAndTrack(item);
        }}
        style={{
          backgroundColor: '#007BFF',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#ffffff', textAlign: 'center' }}>Download</Text>
      </TouchableOpacity>
    );
  }, [item?.progress, item?.isDownloaded]);

  return <>{renderAction}</>;
};

export default VideoDownloadUI;
