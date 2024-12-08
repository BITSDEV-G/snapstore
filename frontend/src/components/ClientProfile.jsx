import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function ClientProfile() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">My Profile</h2>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Your phone number" type="tel" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Set your photography preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="preferred-style">Preferred Photography Style</Label>
                <Input id="preferred-style" placeholder="e.g., Modern, Classic, Candid" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="preferred-events">Preferred Event Types</Label>
                <Input id="preferred-events" placeholder="e.g., Weddings, Portraits, Corporate" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Update Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
