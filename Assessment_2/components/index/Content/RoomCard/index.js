import React, { Fragment } from "react";

class RoomCard extends React.Component {
  createNumericOptions(limit = 2, type) {
    const options = []

    for (let i = 0; i < limit; i++) {
      options.push(<option key={`${i}-${type}`} value={i}>{i}</option>)
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
      selectedChange
    } = this.props

    const isFirstRoom = roomNumber === 1

    return (
      <Fragment>
        <div className={`index_content_room-card ${!selected && '--disabled'}`}>
          <div className='inputwrapper'>
            { !isFirstRoom && (
                <input checked={selected} type='checkbox' onChange={(e) => inputChange(roomKey, 'selected', e.target.checked)}/>
              )
            }
            <h5 className='roomname'>Room {roomNumber}</h5>
          </div>
          <div className='selectcontainer'>
            <span className='selectwrapper'>
              <label>Adults<br/>(18+)</label>
              <select disabled={!selected} value={adults} onChange={(e) => selectedChange(roomKey, 'adults', e.target.value)}>
                { this.createNumericOptions() }
              </select>
            </span>
            <span className='selectwrapper'>
              <label>Children<br/>(0-17)</label>
              <select disabled={!selected} value={kids} onChange={(e) => selectedChange(roomKey, 'kids', e.target.value)}>
                { this.createNumericOptions(4) }
              </select>
            </span>
          </div>
        </div>
        <style jsx>{`
        .index_content_room-card:not(:last-child){
          margin-right: 1rem;
        }

        .index_content_room-card {
          background: #F0F0F0;
          border-radius: 1rem;
          border: .4rem solid #F0F0F0;
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
          padding: .5rem;
        }

        .index_content_room-card .inputwrapper > .roomname {
          display: inline-block;
          margin: 0;
        }

        .index_content_room-card .inputwrapper > input {
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
          font-size: 1.25rem;
          font-weight: 400;
        }

      `}</style>
    </Fragment>        
    );
  }
}

RoomCard.defaultProps = {
  adults: 1,
  kids: 0,
  selectedChange: () => {}
};

export default RoomCard;
