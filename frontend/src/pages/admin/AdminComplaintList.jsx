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
        <div className="flex flex-col gap-4 md:flex-row p-4 bg-charcoal/40 border-b border-charcoal/40 rounded-t-[var(--radius-cards)] font-circularxx">
          <input
            type="text"
            placeholder="Search complaints..."
            className="flex-1 rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal px-4 py-2.5 text-sm text-fog outline-none focus:border-slate transition placeholder:text-stone/70"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal px-4 py-2.5 text-sm font-normal text-fog outline-none focus:border-slate transition cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All" className="bg-graphite text-fog">All Status</option>
            <option value="Pending" className="bg-graphite text-fog">Pending</option>
            <option value="In Progress" className="bg-graphite text-fog">In Progress</option>
            <option value="Resolved" className="bg-graphite text-fog">Resolved</option>
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
                  <Td className="font-semibold text-fog font-circularxx">
                    {complaint.title}
                  </Td>

                  <Td className="font-circularxx">{complaint.category}</Td>

                  <Td>
                    <span
                      className={`inline-flex rounded-[var(--radius-badges)] border border-charcoal bg-charcoal px-3 py-1 text-[10px] font-circularxxmono tracking-[0.05em] font-normal ${
                        complaint.priority === "High"
                          ? "text-signal-red"
                          : complaint.priority === "Medium"
                          ? "text-pilot-gold"
                          : "text-pebble"
                      }`}
                    >
                      {complaint.priority}
                    </span>
                  </Td>

                  <Td>
                    <StatusBadge status={complaint.status} />
                  </Td> 

                  <Td className="font-circularxxmono text-xs text-pebble">
                    {new Date(complaint.createdAt).toLocaleDateString("en-GB")}
                  </Td>

                  <Td>
                    <button
                      onClick={() => setSelectedComplaintId(complaint._id)}
                      className="font-semibold text-pilot-gold hover:underline transition cursor-pointer bg-transparent border-0 p-0 font-circularxxmono text-xs tracking-wide"
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