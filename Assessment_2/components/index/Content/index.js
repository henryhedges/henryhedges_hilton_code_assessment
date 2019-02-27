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
      let roomData = data[i]
      const key = `r${i}`

      if (!roomData) {
        roomData = {
          selected: i === 0,
          adults: 1,
          kids: 0
        }
      }

      stateIndex[key] = { ...roomData }
      stateIndex.roomsOrder.push(key)
    }

    return stateIndex
  }

  renderRooms(allRooms = []) {
    return allRooms.map((room, idx) => (
      <RoomCard
        key={room}
        roomKey={room}
        roomNumber={idx + 1}
        selectedChange={this.selectedChange}
        {...this.state[room]}
      />
    ))
  }

  selectedChange = (room, key, value) => {
    console.log('Select Cahnge - room => ', room)
    console.log('Select Cahnge - key => ', key)
    console.log('Select Cahnge - value => ', value)

    const newState = {
      ...this.state, 
      [room]: {
        ...this.state[room],
        [key]: value
      }
    }

    console.log('Select Cahnge - newState => ', newState)

    this.setState(newState)
  }

  submit = (e) => {
    e.preventDefault()
    console.log('submitting...')
  }
  
  render() {
    return (
      <form onSubmit={this.submit}>
        { this.renderRooms(this.state.roomsOrder) }
      </form>
    )
  }
}

export default Content
