'use client'

import { createClient } from "@/lib/supabase/client"
import { useState, useRef, useEffect } from "react"
import { redirect } from 'next/navigation'

const Login = () => {
  const supabase = createClient()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    const checkForSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) redirect('/admin')
    }
    checkForSession()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email: 'admin@ufakpsi.com',
      password: password
    })

    if (error) {
      console.error(error)
      setPassword('')
      formRef.current?.reset()
    } else {
      redirect('/admin')
    }
  }

  return (
    <section className="relative top-16 w-full h-screen-minus-nav flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 justify-between font-crimson items-center border p-4 border-gray-400 rounded-xl w-90 h-56">
          <div className="text-center flex flex-col gap-1">
            <p className="text-3xl">Login</p>
            <p>If you're not a website admin, <a className='underline' href='/'>click here</a> to return to the main site.</p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
            <input onChange={handleChange} className='border border-gray-400 rounded-md h-8 pl-2 focus:outline-none' placeholder="Password" type="password"></input>
            <button type='submit' className="w-full h-8 rounded-md  bg-[#2e9a40] hover:bg-[#60d87a] transition-colors duration-200 border border-[#108a24] hover:cursor-pointer">Submit</button>
          </form>
        </div>
        <p className="font-crimson w-90 text-center">If there are any issues with this login, please <a className='underline' href='mailto:mateo.mcallister@ufl.edu'>send me an email</a> or text me.</p>
      </div>
    </section>
  )
}

export default Login