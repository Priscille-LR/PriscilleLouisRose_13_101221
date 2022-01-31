const api = 'http://localhost:3001/api/v1/user'

class UserService {

    async loginUser(username, password) {

        const body = {
            email: username,
            password: password
        }


        const request = `${api}/login`

        try {
            const response = await fetch(request, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json()
            console.log('success login user', data)

            return data
        } catch (error) {
            console.log('unable to get user token')
        }
    }


    async getUserProfile(token) {

        const request = `${api}/profile`

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


    async edituserName(token, firstName, lastName) {
        const request = `${api}/profile`

        const body = {
            firstName: firstName,
            lastName: lastName
        }


        try {
            const response = await fetch(request, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log('sucess edit user name')
            return data
        } catch (error) {
            console.log('unable to rename user')
        }



    }


}

export default UserService