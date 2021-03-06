import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Modal } from 'react-native'
import PropTypes from 'prop-types'
import Item from './Item'

export default class Picker extends Component {

  static propTypes = {
    dismissPicker: PropTypes.func.isRequired,
    pickerVisible: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    rangeLimit: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.mins = this.createObjArray(this.props.rangeLimit)
  }

  createObjArray = (n) => {
    arr = []
    for (const i = 1; i <= n; i++) {
      arr.push({value: String(i)})
    }
    return arr
  }

  onPress = (value) => {
    console.log('TIME_INTERVAL_PICKER')
    this.props.onValueChange(value)
    this.props.dismissPicker()
  }

  renderItem = ({item}) =>
  <Item
    value={item.value}
    onPress={this.onPress}
  />

  render() {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={this.props.pickerVisible}
        onRequestClose={this.props.dismissPicker}
      >
        <View style={styles.container}>
          <Text style={[styles.text, styles.minutes]}>{this.props.title}</Text>
          <FlatList
            style={styles.list}
            data={this.mins}
            keyExtractor={item => item.value}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  minutes: {
    marginHorizontal: 100,
    marginBottom: 15,
    borderBottomWidth: 1,
    //backgroundColor: 'green',
  },
  container: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 70,
    //backgroundColor: 'yellow',
    alignItems: 'stretch',
    //justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    //backgroundColor: 'green',
  },
  list: {
    //backgroundColor: 'red'
  }
})
