import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "booked a photoshoot",
    date: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "updated their portfolio",
    date: "4 hours ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "left a review",
    date: "Yesterday",
  },
  {
    id: 4,
    user: "Sarah Williams",
    action: "registered as a new photographer",
    date: "2 days ago",
  },
  {
    id: 5,
    user: "David Brown",
    action: "completed a photoshoot",
    date: "3 days ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>You have {activities.length} new activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">{activity.date}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
