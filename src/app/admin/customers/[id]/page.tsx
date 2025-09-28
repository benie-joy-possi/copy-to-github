'use client';

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const [editedCustomer, setEditedCustomer] = useState<any>(null);

  useEffect(() => {
    // Simulate loading customer details
    setTimeout(() => {
      const mockCustomer = {
        id: params.id,
        customer_id: "cust_001",
        customer_name: "Acme Corporation",
        organization_id: "org_001",
        email: "admin@acme.com",
        budget_id: "budget_001",
        api_base: "https://api.litellm.ai",
        litellm_budget_table: {
          soft_budget: 1000,
          hard_budget: 1500,
          max_budget: 2000,
        },
        blocked: false,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-03-20T14:30:00Z",
      };
      setCustomer(mockCustomer);
      setEditedCustomer(mockCustomer);
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleSave = () => {
    setCustomer(editedCustomer);
    setIsEditing(false);
    toast({
      title: "Customer updated",
      description: "The customer details have been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <p>Customer not found</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-muted/10">
      <div className="flex h-16 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/customers")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="font-semibold text-foreground text-xl">
            Customer Details
          </h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Customer
            </Button>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Core customer details and identifiers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Customer Name</Label>
                {isEditing ? (
                  <Input
                    value={editedCustomer.customer_name}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        customer_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{customer.customer_name}</p>
                )}
              </div>
              <div>
                <Label>Email</Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedCustomer.email}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{customer.email}</p>
                )}
              </div>
              <div>
                <Label>Customer ID</Label>
                <p className="text-sm font-mono">{customer.customer_id}</p>
              </div>
              <div>
                <Label>Organization ID</Label>
                <p className="text-sm font-mono">{customer.organization_id}</p>
              </div>
              <div>
                <Label>Status</Label>
                <div className="mt-1">
                  <Badge variant={customer.blocked ? "destructive" : "default"}>
                    {customer.blocked ? "Blocked" : "Active"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Information</CardTitle>
              <CardDescription>
                Budget limits and usage configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {customer.litellm_budget_table ? (
                <>
                  <div>
                    <Label>Soft Budget</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedCustomer.litellm_budget_table.soft_budget}
                        onChange={(e) =>
                          setEditedCustomer({
                            ...editedCustomer,
                            litellm_budget_table: {
                              ...editedCustomer.litellm_budget_table,
                              soft_budget: Number(e.target.value),
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">
                        ${customer.litellm_budget_table.soft_budget}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Hard Budget</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedCustomer.litellm_budget_table.hard_budget}
                        onChange={(e) =>
                          setEditedCustomer({
                            ...editedCustomer,
                            litellm_budget_table: {
                              ...editedCustomer.litellm_budget_table,
                              hard_budget: Number(e.target.value),
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">
                        ${customer.litellm_budget_table.hard_budget}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Maximum Budget</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedCustomer.litellm_budget_table.max_budget}
                        onChange={(e) =>
                          setEditedCustomer({
                            ...editedCustomer,
                            litellm_budget_table: {
                              ...editedCustomer.litellm_budget_table,
                              max_budget: Number(e.target.value),
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">
                        ${customer.litellm_budget_table.max_budget}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Budget ID</Label>
                    <p className="text-sm font-mono">{customer.budget_id}</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">No budget configured</p>
                  <Button asChild>
                    <Link href="/admin/budgets/new">Create Budget</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                API endpoint and integration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>API Base URL</Label>
                {isEditing ? (
                  <Input
                    value={editedCustomer.api_base}
                    onChange={(e) =>
                      setEditedCustomer({
                        ...editedCustomer,
                        api_base: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-sm font-mono">{customer.api_base}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
              <CardDescription>
                Creation and modification dates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Created At</Label>
                <p className="text-sm">
                  {new Date(customer.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <Label>Updated At</Label>
                <p className="text-sm">
                  {new Date(customer.updated_at).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;