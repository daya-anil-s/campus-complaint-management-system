import { Link } from "react-router-dom";
import { ButtonLink } from "../../components/ui";

function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4 font-circularxx relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pilot-gold/5 opacity-20 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="rounded-[var(--radius-cards)] border border-charcoal bg-graphite p-8 shadow-xl max-w-sm w-full text-center relative z-10 scale-in">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxxmono">
          Security Alert
        </p>
        <h1 className="mb-4 text-2xl font-light text-fog tracking-[-0.04em] font-whyte">Reset Password</h1>
        <p className="text-sm leading-relaxed text-pebble mb-6">
          Please contact the campus helpdesk or the system administrator to reset your account password.
        </p>
        <ButtonLink to="/login" variant="secondary" className="w-full">
          Back to Sign In
        </ButtonLink>
      </div>
    </div>
  );
}

export default ForgotPassword;