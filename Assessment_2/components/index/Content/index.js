import React from 'react'
import RoomCard from './RoomCard'

class Content extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.createInitialState(this.props.data)
  }

  createInitialState(data) {
    const stateIndex = {}

    return stateIndex
  }

  renderRooms(allRooms = []) {
    return allRooms.map(room => <RoomCard {...room} />)
  }
  
  render() {
    const { maxRooms } = this.props;
    return this.renderRooms()
  }
}

export default Content
