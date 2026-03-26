"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    store: "Amazon",
    price: 79.99,
    originalPrice: 129.99,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    store: "Best Buy",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Wireless Headphones Pro",
    store: "Walmart",
    price: 69.99,
    originalPrice: 99.99,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Bluetooth Headphones",
    store: "Target",
    price: 59.99,
    originalPrice: 79.99,
    image: "/placeholder.svg",
  },
]

export default function Page() {
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <span className="text-xl font-bold text-primary">PriceScan</span>
        </div>
      </header>

      {/* Hero Search */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-foreground">
            Compare Prices Instantly
          </h1>
          <p className="mb-8 text-muted-foreground">
            Search any product and find the best deals across stores.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for a product..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Results */}
      {showResults && (
        <section className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Results for &quot;{query}&quot;
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_PRODUCTS.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {product.store}
                  </Badge>
                  <h3 className="mb-2 text-sm font-medium text-foreground line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-6">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
          PriceScan - Simple Price Comparison
        </div>
      </footer>
    </div>
  )
}
