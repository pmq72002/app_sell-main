/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { View, Text, StatusBar, Pressable, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API_URL_OPEN_AI, KEY_OPEN_AI } from '../../util/AsyncKey';
const ChatScreen: React.FC = () => {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  const [dataChat, setDataChat] = useState([]);

  function goBack() {
    navigation.goBack();
  }

  async function handleSend() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL_OPEN_AI}?key=${KEY_OPEN_AI}`,
        {
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setLoading(false);
      console.log(response);

      const responseData = response.data;
      // Extract the 'text' from the 'parts' in the response content
      const responseText = responseData.candidates[0]?.content?.parts[0]?.text || '';


      let tempDataChat: any = [...dataChat];
      if (responseText) {
        setMessage('');
        tempDataChat.push({
          id: tempDataChat.length + 1,
          message: message,
        });
        tempDataChat.push({
          id: tempDataChat.length + 1,
          message: responseText,
        });
        setDataChat(tempDataChat);
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <ViewContainer>
      <StatusBar
        backgroundColor={colors.secondMain}
        barStyle={'light-content'}
      />
      <View
        style={{
          backgroundColor: colors.secondMain,
          height: 80,
          alignItems: 'center',
          zIndex: 1,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 70,
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          width: '100%',
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.white }}>
          Hổ trợ
        </Text>

        <Pressable onPress={goBack} style={{ position: 'absolute', left: 10 }}>
          <AntDesign name="arrowleft" size={20} color={colors.white} />
        </Pressable>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.placeholder_light2, paddingTop: 80, paddingHorizontal: 10 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataChat.map((item: any) => {
              return (
                <View style={{ marginTop: 15, backgroundColor: colors.placeholder_light2, justifyContent: item.id % 2 === 0 ? 'flex-start' : 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                  {item.id % 2 === 0 && <AntDesign name="android1" color={colors.black} size={20} style={{ marginRight: 10 }} />}
                  <View style={{ width: '60%', backgroundColor: colors.white, borderRadius: 10, padding: 10 }}>
                    <Text style={{ fontSize: 16, color: colors.black }}>{item.message}</Text>
                  </View>
                  {item.id % 2 !== 0 && <AntDesign name="user" color={colors.black} size={20} style={{ marginLeft: 10 }} />}
                </View>
              );
            })}
          </ScrollView>

        </KeyboardAvoidingView>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={message}
          editable={!loading}
          onChangeText={setMessage}
        />
        <TouchableOpacity disabled={loading} style={styles.sendButton} onPress={handleSend}>
          {loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <Ionicons name="send" size={24} color="white" />}
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: colors.placeholder_light2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.placeholder_light2,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default ChatScreen;
