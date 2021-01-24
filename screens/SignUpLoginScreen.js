import  React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class App extends React.Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            confirmPassword:'',
            isModalVisible:'false',
        }
    }
    userLogin = (username, password)=>{
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(()=>{
          return alert("Successfully Login")
        })
        .catch((error)=> {
         
          return alert(error)
        })
      }
    
      userSignUp = (username, password,confirmPassowrd) =>{
        if(password!==confirmPassowrd){
          return(
            alert("Check Password")
          )
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((response)=>{
          return alert("User Added Successfully")
        })
        .catch(function(error) {
         
          return alert(error)
        });
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          phone_number:this.state.phoneNumber,
          address:this.state.address,

        })
      }
      }
      showModal=()=>{
        return(
          
        <Modal
        animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    style={{borderColor:'#0073d4'}}
        >
          <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%',height:'50%'}}>
        <KeyboardAvoidingView >
        <Text
          style={styles.modalTitle}
          >Registration</Text>
          <TextInput placeholder='Enter First Name'
                style={styles.inputbox}
                maxLength={10}
                onChangeText={(text)=>{
                  this.setState({
                    firstName:text
                  })
                }}
                />
                <TextInput placeholder='Enter Last Name'
                style={styles.inputbox}
                maxLength={10}
                onChangeText={(text)=>{
                  this.setState({
                    lastName:text
                  })
                }}
                />
                <TextInput placeholder='Enter Phone Number'
                style={styles.inputbox}
                keyboardType='numeric'
                maxLength={10}
                onChangeText={(text)=>{
                  this.setState({
                    phoneNumber:text
                  })
                }}
                />
                <TextInput placeholder='Enter Address'
                style={styles.inputbox}
               multiline={true}
                onChangeText={(text)=>{
                  this.setState({
                    address:text
                  })
                }}
                />
                <TextInput placeholder='Enter Email-Id'
                style={styles.inputbox}
                keyboardType='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    username:text
                  })
                }}
                />
                <TextInput placeholder='Enter Password'
                style={styles.inputbox}
               secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({
                    password:text
                  })
                }}
                />
                <TextInput placeholder='Confirm Password'
                style={styles.inputbox}
               secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword :text
                  })
                }}
                />
                <View>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>{
                  this.userSignUp(this.state.username,this.state.password,this.state.confirmPassword) 
                }} >
                  <Text style={{marginLeft:15,marginTop:5,fontSize:15 }} >Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>{
                  this.setState({
                    isModalVisible:false
                  })
                }} >
                  <Text style={{marginLeft:15,marginTop:5,fontSize:15 }}>Cancel</Text>
                </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
      </ScrollView>
    </View>
        </Modal>
        
        )
      }
      render(){
        return(
          <View style={styles.container}>
            {
            this.showModal()
          }
            <Text style={{margin:20,color:'#00cccc',fontSize:40}}>Sign Up and Login Screen</Text>
            <View style={styles.buttonContainer}>
             
              <View style={{alignItems:'center'}}>
                <TextInput placeholder='Enter username'
                style={styles.inputbox}
                keyboardType ='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    username: text
                  })
                }}
                />
              </View>
             
              <View style={{alignItems:'center'}}>
                <TextInput placeholder='Enter password'
                  style={styles.inputbox}
                  secureTextEntry = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      password: text
                    })
                  }}
                />
              </View>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity
                  style={[styles.buttons,{marginBottom:10}]}
                  onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
                  >
                  <Text style={{ fontSize:18, fontStyle:'italic',marginLeft:10}}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={()=>{
                    this.setState({
                      isModalVisible:true
                    })
                  }}
                  >
                  <Text style={{ fontSize:18, fontStyle:'italic',marginLeft:5}}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputbox:{
    height:50,
    width:300,
    border:"solid",
    borderWidth:3,
    //borderColor:"red",
    margin:10,
},
buttons:{
  backgroundColor:'#99ddff',
    borderWidth:2,
    borderColor:'black',
    margin:20,
    width:90,
    height:35,
},
modalTitle :{
  justifyContent:'center',
  alignSelf:'center',
  fontSize:30,
  color:'#0077b3  ',
  margin:50
},
modalContainer:{
  flex:1,
  borderRadius:20,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"#ffff",
  marginRight:30,
  marginLeft : 30,
  marginTop:80,
 
  marginBottom:80,
},
registerButton:{
  width:200,
  height:40,
  alignItems:'center',
  justifyContent:'center',
  borderWidth:1,
  borderRadius:10,
  marginTop:30
},
registerButtonText:{
  color:'#ff5722',
  fontSize:15,
  fontWeight:'bold'
},
});
