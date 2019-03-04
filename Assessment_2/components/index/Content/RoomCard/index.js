import React, { Fragment } from "react"
import PropTypes from 'prop-types'

class RoomCard extends React.Component {
  createNumericOptions(limit = 2, type) {
    const options = []

    for (let i = 0; i < limit; i++) {
      options.push(
        <option
          key={`${i}-${type}`}
          value={i}
        >
          {i}
        </option>
      )
    }

    return options
  }

  render() {
    const { 
      adults, 
      inputChange,
      kids, 
      roomKey, 
      roomNumber, 
      selected, 
      selectedChange,
    } = this.props

    const isFirstRoom = roomNumber === 1
    const roomId = `${roomKey}-room`
    const kidsId = `${roomKey}-kids`
    const adultsId = `${roomKey}-adults`

    return (
      <Fragment>
        <span className={`index_content_room-card ${!selected && '--disabled'}`} data-testroom>
          <div className='inputwrapper'>
            {!isFirstRoom && (
              <input
                checked={selected}
                data-testcheckbox
                id={roomId}
                onChange={
                  (e) => inputChange(roomKey, 'selected', e.target.checked)
                }
                type='checkbox'
              />
            )}
            <label htmlFor={roomId} className='roomname'>Room {roomNumber}</label>
          </div>
          <div className='selectcontainer'>
            <span className='selectwrapper'>
              <label htmlFor={adultsId}>Adults<br/>(18+)</label>
              <select
                data-testadults
                disabled={!selected}
                id={adultsId}
                onChange={
                  (e) => selectedChange(roomKey, 'adults', e.target.value)
                }
                value={adults}
              >
                {this.createNumericOptions(3)}
              </select>
            </span>
            <span className='selectwrapper'>
              <label htmlFor={kidsId}>Children<br/>(0-17)</label>
              <select
                data-testkids                
                disabled={!selected}
                id={kidsId}
                onChange={
                  (e) => selectedChange(roomKey, 'kids', e.target.value)
                }
                value={kids}
              >
                {this.createNumericOptions(4)}
              </select>
            </span>
          </div>
        </span>
        <style jsx>{`
        .index_content_room-card {
          background: #F0F0F0;
          border-radius: 1rem;
          border: .4rem solid #F0F0F0;
          margin-bottom: 1rem;
        }

        .index_content_room-card:not(:last-child){
          margin-right: 1rem;
        }

        .index_content_room-card.--disabled {
          border: .4rem solid #D3D3D3;
        }

        .index_content_room-card.--disabled, 
        .index_content_room-card.--disabled *,
        .index_content_room-card.--disabled .selectcontainer  {
          background: #E3E3E3;
        }

        .index_content_room-card .inputwrapper {
          border-radius: 1rem 1rem 0 0;
          display: flex;
          align-items: center;
          padding-left: .75rem;
          margin-bottom: .5rem;
        }

        .index_content_room-card .inputwrapper > .roomname {
          display: inline-block;
          margin: 0;
        }

        .index_content_room-card .inputwrapper > input {
          cursor: pointer;
          margin-right: .5rem;
        }

        .index_content_room-card .selectcontainer {
          display: flex;
          background: white;
          border-radius: .5rem .5rem .75rem .75rem;
          padding: .75rem;
        }

        .index_content_room-card .selectwrapper:first-child {
          margin-right: 1rem;
        }

        .index_content_room-card .selectwrapper > label {
          display: block;
          font-weight: 400;
        }
      `}</style>
    </Fragment>        
    )
  }
}

RoomCard.defaultProps = {
  adults: '1',
  kids: '0',
}

RoomCard.propTypes = {
  adults: PropTypes.string,
  inputChange: PropTypes.func.isRequired,
  kids: PropTypes.string,
  roomKey: PropTypes.string.isRequired, 
  roomNumber: PropTypes.number.isRequired, 
  selected: PropTypes.bool.isRequired, 
  selectedChange: PropTypes.func.isRequired,
}

export default RoomCard
