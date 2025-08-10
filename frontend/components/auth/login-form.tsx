"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login } from "@/lib/slices/authSlice"
import { Eye, EyeOff, LogIn, Info } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock authentication - replace with real API call
    setTimeout(() => {
      dispatch(
        login({
          user: {
            id: "1",
            name: "HR Admin",
            email: email,
            role: "admin",
          },
          token: "mock-jwt-token",
        }),
      )
      router.push("/dashboard")
      setLoading(false)
    }, 1000)
  }

  const fillDemoCredentials = () => {
    setEmail("admin@company.com")
    setPassword("admin123")
  }

  return (
    <div className="space-y-6">
      <Card className="w-full border-border shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold text-primary">Sign In</CardTitle>
          <p className="text-center text-sm text-muted-foreground">Access your HR dashboard</p>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 border-accent bg-accent/20 text-accent-foreground">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground">
              <div className="space-y-2">
                <p className="font-medium">Demo Credentials:</p>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Email:</strong> admin@company.com
                  </p>
                  <p>
                    <strong>Password:</strong> admin123
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillDemoCredentials}
                  className="mt-2 border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                >
                  Use Demo Credentials
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-input focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-input focus:border-primary focus:ring-primary pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
