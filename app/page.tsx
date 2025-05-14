"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { processPrompt } from "./actions"

export default function LanguageModelPlayground() {
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    try {
      const result = await processPrompt(prompt)
      setOutput(result)
    } catch (error) {
      setOutput("An error occurred while processing your request.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Language Model Playground</h1>
        <p className="text-muted-foreground">Enter your prompt below and see how the language model responds</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Enter your prompt here..."
          className="min-h-[120px] resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isLoading || !prompt.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Generate Response"
          )}
        </Button>
      </form>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Model Output</CardTitle>
            <CardDescription>The language model generated the following response:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">{output}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
