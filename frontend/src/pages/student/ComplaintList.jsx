import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";import {
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

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
useEffect(() => {
  const fetchComplaints = async () => {
    try {
const res = await api.get("/complaints/my");      setComplaints(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchComplaints();
}, []);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this complaint?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/complaints/${id}`);

    setComplaints((prev) =>
      prev.filter((complaint) => complaint._id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <PageShell>
      <PageHeader
        eyebrow="Student"
        title="My Complaints"
        description="Review your submitted complaints and open any record for more detail."
        actions={
          <ButtonLink to="/student/dashboard" variant="secondary">
            Back to Dashboard
          </ButtonLink>
        }
      />

      <TableCard>
        {complaints.length === 0 ? (
          <EmptyState description="Submit your first complaint to get started." />
        ) : (
        <DataTable>
          <TableHead>
            <tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </tr>
          </TableHead>
          <tbody>
            {complaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <Td className="font-medium text-slate-900">{complaint.title}</Td>
                <Td>{complaint.category}</Td>
                <Td>
                  <StatusBadge status={complaint.status} />
                </Td>
                <Td>
  {new Date(complaint.createdAt).toLocaleDateString()}
</Td>
               <Td>
  <div className="flex items-center gap-4">
    <Link
      to={`/student/complaint/${complaint._id}`}
      className="font-semibold text-blue-600 hover:underline"
    >
      View
    </Link>

    <Link
      to={`/student/edit-complaint/${complaint._id}`}
      className="font-semibold text-green-600 hover:underline"
    >
      Edit
    </Link>

    <button
      type="button"
      onClick={() => handleDelete(complaint._id)}
      className="font-semibold text-red-600 hover:underline"
    >
      Delete
    </button>
  </div>
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

export default ComplaintList;
