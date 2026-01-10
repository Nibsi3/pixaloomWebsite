'use client';

import { useMemo, useState } from 'react';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';

const phone = '0662995533';
const whatsappBase = 'https://wa.me/27662995533?text=';
const emailTo = '';

export function ContactCTA() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  const composed = useMemo(() => {
    const lines = [
      'Project enquiry',
      '',
      `Name: ${name || '-'}`,
      `Company: ${company || '-'}`,
      `Budget: ${budget || '-'}`,
      '',
      message ? `Message: ${message}` : 'Message: -',
    ];
    return lines.join('\n');
  }, [name, company, budget, message]);

  const mailHref = useMemo(() => {
    if (!emailTo) return '';
    const subject = encodeURIComponent('Website / Web App project enquiry');
    const body = encodeURIComponent(composed);
    return `mailto:${emailTo}?subject=${subject}&body=${body}`;
  }, [composed]);

  const waHref = useMemo(() => {
    const text = encodeURIComponent(composed);
    return whatsappBase + text;
  }, [composed]);

  const isValid = message.trim().length >= 10;

  return (
    <>
      <Section
        id="contact"
        eyebrow="Lead capture"
        title="Let’s build something that converts"
        subtitle="Send a quick brief. I’ll reply with a plan, timeline, and options."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="card p-5 lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm">
                <div className="mb-1 text-xs text-fg-300">Your name</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-bg-700 bg-bg-850 px-3 py-2 text-sm outline-none focus:border-accent-500"
                  placeholder="John"
                />
              </label>

              <label className="text-sm">
                <div className="mb-1 text-xs text-fg-300">Company (optional)</div>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-bg-700 bg-bg-850 px-3 py-2 text-sm outline-none focus:border-accent-500"
                  placeholder="Business / Brand"
                />
              </label>

              <label className="text-sm sm:col-span-2">
                <div className="mb-1 text-xs text-fg-300">Budget range</div>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full rounded-lg border border-bg-700 bg-bg-850 px-3 py-2 text-sm outline-none focus:border-accent-500"
                >
                  <option value="">Select…</option>
                  <option value="R2k–R5k">R2k–R5k</option>
                  <option value="R5k–R10k">R5k–R10k</option>
                  <option value="R10k–R25k">R10k–R25k</option>
                  <option value="R25k+">R25k+</option>
                </select>
              </label>

              <label className="text-sm sm:col-span-2">
                <div className="mb-1 text-xs text-fg-300">Project details</div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] w-full resize-y rounded-lg border border-bg-700 bg-bg-850 px-3 py-2 text-sm outline-none focus:border-accent-500"
                  placeholder="What do you need built? Who is it for? Any deadline?"
                />
                <div className="mt-2 text-xs text-fg-300">
                  Tip: include your goal (leads, sales, bookings) and any examples you like.
                </div>
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button href={waHref} variant="primary" size="lg">
                Send via WhatsApp
              </Button>
              {emailTo ? (
                <Button href={mailHref} variant="secondary" size="lg">
                  Email me
                </Button>
              ) : null}
              <Button href={`tel:${phone}`} variant="ghost" size="lg">
                Call {phone}
              </Button>
            </div>

            {!isValid ? (
              <div className="mt-3 text-xs text-warn-500">
                Add at least 10 characters in “Project details” to send a meaningful enquiry.
              </div>
            ) : null}
          </div>

          <div className="card p-5 lg:col-span-5">
            <div className="text-sm font-semibold">What happens next</div>
            <div className="mt-4 space-y-3 text-sm text-fg-300">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                <div>I reply with questions + a quick scope</div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                <div>You get a clear quote + timeline</div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                <div>I ship an initial version fast, then iterate</div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-bg-700 bg-bg-850/30 p-4">
              <div className="text-xs font-medium text-fg-200">Local advantage</div>
              <div className="mt-2 text-xs text-fg-300">
                Based in George, Western Cape — great fit for South African businesses needing a
                premium web presence.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-2xl border border-bg-700 bg-bg-900/80 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Need a developer?</div>
            <div className="truncate text-xs text-fg-300">Fast build · SEO · Lead-gen</div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button href="#contact" variant="primary" size="sm">
              Quote
            </Button>
            <Button href={waHref} variant="secondary" size="sm">
              WA
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
