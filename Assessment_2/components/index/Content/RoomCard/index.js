import React from "react";

class RoomCard extends React.Component {
  createNumericOptions(limit = 2, type) {
    const options = [];

    for (let i = 0; i < limit; i++) {
      options.push(<option key={`${i}-${type}`} value={i}>{i}</option>)
    }

    return options;
  }

  render() {
    const { 
      adults, 
      inputChange,
      kids, 
      roomKey, 
      roomNumber, 
      selected, 
      selectedChange
    } = this.props

    const isFirstRoom = roomNumber === 1

    return (
      <div className='room-card'>
        <div>
          { !isFirstRoom && (
              <span>
                <input checked={selected} type='checkbox' onChange={(e) => inputChange(roomKey, 'selected', e.target.checked)}/>
              </span>
            )
          }
          <span>Room {roomNumber}</span>
        </div>
        <div>
          <span>
            <label>Adults (18+)</label>
            <select disabled={!selected} value={adults} onChange={(e) => selectedChange(roomKey, 'adults', e.target.value)}>
              { this.createNumericOptions() }
            </select>
          </span>
          <span>
            <label>Children (18+)</label>
            <select disabled={!selected} value={kids} onChange={(e) => selectedChange(roomKey, 'kids', e.target.value)}>
              { this.createNumericOptions(4) }
            </select>
          </span>
        </div>
      </div>
    );
  }
}

RoomCard.defaultProps = {
  adults: 1,
  kids: 0,
  selectedChange: () => {}
};

export default RoomCard;
