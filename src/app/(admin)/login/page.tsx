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
      return
    } else {
      redirect('/admin')
    }
  }

  return (
    <section className="relative top-16 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl min-h-[calc(100vh-4rem)] flex justify-center items-center py-8">
      <div className="flex flex-col gap-4 items-center w-full max-w-sm">
        <div className="flex flex-col gap-4 justify-between font-crimson items-center border p-4 border-neutral-300 rounded-lg w-full h-auto min-h-56 bg-white">
          <div className="text-center flex flex-col gap-1">
            <p className="text-3xl font-semibold">Login</p>
            <p className="text-base">If you&apos;re not a website admin, <a className='underline' href='/'>click here</a> to return to the main site.</p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
            <input onChange={handleChange} className='border border-neutral-300 rounded-md h-9 pl-2 focus:outline-none text-base' placeholder="Password" type="password"></input>
            <button type='submit' className="w-full h-9 rounded-md bg-[#2e9a40] hover:bg-[#60d87a] transition-colors duration-200 border border-[#108a24] hover:cursor-pointer text-white font-sans text-sm font-semibold">Submit</button>
          </form>
        </div>
        <p className="font-crimson w-full text-center text-sm sm:text-base px-2">If there are any issues with this login, please <a className='underline' href='mailto:mateo.mcallister@ufl.edu'>send me an email</a> or text me.</p>
      </div>
    </section>
  )
}

export default Login