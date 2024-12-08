import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

const portfolioItems = [
  {
    id: 1,
    title: "Wedding Photography",
    description: "Capturing beautiful moments on your special day.",
    image: "https://source.unsplash.com/random/800x600/?wedding",
    likes: 245,
    views: 1200,
  },
  {
    id: 2,
    title: "Nature Landscapes",
    description: "Breathtaking views of natural wonders.",
    image: "https://source.unsplash.com/random/800x600/?landscape",
    likes: 189,
    views: 950,
  },
  {
    id: 3,
    title: "Urban Photography",
    description: "Exploring the beauty of city life.",
    image: "https://source.unsplash.com/random/800x600/?urban",
    likes: 132,
    views: 780,
  },
  {
    id: 4,
    title: "Portrait Photography",
    description: "Capturing personalities in stunning detail.",
    image: "https://source.unsplash.com/random/800x600/?portrait",
    likes: 298,
    views: 1500,
  },
]

export function PhotographerPortfolio() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">My Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                {item.likes} likes • {item.views} views
              </div>
              <Button variant="outline">Edit</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button className="mt-4">Add New Item</Button>
    </div>
  )
}
