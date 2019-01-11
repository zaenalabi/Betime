import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import {Constants} from 'expo'
import Vibrate from './utils/vibrate'
import TimeSelector from './Components/TimeSelector'
import TimerContainer from './Components/TimerContainer'



export default class App extends React.Component {
  state = {
    studyTime: 25,
    breakTime: 5,
    isStudyTime: true,
  }

  onStudyChange = (newStudyTime) => {
    this.setState({
      studyTime: newStudyTime
    })
  }

  onBreakChange = (newBreakTime) => {
    this.setState({
      breakTime: newBreakTime
    })
  }

  onTimerEnd = () => {
    this.setState(prevState => ({
      isStudyTime: !prevState.isStudyTime
    }))
    Vibrate(),
    Sound()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Be Time</Text>
        <TimeSelector 
          studyTime={this.state.studyTime}
          onStudyChange={this.onStudyChange}
          breakTime={this.state.breakTime}
          onBreakChange={this.onBreakChange}>
        </TimeSelector>
        
        <TimerContainer 
          studyTime={this.state.studyTime}
          breakTime={this.state.breakTime}
          isStudyTime={this.state.isStudyTime}
          onTimerEnd={this.onTimerEnd}>
        </TimerContainer>
      
      
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
})
