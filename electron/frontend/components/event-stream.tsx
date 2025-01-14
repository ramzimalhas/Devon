import React, { useEffect, useState } from 'react'

const EventStream = ({ sessionId }) => {
    const [events, setEvents] = useState<any>([])

    useEffect(() => {
        const eventSource = new EventSource(
            `http://localhost:8000/session/${sessionId}/events/stream`
        )

        eventSource.onmessage = event => {
            const newEvent = JSON.parse(event.data)
            setEvents(prevEvents => [...prevEvents, newEvent])
        }

        eventSource.onerror = error => {
            console.error('EventSource failed:', error)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [sessionId])

    return (
        <div>
            <h1>Session Events</h1>
            <ul>
                {events.map((evt: any, index) => (
                    <li key={index}>{evt.content}</li>
                ))}
            </ul>
        </div>
    )
}

export default EventStream
