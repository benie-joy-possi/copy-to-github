'use client';

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Plus, Eye, CreditCard as Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  customer_id: string;
  customer_name: string;
  organization_id: string;
  email: string;
  budget_id: string | null;
  litellm_budget_table: {
    soft_budget: number;
    hard_budget: number;
  } | null;
  blocked: boolean;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading customers
    setTimeout(() => {
      setCustomers([
        {
          id: "1",
          customer_id: "cust_001",
          customer_name: "Acme Corporation",
          organization_id: "org_001",
          email: "admin@acme.com",
          budget_id: "budget_001",
          litellm_budget_table: {
            soft_budget: 1000,
            hard_budget: 1500,
          },
          blocked: false,
        },
        {
          id: "2",
          customer_id: "cust_002",
          customer_name: "TechStart Inc",
          organization_id: "org_002",
          email: "contact@techstart.com",
          budget_id: "budget_002",
          litellm_budget_table: {
            soft_budget: 500,
            hard_budget: 750,
          },
          blocked: false,
        },
        {
          id: "3",
          customer_id: "cust_003",
          customer_name: "Global Solutions",
          organization_id: "org_003",
          email: "info@globalsolutions.com",
          budget_id: null,
          litellm_budget_table: null,
          blocked: true,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (customerId: string) => {
    setCustomers(customers.filter(c => c.id !== customerId));
    toast({
      title: "Customer deleted",
      description: "The customer has been successfully removed.",
    });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full bg-muted/10">
      <div className="flex h-16 items-center justify-between border-b border-border px-6">
        <h1 className="font-semibold text-foreground text-xl">Customers</h1>
        <div className="flex gap-2">
          <Button size="sm" asChild>
            <Link href="/admin/budgets/new">
              <Plus className="mr-2 h-4 w-4" />
              New Budget
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            Export
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Organization ID</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    {customer.customer_name}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {customer.organization_id}
                  </TableCell>
                  <TableCell>
                    {customer.litellm_budget_table ? (
                      <div className="space-y-1">
                        <div className="text-sm">
                          Soft: ${customer.litellm_budget_table.soft_budget}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Hard: ${customer.litellm_budget_table.hard_budget}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No budget</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.blocked ? "destructive" : "default"}>
                      {customer.blocked ? "Blocked" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/admin/customers/${customer.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;