import {useState, useCallback} from  'react'

// interface useHttpType {
//     loading: boolean,
//     request: () => void,
//     error: string,
//     clearError: () => void
// }

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback( async (url :string, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            };

            setLoading(true);
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Something went wrong')
            }

            setLoading(false);
            return data;
        } catch (err) {
            setLoading(false);
            setError(err.message);
            throw err;
        }
    }, []);

    const clearError = useCallback(() => setError(null), [])

    return {
        loading,
        request,
        error,
        clearError
    }
};