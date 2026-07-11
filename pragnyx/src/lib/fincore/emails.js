import { sendEmail } from "@/lib/email";

const BRAND = { primary: "#4640d6", primaryLight: "#7b7ff2", name: "PragnyX FinCore" };
const FROM = process.env.FINCORE_EMAIL_FROM || "PragnyX FinCore <onboarding@pragnyx.in>";

function formatINR(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

/** Shared shell so every FinCore email looks like it came from the same product. */
function layout({ preheader = "", heading, bodyHtml, ctaLabel, ctaUrl }) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f5fb;font-family:Segoe UI,Helvetica,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:#f4f5fb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">
            <tr>
              <td style="background:linear-gradient(120deg, ${BRAND.primary}, ${BRAND.primaryLight});padding:28px 32px;">
                <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:0.2px;">PragnyX <span style="font-weight:400;opacity:0.85;">FinCore</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;font-size:20px;color:#111;">${heading}</h1>
                <div style="font-size:14.5px;line-height:1.65;color:#333;">${bodyHtml}</div>
                ${ctaUrl ? `<div style="margin-top:28px;"><a href="${ctaUrl}" style="background:${BRAND.primary};color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-size:14px;font-weight:600;display:inline-block;">${ctaLabel}</a></div>` : ""}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #eee;">
                <span style="font-size:12px;color:#999;">PragnyX FinCore · This is an automated message, please don't reply directly to this email.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Sent once, right after a workspace is provisioned. */
export async function sendWelcomeEmail(workspace) {
  const { companyId, workspaceUrl, tenantId, licenseId, admin } = workspace;
  const loginUrl = `${workspaceUrl}/fincore/login?workspace=${encodeURIComponent(companyId)}`;

  const html = layout({
    preheader: `Your FinCore workspace ${companyId} is ready`,
    heading: "Your workspace is ready 🎉",
    bodyHtml: `
      <p>Hi ${admin?.email ? "there" : ""},</p>
      <p>Your PragnyX FinCore workspace has been provisioned. Here are your details:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
        <tr><td style="padding:6px 0;color:#777;">Workspace URL</td><td style="padding:6px 0;font-weight:600;">${companyId}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">License ID</td><td style="padding:6px 0;font-weight:600;">${licenseId}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Tenant ID</td><td style="padding:6px 0;font-weight:600;">${tenantId}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Admin email</td><td style="padding:6px 0;font-weight:600;">${admin?.email || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Temporary password</td><td style="padding:6px 0;font-weight:600;">${admin?.tempPassword || "—"}</td></tr>
      </table>
      <p>You'll be asked to set a permanent password the first time you log in.</p>
    `,
    ctaLabel: "Log in now",
    ctaUrl: loginUrl,
  });

  const text = `Your PragnyX FinCore workspace is ready.

Workspace URL: ${companyId}
License ID: ${licenseId}
Tenant ID: ${tenantId}
Admin email: ${admin?.email || "—"}
Temporary password: ${admin?.tempPassword || "—"}

Log in: ${loginUrl}
You'll be asked to set a permanent password on first login.`;

  return sendEmail({
    to: admin?.email,
    from: FROM,
    subject: "Your PragnyX FinCore workspace is ready",
    html,
    text,
    tag: "fincore.welcome",
  });
}

/** Sent from the onboarding wizard's "invite a team member" step. */
export async function sendTeamInviteEmail({ workspace, invite }) {
  const { companyId, workspaceUrl, business } = workspace;
  const loginUrl = `${workspaceUrl}/fincore/login?workspace=${encodeURIComponent(companyId)}`;
  const businessName = business?.name || companyId;

  const html = layout({
    preheader: `You've been invited to ${businessName}'s FinCore workspace`,
    heading: "You've been invited to FinCore",
    bodyHtml: `
      <p>Hi ${invite?.name || "there"},</p>
      <p><strong>${businessName}</strong> has invited you to join their PragnyX FinCore workspace as <strong>${invite?.role || "a team member"}</strong>.</p>
      <p>Ask your workspace admin for a login, or reach out to them directly to get set up.</p>
    `,
    ctaLabel: "Go to FinCore",
    ctaUrl: loginUrl,
  });

  const text = `Hi ${invite?.name || "there"},

${businessName} has invited you to join their PragnyX FinCore workspace as ${invite?.role || "a team member"}.

Ask your workspace admin for a login, or reach out to them directly to get set up.

${loginUrl}`;

  return sendEmail({
    to: invite?.email,
    from: FROM,
    subject: `You've been invited to ${businessName}'s FinCore workspace`,
    html,
    text,
    tag: "fincore.team-invite",
  });
}

/** Sent right after someone submits the "Request a demo" form. */
export async function sendDemoConfirmationEmail({ name, email, business }) {
  const html = layout({
    preheader: "We've received your FinCore demo request",
    heading: "Thanks for your interest in FinCore",
    bodyHtml: `
      <p>Hi ${name || "there"},</p>
      <p>We've received your demo request for <strong>${business || "your business"}</strong>. Our team will reach out within one business day to schedule a walkthrough.</p>
      <p>In the meantime, feel free to reply to this email with any questions.</p>
    `,
  });

  const text = `Hi ${name || "there"},

We've received your demo request for ${business || "your business"}. Our team will reach out within one business day to schedule a walkthrough.`;

  return sendEmail({
    to: email,
    from: FROM,
    subject: "We've received your FinCore demo request",
    html,
    text,
    tag: "fincore.demo-confirmation",
  });
}

/** Sent when an invoice is generated (initial provisioning, and later on payment.captured). */
export async function sendReceiptEmail({ workspace, invoice }) {
  const { companyId, admin } = workspace;
  const html = layout({
    preheader: `Receipt for ${companyId}`,
    heading: "Payment receipt",
    bodyHtml: `
      <p>This confirms a successful payment for your FinCore workspace <strong>${companyId}</strong>.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
        <tr><td style="padding:6px 0;color:#777;">Invoice ID</td><td style="padding:6px 0;font-weight:600;">${invoice.id}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Amount</td><td style="padding:6px 0;font-weight:600;">${formatINR(invoice.amount)} ${invoice.currency || "INR"}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Date</td><td style="padding:6px 0;font-weight:600;">${new Date(invoice.date).toLocaleDateString("en-IN")}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Payment ID</td><td style="padding:6px 0;font-weight:600;">${invoice.paymentId || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Status</td><td style="padding:6px 0;font-weight:600;text-transform:capitalize;">${invoice.status}</td></tr>
      </table>
    `,
    ctaLabel: "View in dashboard",
    ctaUrl: `${workspace.workspaceUrl}/fincore/login?workspace=${encodeURIComponent(companyId)}`,
  });

  const text = `Payment receipt for ${companyId}

Invoice ID: ${invoice.id}
Amount: ${formatINR(invoice.amount)} ${invoice.currency || "INR"}
Date: ${new Date(invoice.date).toLocaleDateString("en-IN")}
Payment ID: ${invoice.paymentId || "—"}
Status: ${invoice.status}`;

  return sendEmail({
    to: admin?.email,
    from: FROM,
    subject: `Receipt — ${formatINR(invoice.amount)} for ${companyId}`,
    html,
    text,
    tag: "fincore.receipt",
  });
}
