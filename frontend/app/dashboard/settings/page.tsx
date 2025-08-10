"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Send } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>("/user-profile-photo.png") // Default photo

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Feedback Submitted!", {
      description: "Thank you for your valuable suggestions.",
    })
    // In a real app, you'd send this to a backend API
    console.log("Feedback submitted!")
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (1MB limit)
      if (file.size > 1 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload an image smaller than 1MB.",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string)
        toast.success("Profile photo updated!", {
          description: "Your new profile picture has been set.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-2">Manage your profile and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profilePhoto || undefined} alt="User Avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">HR</AvatarFallback>
            </Avatar>
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <Label htmlFor="profile-photo-upload" className="cursor-pointer">
              <Button asChild variant="outline">
                <span>
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </span>
              </Button>
            </Label>
            <p className="text-sm text-muted-foreground text-center">
              Upload a new profile picture. Max file size 1MB.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback & Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts, suggestions, or report an issue..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
