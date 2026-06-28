import { useEffect, useState } from "react";
import api from "../../services/api";
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

import { SkeletonTable } from "../../components/SkeletonLoader";
import AdminUpdateModal from "../../components/AdminUpdateModal";

function AdminComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
            className="hover:scale-102 transition"
          >
            Back to Dashboard
          </ButtonLink>
        }
      />

      <TableCard>
        {/* Filter Toolbar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row p-4 bg-slate-50/50 border-b border-slate-100 rounded-t-2xl">
          <input
            type="text"
            placeholder="🔍 Search complaints..."
            className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 text-sm outline-none focus:border-blue-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 transition cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {isLoading ? (
          <div className="p-4">
            <SkeletonTable rows={6} cols={6} />
          </div>
        ) : filteredComplaints.length === 0 ? (
          <EmptyState 
            message="No complaints match this filter." 
            description="Submitted complaints will appear here." 
          />
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
                  <Td className="font-semibold text-slate-900">
                    {complaint.title}
                  </Td>

                  <Td>{complaint.category}</Td>

                  <Td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        complaint.priority === "High"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : complaint.priority === "Medium"
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}
                    >
                      {complaint.priority}
                    </span>
                  </Td>

                  <Td>
                    <StatusBadge status={complaint.status} />
                  </Td> 

                  <Td className="text-slate-500 font-medium">
                    {new Date(complaint.createdAt).toLocaleDateString("en-GB")}
                  </Td>

                  <Td>
                    <button
                      onClick={() => setSelectedComplaintId(complaint._id)}
                      className="font-bold text-[#2563EB] hover:text-blue-700 hover:underline transition cursor-pointer"
                    >
                      Update
                    </button>
                  </Td>
                </TableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </TableCard>

      {/* OVERLAY UPDATE MODAL */}
      {selectedComplaintId && (
        <AdminUpdateModal
          complaintId={selectedComplaintId}
          onClose={() => setSelectedComplaintId(null)}
          onUpdateSuccess={fetchComplaints}
        />
      )}
    </PageShell>
  );
}

export default AdminComplaintList;