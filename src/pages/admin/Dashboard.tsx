import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, DollarSign, CreditCard, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Customers",
      value: "1,234",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+12%",
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      change: "+8%",
    },
    {
      title: "Active Budgets",
      value: "89",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
      change: "+3%",
    },
    {
      title: "API Usage",
      value: "2.4M",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      change: "+24%",
    },
  ];

  return (
    <AdminLayout>
      <div className="h-full bg-muted/10">
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <h1 className="font-semibold text-foreground text-xl">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/budgets/new">New Budget</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/admin/customers">View Customers</Link>
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest customer and budget activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New customer registered</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Budget limit updated</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Invoice generated</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/customers/new">Add New Customer</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/budgets/new">Create Budget</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/invoices">Generate Invoice</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/settings">Configure Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;