"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRobot, setIsRobot] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    console.log("Email:", email)
    console.log("Password:", password)
    // Add your login logic here
  }

  return (
    <div className="min-h-screen flex">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg-login.png" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex w-full">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <Card className="w-full max-w-md bg-white shadow-xl">
            <CardContent className="p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-green-700 flex items-center justify-center shadow-lg">
                  <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">U</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-green-700 mb-2">JDIH UNIZAR</h1>
                <p className="text-sm text-gray-600">Jaringan Dokumentasi dan Informasi Hukum</p>
              </div>

              {/* Login Form */}
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />

                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />

                <Button
                  onClick={handleLogin}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition-colors"
                >
                  LOGIN
                </Button>

                {/* reCAPTCHA */}
                <div className="flex items-center space-x-2 justify-center">
                  <Checkbox id="robot" checked={isRobot} onCheckedChange={setIsRobot} />
                  <label htmlFor="robot" className="text-sm text-gray-600">
                    {"I'm not a robot"}
                  </label>
                </div>

                {/* Sign Up Link */}
                <div className="text-center text-sm text-gray-600">
                  {"Don't have account? "}
                  <a href="/register" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                    Sign Up
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Illustration (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <div className="relative w-full h-full max-w-lg">
            {/* Placeholder for illustration - you can replace with your actual illustration */}
            <div className="w-full h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Welcome to JDIH</h3>
                <p className="text-green-100">Your legal documentation portal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
