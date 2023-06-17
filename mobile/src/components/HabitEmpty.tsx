import { useNavigation } from '@react-navigation/native';
import {Text} from 'react-native';

export function HabitEmpty() {
  const {navigate} = useNavigation();
  return (
    <Text className='text-zinc-400 text-base'>
      You are not tracking any habits yet

      <Text
        className='text-violet-400 text-base underline active:text-violet-500'
        onPress={() => navigate('new')}
      >
        {' start by creating one.'}
      </Text>
    </Text>
  );
}
