import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewBudget = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    organization_id: "",
    soft_budget: "",
    hard_budget: "",
    max_budget: "",
    api_base: "https://api.litellm.ai",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the data to your API
    toast({
      title: "Budget created",
      description: "The new budget has been successfully created.",
    });
    
    navigate("/admin/customers");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AdminLayout>
      <div className="h-full bg-muted/10">
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/customers")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="font-semibold text-foreground text-xl">
              Create New Budget
            </h1>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                  <CardDescription>
                    Enter the customer details for this budget
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">Customer Name *</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      required
                      placeholder="Acme Corporation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="organization_id">Organization ID</Label>
                    <Input
                      id="organization_id"
                      name="organization_id"
                      value={formData.organization_id}
                      onChange={handleChange}
                      placeholder="org_001"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Limits</CardTitle>
                  <CardDescription>
                    Set the budget thresholds for this customer
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="soft_budget">Soft Budget ($) *</Label>
                    <Input
                      id="soft_budget"
                      name="soft_budget"
                      type="number"
                      value={formData.soft_budget}
                      onChange={handleChange}
                      required
                      placeholder="1000"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground">
                      Warning threshold
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hard_budget">Hard Budget ($) *</Label>
                    <Input
                      id="hard_budget"
                      name="hard_budget"
                      type="number"
                      value={formData.hard_budget}
                      onChange={handleChange}
                      required
                      placeholder="1500"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground">
                      Service limit
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_budget">Max Budget ($)</Label>
                    <Input
                      id="max_budget"
                      name="max_budget"
                      type="number"
                      value={formData.max_budget}
                      onChange={handleChange}
                      placeholder="2000"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground">
                      Absolute maximum
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>
                    Configure API endpoint settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="api_base">API Base URL</Label>
                    <Input
                      id="api_base"
                      name="api_base"
                      value={formData.api_base}
                      onChange={handleChange}
                      placeholder="https://api.litellm.ai"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                  <CardDescription>
                    Any additional information about this budget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any notes or special instructions..."
                    rows={4}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/customers")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Budget
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewBudget;