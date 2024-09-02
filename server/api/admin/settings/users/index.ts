import axios from 'axios'
import { appConfig } from '~/utils/helpers'

export default defineEventHandler(async (event) => {
    try {
        // Extract pagination parameters from the query
        const query = getQuery(event)
        const page = query.page || 1
        const per_page = query.per_page || 5
        const search = query.search || ''

        // Fetch real user data from the API
        const response = await axios.get(appConfig.api.url(`/api/admin/settings/users`), {
            params: { page, per_page, search }
        })

        // Assuming the API response structure is similar to Laravel's paginated content
        const { data } = response

        console.log(data.results.fillable)

        return data.results
    } catch (error) {
        console.error('Failed to fetch user data:', error)
        return null
    }
})
