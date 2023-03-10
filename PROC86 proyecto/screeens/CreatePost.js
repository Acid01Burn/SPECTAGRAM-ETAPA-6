import React, { Component } from 'react';
import { Text, View, StyleSheet,SafeAreaView,Platform,StatusBar,Image,ScrollView,TextInput,Dimensions} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: false,
            previewImage: "image_1",
            dropdownHeight: 40
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }

    render() {
        if(!this.state.fontsLoaded){
            return <AppLoading/>
        } else {
            let preview_image = {
                image_1: require("../assests/image_1.jpg"),
                image_2: require("../assests/image_2.jpg"),
                image_3: require("../assests/image_3.jpg"),
                image_4: require("../assests/image_4.jpg"),
                image_5: require("../assests/image_5.jpg"),
                image_6: require("../assests/image_6.jpg"),
                image_7: require("../assests/image_7.jpg")
            };
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>
                    <View style={styles.appTitle}>
                        <Image source={require("../assests/logo.png")} 
                         style={styles.iconImage}></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text>Crear publicación</Text>
                    </View>
                </View> 
                <View style={styles.fieldsContainer}>
                    <ScrollView>
                        <Image source={preview_image[this.state.previewImage]}
                        style={styles.previewImage}></Image>
                        <View style={{ height:RFValue(this.state.dropdownHeight) }}>
                            <DropDownPicker
                                items={[
                                    {label: "Image1", value: "image_1"},
                                    {label: "Image2", value: "image_2"},
                                    {label: "Image3", value: "image_3"},
                                    {label: "Image4", value: "image_4"},
                                    {label: "Image5", value: "image_5"},
                                    {label: "Image6", value: "image_6"},
                                    {label: "Image7", value: "image_7"}
                                ]}
                                defaulValue={this.state.previewImage}
                                containerStyle={{
                                    height:40,
                                    borderRadius:20,
                                    marginBottom:10
                                }}
                                onOpen={() => {
                                    this.setState({dropdownHeight:170});
                                }}
                                onClose={() => {
                                    this.setState({dropdownHeight:40});
                                }}
                                style={{backgroundColor:"transparent"}}
                                itemStyle={{justifyContent:"flex-start"}}
                                dropDownStyle={{backgroundColor:"#2A2A2A"}}
                                labelStyle={{color:"white"}}
                                arrowStyle={{color:"white"}}
                                onChangeItem={item => this.setState({previewImage:item.value})}/>
                            </View>
                            <TextInput
                                style={styles.inputFont}
                                onChangeText={caption => this.setState({caption})}
                                placeholder={"Titulo"}
                                placeholderTextColor="white"/>
                    </ScrollView>
                </View>                
                <View style={{flex:0.08}}/>
                               
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
      flex: 0.85
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
      marginTop: RFValue(15)
    },
    inputTextBig: {
      textAlignVertical: "top",
      padding: RFValue(5)
    }
  });