import { View, Image, StyleSheet } from 'react-native';

const ICON_HEIGHT = 50;
const ICON_WIDTH = 50;

type Props = {
  index: number;
  size?: number;
};

export default function SpriteIcon({ index, size = 40 }: Props) {
  const scale = size / ICON_HEIGHT;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={require('../assets/icons-row.png')}
        style={{
          width: ICON_WIDTH * scale,
          height: ICON_HEIGHT * 8 * scale,
          position: 'absolute',
          top: -index * ICON_HEIGHT * scale,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
