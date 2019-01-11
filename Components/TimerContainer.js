import React from 'react'
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import Timer from './Timer'


export default class TimerContainer extends React.Component {
  state = {
    initialTimer: this.props.isStudyTime ? this.props.studyTime : this.props.breakTime,
    timeLeft: this.initializeTimer(),
    timerRunning: false,
  }

  componentDidMount() {
    this.timerID = setInterval(this.decrement, 1000)
    this.setState({
      timerRunning:true
    })
  }

  componentWillReceiveProps() {
    setTimeout(
      () => {this.setState({
        initialTimer: this.props.isStudyTime ? this.props.studyTime : this.props.breakTime,
        timeLeft: this.initializeTimer(),
      })},
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  initializeTimer() {
    let timer = this.props.isStudyTime ? this.props.studyTime : this.props.breakTime
    let timerEndTime = new Date(Date.now() + timer * 60000)
    let currentTime = new Date()
    return timerEndTime - currentTime
  }

  decrement = () => {
    if (this.state.timeLeft < 1000) {
      this.props.onTimerEnd()
      this.setState({
        initialTimer: this.props.isStudyTime ? this.props.studyTime : this.props.breakTime,
        timeLeft: this.initializeTimer(),
      })
    } else {
      this.setState(prevState => ({
        timeLeft: prevState.timeLeft - 1000
      }))
    }
  }

  onReset = () => {
    this.setState({
      initialTimer: this.props.isStudyTime ? this.props.studyTime : this.props.breakTime,
      timeLeft: this.initializeTimer(),
    })
  }

  onStart = () => {
    if (!this.state.timerRunning) {
      this.timerID = setInterval(this.decrement, 1000)
    }
    this.setState({
      timerRunning: true
    })
  }

  onStop = () => {
    clearInterval(this.timerID)
    this.setState({
      timerRunning: false
    })
  }

  render() {
    return (
      <View style={styles.container}> 
      
        <TextInput
          style={styles.text}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Tulis Fokus Anda"
          
        />
      
        <Text style={styles.textinput}>{this.props.isStudyTime ? 'Focus!' : 'Break!'}</Text>
        <Timer timeLeft={this.state.timeLeft}></Timer>
        <View style={styles.buttons}>
          <Button onPress={this.onStart} title='Start' />
          <Button onPress={this.onStop} title='Stop' />
          <Button onPress={this.onReset} title='Reset' />
        </View> 
      </View>
    )
  }
}

TimerContainer.propTypes = {
  studyTime: PropTypes.number.isRequired,
  breakTime: PropTypes.number.isRequired,
  isStudyTime: PropTypes.bool.isRequired,
  onTimerEnd: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  buttons: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 32,
  },

 textInput: {
    backgroundColor: 'green',
    color: 'white',
    height: 50,
    paddingRight: 0,
    paddingLeft: 10,
    borderColor: "gray",
    width: "100%",
    justifyContent: 'center',
    
  }
})