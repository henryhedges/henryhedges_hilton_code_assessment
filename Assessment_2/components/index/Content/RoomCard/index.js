import React from "react";

class RoomCard extends React.Component {
  state = {};

  createNumericOptions(limit = 2, type) {
    const options = [];

    for (let i = 0; i < limit; i++) {
      options.push(<option key={`${i}-${type}`} value={i}>{i}</option>)
    }

    return options;
  }

  render() {
    const { adults, kids, roomNumber, selected } = this.props;
    const isFirstRoom = roomNumber === 1;

    return (
      <div className='room-card'>
        <div>
          { !isFirstRoom && (
              <span>
                <input type='checkbox'/>
              </span>
            )
          }
          <span>Room {roomNumber}</span>
        </div>
        <div>
          <span>
            <label>Adults (18+)</label>
            <select value={adults} disabled={!selected}>
              { this.createNumericOptions() }
            </select>
          </span>
          <span>
            <label>Children (18+)</label>
            <select value={kids} disabled={!selected}>
              { this.createNumericOptions() }
            </select>
          </span>
        </div>
      </div>
    );
  }
}

RoomCard.defaultProps = {
  adults: 1,
  kids: 0
};

export default RoomCard;
