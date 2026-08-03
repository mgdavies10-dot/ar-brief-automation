import type { Metadata } from "next";
import { PageHead, ConversionForm } from "@/components/content/Templates";

export const metadata: Metadata = {
  title: "Request a confidential conversation — VYNE Strategies",
  description:
    "No documents, no commitment, and nothing shared with a firm or outside party without your permission.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Start"
        title="Request a confidential conversation"
        standfirst="No documents, no commitment, and nothing shared with a firm or outside party without your permission. We will tell you plainly whether we think we can be useful."
        crumbs={[{ label: "Start", href: "/start/confidential-conversation" }]}
      />

      <section className="band-ivory">
        <div className="shell">
          <ConversionForm
            intro="We ask for the least we can. Nothing below identifies a client, and nothing below is required for us to have a first conversation."
            submitLabel="Request a conversation"
            consentText="I agree that VYNE may contact me about this request. I understand this does not authorize VYNE to contact any firm about me."
            fields={[
              { id: "name", label: "Name" },
              { id: "email", label: "Email" },
              { id: "phone", label: "Phone", optional: true, help: "Only if you would rather we called." },
              {
                id: "channel", label: "Where you are today",
                options: [
                  "Employee at a national firm", "Employee at a regional firm",
                  "Independent broker-dealer", "Supported independence",
                  "My own RIA", "Employee or partner at an RIA",
                  "Bank or insurance", "Other",
                ],
              },
              {
                id: "scale", label: "Approximate scale of the practice",
                help: "A band is enough. We do not ask for exact revenue or assets.",
                options: [
                  "Under $100M", "$100M – $250M", "$250M – $500M",
                  "$500M – $1B", "Over $1B", "Prefer not to say",
                ],
              },
              {
                id: "context", label: "What prompted this", type: "textarea",
                help: "In your own words. Brief is fine.",
              },
            ]}
          />

          <div className="guards">
            <div>
              <p className="eyebrow">What we will not ask for</p>
              <ul className="bulleted">
                <li>Your CRD number</li>
                <li>Exact trailing revenue or exact assets</li>
                <li>Statements, account data or documents</li>
                <li>Any client name or client-identifying information</li>
              </ul>
            </div>
            <div>
              <p className="eyebrow">What happens next</p>
              <ul className="bulleted">
                <li>A conversation, arranged at your convenience.</li>
                <li>If we do not think we can be useful, we say so.</li>
                <li>
                  If we proceed, you receive an Engagement Understanding before any substantive
                  work begins.
                </li>
                <li>
                  No firm is contacted at any point without your explicit written authorization
                  naming that firm.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
