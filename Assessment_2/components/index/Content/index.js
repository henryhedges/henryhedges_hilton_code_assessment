import React from 'react'
import RoomCard from './RoomCard'

class Content extends React.Component {
  constructor(props) {
    super(props)
    
    const { data, maxRooms } = this.props;

    this.state = this.createInitialState(data, maxRooms)
  }

  createDefaultRoomData(i) {
    return {
      selected: i === 0,
      adults: '1',
      kids: '0'
    }
  }

  createInitialState(data, maxRooms) {
    const stateIndex = {
      roomsOrder: []
    }

    for (let i = 0; i < maxRooms; i++) {
      let roomData = data[i]
      const key = `r${i}`

      if (!roomData) {
        roomData = this.createDefaultRoomData(i)
      }

      stateIndex[key] = { ...roomData }
      stateIndex.roomsOrder.push(key)
    }

    return stateIndex
  }

  inputChange = (room, key, value) => {
    let state = this.state;
    const idxOfRoom = state.roomsOrder.indexOf(room)

    if (idxOfRoom > 0) {
      if (value) {
        for (let i = idxOfRoom; i > 0; i--) {
          const newRoom = state.roomsOrder[i]
          state = this.copyState(newRoom, key, value, state)
        }
      } else {
        for (let i = idxOfRoom; i < state.roomsOrder.length; i++) { 
          const newRoom = state.roomsOrder[i]
          state = {...state, [newRoom]: this.createDefaultRoomData(i)}
        }
      }
    }

    this.setState(state)
  }

  renderRooms(allRooms = []) {
    return allRooms.map((room, idx) => (
      <RoomCard
        inputChange={this.inputChange}
        key={room}
        roomKey={room}
        roomNumber={idx + 1}
        selectedChange={this.selectedChange}
        {...this.state[room]}
      />
    ))
  }

  copyState(room, key, value, state) {
    return {
      ...state, 
      [room]: {
        ...state[room],
        [key]: value
      }
    }
  }

  selectedChange = (room, key, value, cb) => {
    const newState = this.copyState(room, key, value, this.state)

    this.setState(newState, cb)
  }

  submit = (e) => {
    e.preventDefault()
    console.log('submitting...')
  }
  
  render() {
    return (
      <form onSubmit={this.submit}>
        {this.renderRooms(this.state.roomsOrder)}
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default Content
