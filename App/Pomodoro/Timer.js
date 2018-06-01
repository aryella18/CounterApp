import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

export default class Timer extends Component {

  static defaultProps = { minCount: 0 }

  static propTypes = { minCount: PropTypes.number.isRequired }

  this.state = {
    count: this.convertToSeconds(this.props.minCount),
    paused: true,
  }



  componentDidMount = () => {
    //console.log(`Start timer ${this.state.count}`);

    //Only start the countdown if it was passed a count prop.
    if (this.state.count > 0) {
      this.interval = setInterval(this.decrease, 1000)
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    //Unpausing
    if (this.state.paused && !nextState.paused) {
      //console.log('Set interval')
      this.interval = setInterval(this.decrease, 1000)
    }

    //Pausing
    if ((!this.state.paused && nextState.paused) || nextState.count < 0) {
      //console.log('Clear interval')
      clearInterval(this.interval)
    }

    //console.log(`Should update ${nextState.count}`);
    return nextState.count > -1
  }

  convertToSeconds = (m) => {
    if (m < 0) {throw new RangeError('Tentativa de converter tempo negativo.')}
    return m * 60
  }

  convertToMinutes = (t) => {
      if (t < 0) {
        throw new RangeError('Tentativa de converter tempo negativo.')
      }
      m = Math.floor(t / 60)
      s = t - (m * 60)
      return {mins: m, secs: s}
  }

  decrease = () => {
    this.setState(
        prevState => ({count: prevState.count - 1})
    )
    //console.log(`Decrease to ${this.state.count-1}`);
  }

  pause = () => {
    //console.log('Pause')
    this.setState(
      prevState => ({paused: !this.state.paused})
    )
  }

  zeroPadLeft = ({mins, secs}) => {
    mins = String('00' + mins).slice(-2)
    secs = String('00' + secs).slice(-2)
    return {mins, secs}
  }

  render() {
    const {mins, secs} = this.zeroPadLeft(this.convertToMinutes(this.state.count))

    //console.log(`Rendered ${this.state.count}`);
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.pause}>
        <Text style={styles.count}>{mins}:{secs}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'orange',
  },
  count: {
    fontSize: 40,
  }
})
