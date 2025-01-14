import { useState } from 'react'
import axios from 'axios'
import { nanoid } from '@/lib/chat.utils'
import useFetchSessionEvents from '@/lib/services/sessionService/use-fetch-session-events'

const BACKEND_URL = 'http://localhost:8000'

const useCreateSession = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [sessionId, setSessionId] = useState('')

    const createSession = async path => {
        setLoading(true)
        setError(null)
        const _id = nanoid()
        setSessionId(_id)
        try {
            const response = await axios.post(
                `${BACKEND_URL}/session?session=${encodeURIComponent(_id)}&path=${encodeURIComponent(path)}`,
                {}
            )
            setSessionId(response.data)
            return response.data
        } catch (err) {
            setError(err.message || 'Unknown error')
        }
        setLoading(false)
    }

    return { createSession, sessionId, loading, error }
}

export default useCreateSession
