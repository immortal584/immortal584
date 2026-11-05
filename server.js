const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const projects = [
  { id: "nexa-commerce", number: "01", category: "E-COMMERCE", title: "Nexa Commerce", subtitle: "A sharper way to shop online", description: "A premium storefront concept with product discovery, cart flow, responsive layouts, and a streamlined checkout experience.", stack: ["React-ready UI", "Node.js API", "REST", "Responsive"], type: "DEMO CONCEPT", accent: "lime", metric: "Commerce experience" },
  { id: "pulse-analytics", number: "02", category: "SAAS DASHBOARD", title: "Pulse Analytics", subtitle: "Business data, made clear", description: "A SaaS dashboard concept for visualizing revenue, acquisition, customer activity, and operational KPIs in one workspace.", stack: ["Dashboard UI", "API design", "Data visualization", "Auth-ready"], type: "DEMO CONCEPT", accent: "violet", metric: "Analytics workspace" },
  { id: "flowdesk-crm", number: "03", category: "CRM / AUTOMATION", title: "Flowdesk CRM", subtitle: "Turn leads into relationships", description: "A lightweight CRM concept with lead stages, follow-up tracking, team workflows, and a clear pipeline view.", stack: ["Node.js", "Express", "REST API", "Workflow design"], type: "DEMO CONCEPT", accent: "blue", metric: "Sales workflow" },
  { id: "atlas-booking", number: "04", category: "BOOKING PLATFORM", title: "Atlas Booking", subtitle: "Scheduling without the back-and-forth", description: "A booking platform concept with service listings, availability selection, booking requests, and an admin-friendly structure.", stack: ["Full-stack architecture", "API", "Validation", "Mobile-first"], type: "DEMO CONCEPT", accent: "orange", metric: "Booking experience" }
];

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "Amr Portfolio API" }));
app.get("/api/projects", (_req, res) => res.json({ count: projects.length, projects }));

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (![name, email, message].every(v => typeof v === "string" && v.trim())) {
    return res.status(400).json({ ok: false, message: "Please complete all fields." });
  }
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.trim())) {
    return res.status(400).json({ ok: false, message: "Please enter a valid email address." });
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) {
    return res.status(503).json({ ok: false, message: "Email delivery is not configured yet. Please email Magichell5@gmail.com directly." });
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: ["Magichell5@gmail.com"],
        reply_to: email.trim(),
        subject: `Portfolio enquiry from ${name.trim().slice(0, 100)}`,
        text: `Name: ${name.trim()}\\nEmail: ${email.trim()}\\n\\n${message.trim().slice(0, 3000)}`
      })
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("Email provider error:", detail);
      return res.status(502).json({ ok: false, message: "The email provider could not deliver your message. Please try emailing directly." });
    }
    return res.status(201).json({ ok: true, message: "Thanks — your message has been sent." });
  } catch (error) {
    console.error("Email delivery failed:", error);
    return res.status(502).json({ ok: false, message: "Could not send your message right now. Please email directly." });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
