import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { data, loading, error }] = useMutation(LOGIN)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await login({
      variables: { email, password },
    })

    console.log(response)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <button onClick={handleSubmit}>Log in</button>
      </form>
    </div>
  )
}

export default Login
