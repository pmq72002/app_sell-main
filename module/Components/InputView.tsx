/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../styles/colors';

function InputView({
  value,
  onChange,
  title,
  placeholder,
  secureText,
  phone,
  noEidt,
  onPressButton,
}: {
  value: string;
  onChange: (val: string) => {};
  title: string;
  placeholder: string;
  secureText?: boolean;
  phone?: boolean;
  noEidt?: boolean;
  onPressButton?: () => {};
}) {
  return (
    <View style={{width: '100%', marginBottom: 20}}>
      <Text style={{fontSize: 15, color: colors.black, fontWeight: 'bold'}}>
        {title}
      </Text>
      {noEidt ? (
        <TouchableOpacity style={css.inputLogin} onPress={onPressButton}>
          <Text style={[css.wInput, {fontWeight: '500', color: colors.black}]}>
            {value === '' ? placeholder : value}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={css.inputLogin}>
          {/* <Image source={images.ACCOUNT} style={css.icPhone} /> */}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.dark}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            // editable={!loading}
            secureTextEntry={secureText}
            keyboardType={phone ? 'phone-pad' : 'default'}
            style={css.wInput}
          />
        </View>
      )}
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  viewImage: {
    alignItems: 'center',
  },
  btnLogin: {
    height: 45,
    marginTop: 20,
    width: '80%',
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    marginTop: 20,
    borderWidth: 0.7,
    borderColor: colors.dark,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLogin: {
    height: 45,
    // marginTop: 20,
    marginTop: 5,
    borderWidth: 0.7,
    borderColor: colors.placeholder,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wInput: {
    width: Dimensions.get('window').width * 0.8 - 50,
    color: colors.black,
    fontWeight: '500',
  },
  icPhone: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  logo: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').width / 5,
    marginTop: 35,
    marginBottom: 20,
  },
});

export default InputView;
