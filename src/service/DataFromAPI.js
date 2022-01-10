class DataFromAPI {

    async login(username, password) {

        const body = {
            email: username,
            password
        }


        const request = 'http://localhost:3001/api/v1/user/login'

        try {
            const response = await fetch(request, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json()
            console.log('success', data)

            const token = data.body.token
            return token
        } catch (error) {
            console.log('unable to get user token')
        }
    }

}

export default DataFromAPI