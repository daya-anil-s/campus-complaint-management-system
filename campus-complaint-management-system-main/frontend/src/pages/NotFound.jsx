import { ButtonLink, Card, PageShell } from "../components/ui";

function NotFound() {
  return (
    <PageShell compact>
      <Card className="p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Page Not Found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
          The page you are looking for does not exist in this complaint management system.
        </p>
        <div className="mt-6">
          <ButtonLink to="/" variant="secondary">
            Back to Sign In
          </ButtonLink>
        </div>
      </Card>
    </PageShell>
  );
}

export default NotFound;
