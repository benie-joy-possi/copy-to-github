'use client';

import { useParams } from "next/navigation";
import CustomerDetail from "../page";

// This page uses the same component as the detail page
// The edit functionality is handled within the CustomerDetail component
export default function EditCustomer() {
  return <CustomerDetail />;
}