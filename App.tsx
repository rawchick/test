import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Provider as PaperProvider, List, Title, TextInput, Button, HelperText, Card, Portal, Modal, Avatar } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Carousel from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as WebBrowser from 'expo-web-browser'
import { Entypo } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator()

const StackNavigator = () => {
  return <Stack.Navigator
    initialRouteName='Home'
    headerMode='none'
    screenOptions={() => ({
      gestureEnabled: false
    })}
  >
    <Stack.Screen
      name='Auth'
      component={AuthScreen}
    />
    <Stack.Screen
      name='Home'
      component={HomeScreen}
    />
    <Stack.Screen
      name='ListView'
      component={ListScreen}
    />
  </Stack.Navigator >
}

const AuthScreen = ({ navigation }: any) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isUsernameError, setIsUsernameError] = React.useState(false)
  const [isPasswordError, setIsPasswordError] = React.useState(false)

  const onUsernameChange = (text: string) => {
    (hasErrors(text)) ? setIsUsernameError(true) : setIsUsernameError(false)
    setUsername(text)
  }

  const onPasswordChange = (text: string) => {
    (hasErrors(text)) ? setIsPasswordError(true) : setIsPasswordError(false)
    setPassword(text)
  }

  const hasErrors = (text: string) => {
    return text === '';
  }

  const onSubmit = () => {
    navigation.navigate('Home')
  }

  return <SafeAreaView style={{ flex: 1 }}>
    <Title style={{ margin: 10, marginBottom: 20 }}>AUTHEHNTICATION</Title>
    <View>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => onUsernameChange(text)}
        style={{ margin: 10 }}
        error={isUsernameError}
      />
      <HelperText type="error" visible={isUsernameError}>
        Username is invalid!
      </HelperText>
    </View>
    <View>
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => onPasswordChange(text)}
        style={{ margin: 10 }}
        secureTextEntry
        error={isPasswordError}
      />
      <HelperText type="error" visible={isPasswordError}>
        Password is invalid!
      </HelperText>
    </View>
    <Button disabled={hasErrors(username) || hasErrors(password)} mode="contained" onPress={onSubmit} style={{ margin: 10 }}>Login</Button>
  </SafeAreaView>
}

const HomeScreen = ({ navigation }: any) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const items = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
      action: () => WebBrowser.openBrowserAsync('https://www.thelivingos.com'),
    },
    {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      action: () => Linking.openURL('maps://app?saddr=100+101&daddr=100+102'),
    },
    {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
      action: () => showModal()
    },
  ]

  const renderItem = ({ item, index }: any) => {
    return <TouchableOpacity
      onPress={item.action}
      style={{
        backgroundColor: 'rebeccapurple',
        borderRadius: 5,
        height: 280,
        padding: 10,
        marginLeft: 25,
        marginRight: 25
      }}>
      <Card.Cover source={{ uri: item.illustration }} />
      <Text style={{ color: '#FFFFFF', padding: 10 }}>{`${index + 1}. ${item.title}`}</Text>
    </TouchableOpacity>
  }

  return <SafeAreaView style={{ flex: 1 }}>
    <Title style={{ margin: 10, marginBottom: 20 }}>HOME</Title>
    <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
      <Carousel
        data={items}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
      />
    </View>
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Button mode="outlined" onPress={() => navigation.navigate('ListView')} style={{ margin: 10 }}>ListView Screen</Button>
      <Button mode="contained" onPress={() => navigation.push('Auth')} style={{ margin: 10 }}>Logout</Button>
    </View>
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, justifyContent: 'center' }}>
        <Image style={{ height: 300, resizeMode: 'contain' }} source={{ uri: 'https://i.imgur.com/MABUbpDl.jpg' }} />
        <Text style={{ color: '#BBBBBB', padding: 10, alignSelf: 'center' }}>{`Press outside this area to dismiss.`}</Text>
      </Modal>
    </Portal>
  </SafeAreaView>
}

const ListScreen = ({ navigation }: any) => {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos').then(resp => resp.json()).then(resp => setData(resp))
  })
  return <SafeAreaView style={{ flex: 1 }}>
    <Title style={{ margin: 10, marginBottom: 20 }}>List View</Title>
    <ScrollView>
      {
        data.slice(0, 100).map((item: any, index: number) =>
          <List.Item
            key={index}
            style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#BEBEBE' }}
            titleStyle={{ color: '#232323' }}
            descriptionStyle={{ color: '#BEBEBE' }}
            title={item.title}
            left={() => <Avatar.Image size={48} source={{ uri: item.thumbnailUrl }} />}
            right={() => <View style={{ justifyContent: 'center' }}><Entypo name='chevron-right' size={24} color='#BEBEBE' /></View>}
          />
        )
      }
    </ScrollView>
    <Button mode="outlined" onPress={() => navigation.navigate('Home')} style={{ margin: 10 }}>Home Screen</Button>
    <Button mode="contained" onPress={() => navigation.push('Auth')} style={{ margin: 10 }}>Logout</Button>
  </SafeAreaView>
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
