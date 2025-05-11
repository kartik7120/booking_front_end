import TimeSlot from './timeSlot'

interface MovieTimeSlotsDetailsProps {
  movieVenues: {
    venueName: string
    timeSlots: {
      time: string // format is 24hr
      halfFull?: boolean // means half seats are full, color to use is yellow
      houseFull?: boolean // means all seats are full, color to use is grey
      almostFull?: boolean // means only 10% seats are left, color to use is red
    }[]
  }[]
}

export default function MovieTimeSlotsDetails(props: MovieTimeSlotsDetailsProps) {
  return (
    <div>
      {props.movieVenues.map((venue, index) => (
        <div key={index} className="mb-4">
          <div className='flex flex-row items-center gap-x-5'>
            <h2 className="text-lg font-bold">{venue.venueName}</h2>
            <div className='flex flex-row items-center justify-start gap-x-5'>
              {venue.timeSlots.map((slot, slotIndex) => (
                <div className="tooltip">
                  <div className="tooltip-content">
                    {/* This will used to show different types of seats that user can buy */}
                    <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">Wow!</div>
                  </div>
                  <TimeSlot time={slot.time} key={slotIndex} halfFull={slot.halfFull} houseFull={slot.houseFull} almostFull={slot.almostFull} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
