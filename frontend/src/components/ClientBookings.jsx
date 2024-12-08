import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"

const bookings = [
  {
    id: 1,
    photographer: "John Doe",
    date: "2023-06-15",
    time: "14:00",
    location: "Central Park, New York",
    status: "Confirmed",
  },
  {
    id: 2,
    photographer: "Jane Smith",
    date: "2023-07-02",
    time: "10:00",
    location: "Golden Gate Bridge, San Francisco",
    status: "Pending",
  },
  {
    id: 3,
    photographer: "Mike Johnson",
    date: "2023-07-20",
    time: "16:30",
    location: "Eiffel Tower, Paris",
    status: "Confirmed",
  },
]

export function ClientBookings() {
  const [date, setDate] = React.useState(new Date())

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your scheduled photoshoots</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.map((booking) => (
              <div key={booking.id} className="mb-4 p-4 border rounded-lg">
                <h3 className="font-semibold">{booking.photographer}</h3>
                <p>{booking.date} at {booking.time}</p>
                <p>{booking.location}</p>
                <p className="mt-2">Status: <span className={`font-semibold ${booking.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>{booking.status}</span></p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button>Book New Session</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view or schedule bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

