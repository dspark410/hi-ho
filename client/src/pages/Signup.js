import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNUP } from '../graphql/mutations'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signup, { data, loading, error }] = useMutation(SIGNUP)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await signup({
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
        <button onClick={handleSubmit}>Sign up</button>
      </form>
    </div>
  )
}

export default Signup
