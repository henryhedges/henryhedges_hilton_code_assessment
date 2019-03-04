import React from 'react'
import PropTypes from 'prop-types'
import RoomCard from './RoomCard'
import { LOCAL_STORAGE_KEY } from '../../../data/index/constants'

class Content extends React.Component {
  state = {
    roomsOrder: []
  }

  componentDidMount() {
    const { maxRooms } = this.props
    let { data } = this.props

    if (!data.length && this.checkLocalStorage()) {
      data = this.getLocalData()
    }

    this.setState(this.createInitialState(data, maxRooms))
  }

  checkLocalStorage() {
    return localStorage.hasOwnProperty(LOCAL_STORAGE_KEY)
  }

  getLocalData() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  }

  setLocalData(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  }

  createDefaultRoomData(i) {
    return {
      selected: i === 0,
      adults: '1',
      kids: '0',
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
        [key]: value,
      },
    }
  }

  selectedChange = (room, key, value, cb) => {
    const newState = this.copyState(room, key, value, this.state)

    this.setState(newState, cb)
  }

  submit = (e) => {
    e.preventDefault()

    const data = this.state.roomsOrder.reduce((acc, cur) => { 
      acc.push(this.state[cur])
      return acc
    }, [])

    this.setLocalData(data)
  }
  
  render() {
    return (
      <form
        className="index_content"
        onSubmit={this.submit}
      >
        <div className="roomcardcontainer">
          {this.renderRooms(this.state.roomsOrder)}
        </div>
        <button type='submit' data-testsubbtn>Submit</button>
        <style jsx>{`
          .index_content {
            padding: 3rem;
          }

          .index_content > .roomcardcontainer {
            display: flex;
            margin-bottom: 3rem;
            flex-wrap: wrap;
          }
        `}</style>
      </form>
    )
  }
}

Content.defaultProps = {
  data: [],
  maxRooms: 4,
}

Content.propTypes = {
  data: PropTypes.array,
  maxRooms: PropTypes.number,
}

export default Content
