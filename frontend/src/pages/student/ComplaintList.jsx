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
                  <Link
                   to={`/student/complaint/${complaint._id}`}
                    className="font-semibold text-[#2563EB] no-underline hover:underline"
                  >
                    View Details
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

export default ComplaintList;
