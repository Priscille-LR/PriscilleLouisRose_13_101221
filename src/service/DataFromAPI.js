class DataFromAPI {

    async loginUser(username, password) {

        const body = {
            email: username,
            password: password
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

            //const token = data.body.token
            return data
        } catch (error) {
            console.log('unable to get user token')
        }
    }


    async getUserProfile(token) {

        const request = 'http://localhost:3001/api/v1/user/profile'

        try {
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log('success getUserProfile', data)
            return data
        } catch (error) {
            console.log('unable to get user token')
        }

    }


}

export default DataFromAPI