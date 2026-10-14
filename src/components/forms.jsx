"use client";

import Link from "next/link";
import { useState } from "react";
import { CircleCheck, Eye, EyeOff, Send } from "lucide-react";

// None of these forms are wired to the backend yet. Each submit handler marks
// where the production endpoint call goes.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function useForm(prefix, initial, validate) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done

  const bind = (key) => ({
    id: `${prefix}-${key}`,
    name: key,
    value: values[key],
    onChange: (e) => {
      const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setValues((s) => ({ ...s, [key]: v }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby": errors[key] ? `${prefix}-${key}-error` : undefined,
  });

  const submit = (action) => async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${prefix}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    await action(values);
    setStatus("done");
  };

  return { values, setValues, errors, status, setStatus, bind, submit };
}

export function Field({ id, label, required, optional, error, aside, children }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-1 text-down" aria-hidden="true">*</span>}
        </label>
        {optional && <span className="text-xs text-faint">Optional</span>}
        {aside}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-down">
          {error}
        </p>
      )}
    </div>
  );
}

function Done({ title, children, action }) {
  return (
    <div role="status" className="flex flex-col items-start gap-4 py-8">
      <CircleCheck className="size-10 text-up" aria-hidden="true" />
      <p className="font-display text-2xl font-bold text-green">{title}</p>
      <div className="max-w-md text-muted">{children}</div>
      {action}
    </div>
  );
}

function Submit({ status, idle, busy, icon = true, className = "" }) {
  return (
    <button type="submit" disabled={status === "sending"} className={`btn-primary px-6 py-3 text-[0.9375rem] disabled:opacity-70 ${className}`}>
      {status === "sending" ? busy : idle}
      {icon && <Send className="size-4" aria-hidden="true" />}
    </button>
  );
}

// ---------------- Contact ----------------
export function ContactForm() {
  const empty = { name: "", email: "", subject: "", message: "" };
  const f = useForm("contact", empty, (v) => {
    const e = {};
    if (!v.name.trim()) e.name = "Enter your full name.";
    if (!EMAIL.test(v.email.trim())) e.email = "Enter an email address like you@example.com.";
    if (v.message.trim().length < 10) e.message = "Write a message of at least 10 characters.";
    return e;
  });

  if (f.status === "done") {
    return (
      <Done
        title="Message sent"
        action={
          <button type="button" className="btn-glass mt-2 px-5 py-2.5 text-sm" onClick={() => (f.setValues(empty), f.setStatus("idle"))}>
            Send another message
          </button>
        }
      >
        Thanks, {f.values.name.split(" ")[0]}. We&apos;ll reply to {f.values.email} within 1–2 business days.
      </Done>
    );
  }

  return (
    <form noValidate onSubmit={f.submit(() => wait(700) /* TODO: POST to the contact endpoint */)} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" required error={f.errors.name}>
          <input autoComplete="name" placeholder="Jane Trader" className="field" {...f.bind("name")} />
        </Field>
        <Field id="contact-email" label="Email address" required error={f.errors.email}>
          <input type="email" autoComplete="email" placeholder="you@example.com" className="field" {...f.bind("email")} />
        </Field>
      </div>
      <Field id="contact-subject" label="Subject" optional>
        <input placeholder="What's this about?" className="field" {...f.bind("subject")} />
      </Field>
      <Field id="contact-message" label="Message" required error={f.errors.message}>
        <textarea rows={5} placeholder="Tell us how we can help: courses, partnerships, mentoring, anything." className="field resize-y" {...f.bind("message")} />
      </Field>
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-faint">By submitting, you agree we may contact you about your enquiry.</p>
        <Submit status={f.status} idle="Send message" busy="Sending…" />
      </div>
    </form>
  );
}

