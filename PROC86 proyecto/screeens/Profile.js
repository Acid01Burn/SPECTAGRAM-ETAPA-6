import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            fontsLoaded:false,
            isEnabled:false,
            light_theme:true,
            profile_image:'',
            name:''    
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.state({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
    
      async fetchUser(){
        let theme, name, image;
        await firebase
        .database()
        .ref('/users/' + firebase.auth().currentUser.uid)
        .on('value',function(snapshot){
          theme=snapshot.val().current_theme
          name=`${snapshot.val().first_name}${snapshot.val().last_name}`
          image=snapshot.val().profile_picture
        })
        this.setState({
          light_theme:theme==='light'?true:false,
          isEnabled:theme==='light'?false:true,
          name:name,
          profile_image:image
        });
      }
      
    render() {
        if(!this.state.fontsLoaded){
            return <AppLoading/>
        } else{
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Button
                        title="Sing in with Google"
                        onPress={() => this.signInWithGoogleAsync()}> 
                    </Button>
                    <Text>Perfil</Text>
                </View>
            );
        } 
    }
}