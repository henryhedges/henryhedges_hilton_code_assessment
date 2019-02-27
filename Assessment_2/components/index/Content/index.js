import React from 'react'
import RoomCard from './RoomCard'

class Content extends React.Component {
  constructor(props) {
    super(props)
    
    const { data, maxRooms } = this.props;

    this.state = this.createInitialState(data, maxRooms)
  }

  createInitialState(data, maxRooms) {
    const stateIndex = {
      roomsOrder: []
    }

    for (let i = 0; i < maxRooms; i++) {
      const roomData = data[i]
      const key = `r${i}`
      stateIndex[key] = { ...roomData }
      stateIndex.roomsOrder.push(key)
    }

    return stateIndex
  }

  renderRooms(allRooms = []) {
    return allRooms.map((room, idx) => <RoomCard key={room} roomNumber={idx + 1} {...this.state[room]} />)
  }
  
  render() {
    return this.renderRooms(this.state.roomsOrder)
  }
}

export default Content