// ---------------- Advertise ----------------
export function AdvertiseForm({ placements }) {
  const empty = { name: "", email: "", company: "", website: "", budget: "", message: "", ...Object.fromEntries(placements.map((p) => [p.key, false])) };
  const f = useForm("ad", empty, (v) => {
    const e = {};
    if (!v.name.trim()) e.name = "Enter your full name.";
    if (!EMAIL.test(v.email.trim())) e.email = "Enter an email address like you@example.com.";
    if (v.message.trim().length < 10) e.message = "Tell us a little about your campaign (at least 10 characters).";
    return e;
  });

  if (f.status === "done") {
    return (
      <Done title="Enquiry sent">
        Thanks, {f.values.name.split(" ")[0]}. We&apos;ll come back to {f.values.email} with placement availability and a custom rate card.
      </Done>
    );
  }

  return (
    <form noValidate onSubmit={f.submit(() => wait(700) /* TODO: POST to the advertising enquiry endpoint */)} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ad-name" label="Full name" required error={f.errors.name}>
          <input autoComplete="name" className="field" {...f.bind("name")} />
        </Field>
        <Field id="ad-email" label="Email address" required error={f.errors.email}>
          <input type="email" autoComplete="email" className="field" {...f.bind("email")} />
        </Field>
        <Field id="ad-company" label="Company" optional>
          <input autoComplete="organization" className="field" {...f.bind("company")} />
        </Field>
        <Field id="ad-website" label="Website" optional>
          <input type="url" inputMode="url" placeholder="https://" className="field" {...f.bind("website")} />
        </Field>
      </div>
      <Field id="ad-budget" label="Monthly budget" optional>
        <input placeholder="e.g. $2,000" className="field" {...f.bind("budget")} />
      </Field>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Placements of interest <span className="text-xs font-normal text-faint">Optional</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {placements.map((p) => {
            const b = f.bind(p.key);
            return (
              <label key={p.key} className="cursor-pointer">
                <input type="checkbox" className="peer sr-only" id={b.id} name={b.name} checked={f.values[p.key]} onChange={b.onChange} />
                <span className="inline-flex rounded-full border border-line bg-white/70 px-3.5 py-2 text-sm font-medium text-muted transition-colors peer-checked:border-green peer-checked:bg-green peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green">
                  {p.name}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <Field id="ad-message" label="Message" required error={f.errors.message}>
        <textarea rows={4} placeholder="Your goals, audience, dates and creative formats." className="field resize-y" {...f.bind("message")} />
      </Field>
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-faint">By submitting, you agree we may contact you about your enquiry.</p>
        <Submit status={f.status} idle="Send enquiry" busy="Sending…" />
      </div>
    </form>
  );
}

// ---------------- Account ----------------
function Legal() {
  return (
    <p className="mt-8 text-center text-xs text-faint">
      By continuing you agree to Academiya&apos;s{" "}
      <Link href="/terms" className="underline hover:text-green">
        Terms
      </Link>{" "}
      &amp;{" "}
      <Link href="/privacy" className="underline hover:text-green">
        Privacy Policy
      </Link>
      .
    </p>
  );
}

function PasswordInput(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? "text" : "password"} className="field pr-12" {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-green-50 hover:text-green"
      >
        {show ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
      </button>
    </div>
  );
}

export function LoginForm() {
  const f = useForm("login", { email: "", password: "" }, (v) => {
    const e = {};
    if (!EMAIL.test(v.email.trim())) e.email = "Enter the email address you signed up with.";
    if (!v.password) e.password = "Enter your password.";
    return e;
  });
  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight text-green">Welcome back</h1>
      <p className="mt-2 text-muted">Log in to pick up where you left off.</p>
      <form noValidate onSubmit={f.submit(() => wait(700) /* TODO: authenticate */)} className="mt-8 grid gap-5">
        <Field id="login-email" label="Email address" error={f.errors.email}>
          <input type="email" autoComplete="email" placeholder="you@example.com" className="field" {...f.bind("email")} />
        </Field>
        <Field
          id="login-password"
          label="Password"
          error={f.errors.password}
          aside={
            <Link href="/forgot-password" className="link-quiet text-sm">
              Forgot password?
            </Link>
          }
        >
          <PasswordInput autoComplete="current-password" {...f.bind("password")} />
        </Field>
        {f.status === "done" && (
          <p role="status" className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green">
            Sign-in isn&apos;t connected in this preview yet.
          </p>
        )}
        <Submit status={f.status} idle="Log in" busy="Logging in…" icon={false} className="w-full py-3.5" />
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        New to Academiya?{" "}
        <Link href="/signup" className="link-quiet">
          Create an account
        </Link>
      </p>
      <Legal />
    </>
  );
}

const steps = ["Account", "Verify", "Secure"];

export function SignupForm() {
  const [step, setStep] = useState(0);
  const f = useForm("signup", { first: "", last: "", email: "", phone: "", code: "", password: "" }, (v) => {
    const e = {};
    if (step === 0) {
      if (!v.first.trim()) e.first = "Enter your first name.";
      if (!v.last.trim()) e.last = "Enter your last name.";
      if (!EMAIL.test(v.email.trim())) e.email = "Enter an email address like you@example.com.";
    }
    if (step === 1 && !/^\d{6}$/.test(v.code.trim())) e.code = "Enter the 6-digit code from your email.";
    if (step === 2 && v.password.length < 8) e.password = "Use at least 8 characters.";
    return e;
  });

  const advance = async () => {
    await wait(500); // TODO: create account / verify code / set password
    if (step < 2) {
      setStep((s) => s + 1);
      f.setStatus("idle");
    }
  };

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight text-green">Create your account</h1>
      <p className="mt-2 text-muted">Start in minutes — verify your email, set a password, and you&apos;re in.</p>

      <ol className="mt-7 grid grid-cols-3 gap-2" aria-label="Sign-up progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className="grid gap-2">
            <span className={`h-1.5 rounded-full ${i <= step ? "bg-green" : "bg-line"}`} />
            <span className={`text-xs font-semibold ${i <= step ? "text-green" : "text-faint"}`}>
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      {f.status === "done" && step === 2 ? (
        <Done title="You're in" action={<Link href="/courses" className="btn-primary px-5 py-3 text-sm">Browse courses</Link>}>
          Your account is ready. Sign-up isn&apos;t connected to the live platform in this preview.
        </Done>
      ) : (
        <form noValidate onSubmit={f.submit(advance)} className="mt-7 grid gap-5">
          {step === 0 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="signup-first" label="First name" error={f.errors.first}>
                  <input autoComplete="given-name" className="field" {...f.bind("first")} />
                </Field>
                <Field id="signup-last" label="Last name" error={f.errors.last}>
                  <input autoComplete="family-name" className="field" {...f.bind("last")} />
                </Field>
              </div>
              <Field id="signup-email" label="Email address" error={f.errors.email}>
                <input type="email" autoComplete="email" placeholder="you@example.com" className="field" {...f.bind("email")} />
              </Field>
              <Field id="signup-phone" label="Phone" optional>
                <input type="tel" autoComplete="tel" placeholder="+91" className="field" {...f.bind("phone")} />
              </Field>
            </>
          )}
          {step === 1 && (
            <Field id="signup-code" label={`Enter the code we sent to ${f.values.email}`} error={f.errors.code}>
              <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="000000" className="field tabular text-center text-2xl tracking-[0.5em]" {...f.bind("code")} />
            </Field>
          )}
          {step === 2 && (
            <Field id="signup-password" label="Create a password" error={f.errors.password}>
              <PasswordInput autoComplete="new-password" {...f.bind("password")} />
            </Field>
          )}
          <Submit status={f.status} idle={["Create account", "Verify email", "Set password"][step]} busy="Please wait…" icon={false} className="w-full py-3.5" />
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="text-sm text-muted hover:text-green">
              Back
            </button>
          )}
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="link-quiet">
          Log in
        </Link>
      </p>
      <Legal />
    </>
  );
}

export function ForgotForm() {
  const f = useForm("forgot", { email: "" }, (v) => (EMAIL.test(v.email.trim()) ? {} : { email: "Enter the email address on your account." }));
  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight text-green">Forgot your password?</h1>
      <p className="mt-2 text-muted">Enter your email and we&apos;ll send you a link to reset it.</p>
      {f.status === "done" ? (
        <Done title="Check your inbox">
          If an account exists for {f.values.email}, a reset link is on its way. It works once and expires soon.
        </Done>
      ) : (
        <form noValidate onSubmit={f.submit(() => wait(700) /* TODO: request reset link */)} className="mt-8 grid gap-5">
          <Field id="forgot-email" label="Email address" error={f.errors.email}>
            <input type="email" autoComplete="email" placeholder="you@example.com" className="field" {...f.bind("email")} />
          </Field>
          <Submit status={f.status} idle="Send reset link" busy="Sending…" icon={false} className="w-full py-3.5" />
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="link-quiet">
          Back to log in
        </Link>
      </p>
      <Legal />
    </>
  );
}
