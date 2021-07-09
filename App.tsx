import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Provider as PaperProvider, List, Avatar } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Entypo } from '@expo/vector-icons'

const dataLists = [
  {
    image: 'https://musicstation.kapook.com/files_music2008/picture/4/23516.jpg',
    name: 'Emy Fahaa',
    position: 'Vice President'
  },
  {
    image: 'https://static.thairath.co.th/media/dFQROr7oWzulq5FZUIEv324CpdpRJcThIMQ6UhioUsWOTk0LwYzar1aAtjoSHj9Eeh5.jpg',
    name: 'Crist Jackson',
    position: 'Vice President'
  },
  {
    image: 'https://cms.dmpcdn.com/musicarticle/2019/12/04/83ea9330-164e-11ea-a282-13af15ea56d3_original.jpg',
    name: 'Amanda Martin',
    position: 'CEO'
  },
  {
    image: 'https://www.matichon.co.th/wp-content/uploads/2021/04/%E0%B9%88%E0%B9%88%E0%B9%88%E0%B8%AD.png',
    name: 'Cristy Tomas',
    position: 'Lead Developer'
  },
  {
    image: 'https://www.siamzone.com/music/news/2015/07381.jpg',
    name: 'Melista Jones',
    position: 'CTO'
  },
]

const Stack = createStackNavigator()

const StackNavigator = () => {
  return <Stack.Navigator
    initialRouteName='ListScreen'
    headerMode='none'
  >
    <Stack.Screen
      name='ListScreen'
      component={ListScreen}
    />
    <Stack.Screen
      name='DetailScreen'
      component={DetailScreen}
    />
  </Stack.Navigator>
}

const ListScreen = ({ navigation }: any) => {
  return <View style={{ flex: 1, paddingTop: 80 }}>
    {
      dataLists.map((item, index) =>
        <List.Item
          key={index}
          style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#BEBEBE' }}
          titleStyle={{ color: '#232323' }}
          descriptionStyle={{ color: '#BEBEBE' }}
          title={item.name}
          description={item.position}
          left={() => <Avatar.Image size={48} source={{ uri: item.image }} />}
          onPress={() => navigation.navigate('DetailScreen', { image: item.image, title: item.name })}
          right={() => <View style={{ justifyContent: 'center' }}><Entypo name='chevron-right' size={24} color='#BEBEBE' /></View>}
        />
      )
    }
  </View>
}

const DetailScreen = ({ route }: any) => {
  const { image, title } = route.params
  return <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <View>
      <Image style={{ height: 300 }} source={{ uri: image }} />
    </View>
    <View style={{ flex: 1, padding: 10, alignContent: 'center' }}>
      <Text>
        {title}
      </Text>
    </View>
  </View>
}


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
