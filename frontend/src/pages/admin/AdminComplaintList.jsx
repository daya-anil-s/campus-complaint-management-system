import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  ButtonLink,
  DataTable,
  EmptyState,
  PageHeader,
  PageShell,
  StatusBadge,
  TableCard,
  TableHead,
  TableRow,
  Td,
  Th,
} from "../../components/ui";

function AdminComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/complaints"
      );

      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredComplaints = complaints.filter((complaint) => {
  const matchesSearch =
    complaint.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    complaint.category
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    complaint.description
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    complaint.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <PageShell>
      <PageHeader
        eyebrow="Admin"
        title="All Complaints"
        description="Review every submitted complaint and open a record to update its status."
        actions={
          <ButtonLink
            to="/admin/dashboard"
            variant="secondary"
          >
            Back to Dashboard
          </ButtonLink>
        }
      />

      <TableCard>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
  <input
    type="text"
    placeholder="🔍 Search complaints..."
    className="flex-1 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="rounded-lg border border-gray-300 p-2"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>
</div>
        {filteredComplaints.length === 0 ? (
          <EmptyState description="Submitted complaints will appear here." />
        ) : (
          <DataTable>
            <TableHead>
              <tr>
                <Th>Title</Th>
               <Th>Category</Th>
                <Th>Priority</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </tr>
            </TableHead>

            <tbody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint._id}>
                  <Td className="font-medium text-slate-900">
                    {complaint.title}
                  </Td>

                 <Td>{complaint.category}</Td>

<Td>
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      complaint.priority === "High"
        ? "bg-red-100 text-red-700"
        : complaint.priority === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {complaint.priority}
  </span>
</Td>

<Td>
  <StatusBadge status={complaint.status} />
</Td> 

                  <Td>
                   {new Date(complaint.createdAt).toLocaleDateString("en-GB")}
                  </Td>

                  <Td>
                    <Link
                      to={`/admin/update/${complaint._id}`}
                      className="font-semibold text-[#2563EB] no-underline hover:underline"
                    >
                      Update
                    </Link>
                  </Td>
                </TableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </TableCard>
    </PageShell>
  );
}

export default AdminComplaintList;