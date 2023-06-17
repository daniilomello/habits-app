import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from '../lib/axios';

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function New () {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState('');

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if(!title.trim() || weekDays.length === 0) {
        return Alert.alert('New habit', 'Enter the name of the habit and choose the frequency');
      }

      await api.post('/habits', {title, weekDays});
      setTitle('');
      setWeekDays([]);

      Alert.alert('New habit', 'Habit created successfully');
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Problem on create a new habit, try again later!');
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <BackButton />

        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Add new habit
        </Text>

        <Text className='mt-6 text-white font-semibold text-base'>
          What is your commitment?
        </Text>

        <TextInput
          className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
          placeholder='Practice english, sleep more, etc...'
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className='mt-6 mb-3 text-white font-semibold text-base'>
          What is the recurrence?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={index}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.5}
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
          onPress={handleCreateNewHabit}
        >
          <Feather name='check' size={20} color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'>
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
