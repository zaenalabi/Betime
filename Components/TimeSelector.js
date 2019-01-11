import React from 'react'
import { StyleSheet, View, Text, Picker } from 'react-native'
import PropTypes from 'prop-types'

const TimeSelector = props => (
  <View style={styles.container}>
    <View style={styles.group}>
      <Text style={styles.text}>Focus Time</Text>
      <Picker
        mode="dropdown"
        selectedValue={props.studyTime}
        style={styles.picker}
        onValueChange={props.onStudyChange}>
        {
          possibleTimes.map(time => (
            <Picker.Item key={time} label={time + ' minutes'} value={time}/>
          ))
        }
      </Picker>
    </View>
    <View style={styles.group}>
      <Text style={styles.text}>Break Time</Text>
      <Picker
        mode="dropdown"
        selectedValue={props.breakTime}
        style={styles.picker}
        onValueChange={props.onBreakChange}>
        {
          possibleTimes.map(time => (
            <Picker.Item key={time} label={time + ' minutes'} value={time}/>
          ))
        }
      </Picker>
    </View>
  </View>
);

TimeSelector.propTypes = {
  studyTime: PropTypes.number.isRequired,
  onStudyChange: PropTypes.func.isRequired,
  breakTime: PropTypes.number.isRequired,
  onBreakChange: PropTypes.func.isRequired,
}

const possibleTimes = Array.from(new Array(12), (val, index) => (index + 1) * 5)

const styles = StyleSheet.create({
  container: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  group: {
    backgroundColor: '#666',
  },
  picker: { 
    height: 50,
    width: 135,
    color: '#FFF',
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
})

export default TimeSelector