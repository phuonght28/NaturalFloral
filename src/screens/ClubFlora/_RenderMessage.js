import React, { Component } from 'react'
import { Text, View, FlatList, Dimensions, Button, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  width: width,
  height: 50,
  flex: 1,
  borderWidth: 1,
}

function getData(number) {
  let data = []
  for (var i = 0; i < number; ++i) {
    data.push("" + i)
  }

  return data
}

class ScrollToExample extends Component {
  
  getItemLayout = (data, index) => (
    { length: 50, offset: 50 * index, index }
  )


  scrollToLast = () => {
    let randomIndex = 99
    this.flatListRef.scrollToEnd({ animated: true, index: randomIndex })
  }
  scrollToIndex = () => {
    let randomIndex = Math.floor(Math.random(Date.now()) * this.props.data.length)
    this.flatListRef.scrollToIndex({ animated: true, index: randomIndex })
  }

  scrollToItem = () => {
    let randomIndex = Math.floor(Math.random(Date.now()) * this.props.data.length)
    this.flatListRef.scrollToIndex({ animated: true, index: "" + randomIndex })
  }

  render() {
    this.scrollToLast()
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Button
            onPress={this.scrollToLast}
            title="Tap to scrollToLast"
          />
          <Button
            onPress={this.scrollToIndex}
            title="Tap to scrollToIndex"
          />
          <Button
            onPress={this.scrollToItem}
            title="Tap to scrollToItem"
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          ref={(ref) => { this.flatListRef = ref }}
          keyExtractor={item => item}
          getItemLayout={this.getItemLayout}
          initialScrollIndex={99}
          initialNumToRender={2}
          renderItem={({ item, index }) => (
            <View style={{ ...style}}>
              <Text>{item}</Text>
            </View>
          )}
          {...this.props}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class RenderMessage extends Component {
  
  render() {
    return <ScrollToExample data={getData(100)} />
  }
}
