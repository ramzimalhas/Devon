import { useState } from 'react'
import axios from 'axios'

// Send over user response

const BACKEND_URL = 'http://localhost:8000'

const useCreateResponse = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [responseData, setResponseData] = useState(null)

    const createResponse = async (sessionId, response) => {
        setLoading(true)
        setError(null)
        try {
            const result = await axios.post(
                `${BACKEND_URL}/session/${encodeURIComponent(sessionId)}/response?response=${encodeURIComponent(response)}`
            )
            setResponseData(result.data)
            return result.data
        } catch (error) {
            setError(
                error.response
                    ? error.response.data
                    : 'An unknown error occurred'
            )
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        createResponse,
        responseData,
        loading,
        error,
    }
}

export default useCreateResponse
