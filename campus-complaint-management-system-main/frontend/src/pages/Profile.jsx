import { Card, PageHeader, PageShell } from "../components/ui";
import { getCurrentUser, getRoleLabel } from "../utils/auth";

function Profile() {
  const user = getCurrentUser();
  const roleLabel = getRoleLabel(user?.role);

  return (
    <PageShell compact>
      <PageHeader
        eyebrow="Account"
        title="My Profile"
        description="Your current CCMS account information."
      />
      <Card className="p-6 sm:p-8">
        <dl className="space-y-5">
          <div>
            <dt className="text-sm font-semibold text-slate-500">Name</dt>
            <dd className="mt-1 text-base text-slate-950">{user?.name || roleLabel}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Email</dt>
            <dd className="mt-1 break-words text-base text-slate-950">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Role</dt>
            <dd className="mt-1 text-base text-slate-950">{roleLabel}</dd>
          </div>
        </dl>
      </Card>
    </PageShell>
  );
}

export default Profile;
