'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { INDUSTRIES, JOB_TYPES, LOCATIONS } from '@/lib/jobs';

export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, POST form data to an API route here
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <>
        <sgds-masthead fluid suppressHydrationWarning></sgds-masthead>
        <sgds-mainnav fluid brandHref="/" suppressHydrationWarning>
          <strong slot="brand" suppressHydrationWarning>DesignJobs SG</strong>
          <sgds-mainnav-item suppressHydrationWarning>
            <a href="/">Browse Jobs</a>
          </sgds-mainnav-item>
          <Link href="/post-job" slot="end" suppressHydrationWarning>
            <sgds-button variant="primary" suppressHydrationWarning>Post a Job</sgds-button>
          </Link>
        </sgds-mainnav>

        <div className="sgds:flex sgds:flex-col sgds:w-full">
          <div className="sgds-container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <sgds-icon name="check-circle" size="3-xl" suppressHydrationWarning style={{ color: '#1a7a4a', marginBottom: '1.5rem', display: 'block' }}></sgds-icon>
              <h1 className="sgds:text-2xl sgds:font-semibold sgds:text-color-default" style={{ marginBottom: '0.75rem' }}>
                Job listing submitted!
              </h1>
              <p className="sgds:text-base sgds:text-color-muted" style={{ marginBottom: '2rem' }}>
                Thank you for posting on DesignJobs SG. Your listing will be reviewed and published within 1 business day.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <sgds-button variant="primary" suppressHydrationWarning onClick={() => setSubmitted(false)}>
                  Post another job
                </sgds-button>
                <Link href="/">
                  <sgds-button variant="outline" suppressHydrationWarning>Browse jobs</sgds-button>
                </Link>
              </div>
            </div>
          </div>
          <sgds-footer suppressHydrationWarning></sgds-footer>
        </div>
      </>
    );
  }

  return (
    <>
      <sgds-masthead fluid suppressHydrationWarning></sgds-masthead>
      <sgds-mainnav fluid brandHref="/" suppressHydrationWarning>
        <strong slot="brand" suppressHydrationWarning>DesignJobs SG</strong>
        <sgds-mainnav-item suppressHydrationWarning>
          <a href="/">Browse Jobs</a>
        </sgds-mainnav-item>
        <Link href="/post-job" slot="end" suppressHydrationWarning>
          <sgds-button variant="primary" suppressHydrationWarning>Post a Job</sgds-button>
        </Link>
      </sgds-mainnav>

      <div className="sgds:flex sgds:flex-col sgds:w-full">
        <div className="sgds-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>

          {/* Breadcrumb */}
          <nav style={{ marginBottom: '1.5rem' }}>
            <sgds-breadcrumb suppressHydrationWarning>
              <sgds-breadcrumb-item href="/" suppressHydrationWarning>Browse Jobs</sgds-breadcrumb-item>
              <sgds-breadcrumb-item suppressHydrationWarning>Post a Job</sgds-breadcrumb-item>
            </sgds-breadcrumb>
          </nav>

          {/* Page header */}
          <div className="sgds:flex sgds:items-start sgds:justify-between" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h1 className="sgds:text-2xl sgds:font-semibold sgds:text-color-default">Post a Job</h1>
              <p className="sgds:text-sm sgds:text-color-muted" style={{ marginTop: '0.25rem' }}>
                Fill in the details below to list your role on DesignJobs SG.
              </p>
            </div>
            <div className="sgds:flex sgds:gap-component-sm sgds:shrink-0" style={{ marginLeft: '1rem' }}>
              <Link href="/">
                <sgds-button variant="outline" suppressHydrationWarning>Cancel</sgds-button>
              </Link>
              <sgds-button variant="primary" form="post-job-form" type="submit" suppressHydrationWarning>
                Submit listing
              </sgds-button>
            </div>
          </div>

          <form id="post-job-form" ref={formRef} onSubmit={handleSubmit} noValidate>

            {/* Section 1: Company Information */}
            <div className="sgds:border-t sgds:border-muted" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div className="sgds-grid sgds:gap-layout-md">
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                  <h2 className="sgds:text-base sgds:font-semibold sgds:text-color-default">Company Information</h2>
                  <p className="sgds:text-sm sgds:text-color-muted" style={{ marginTop: '0.375rem' }}>
                    Tell candidates about your organisation.
                  </p>
                </div>
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
                  <sgds-input
                    suppressHydrationWarning
                    label="Company name"
                    name="companyName"
                    required
                    hasFeedback
                    placeholder="e.g. GovTech Singapore"
                  ></sgds-input>

                  <sgds-input
                    suppressHydrationWarning
                    label="Company website"
                    name="companyWebsite"
                    type="url"
                    placeholder="https://www.example.com"
                    hint="Include the full URL with https://"
                  ></sgds-input>

                  <sgds-select
                    suppressHydrationWarning
                    label="Industry"
                    name="industry"
                    required
                    hasFeedback
                  >
                    <sgds-select-option value="" suppressHydrationWarning>Select an industry</sgds-select-option>
                    {INDUSTRIES.map(i => (
                      <sgds-select-option key={i} value={i} suppressHydrationWarning>{i}</sgds-select-option>
                    ))}
                  </sgds-select>

                  <sgds-textarea
                    suppressHydrationWarning
                    label="Company description"
                    name="companyDescription"
                    rows={3}
                    maxlength={300}
                    characterCount
                    hint="Brief overview of what your company does. Max 300 characters."
                    placeholder="e.g. We build digital services for Singapore citizens…"
                  ></sgds-textarea>
                </div>
              </div>
            </div>

            {/* Section 2: Job Details */}
            <div className="sgds:border-t sgds:border-muted" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div className="sgds-grid sgds:gap-layout-md">
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                  <h2 className="sgds:text-base sgds:font-semibold sgds:text-color-default">Job Details</h2>
                  <p className="sgds:text-sm sgds:text-color-muted" style={{ marginTop: '0.375rem' }}>
                    Describe the role, type, and compensation.
                  </p>
                </div>
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
                  <sgds-input
                    suppressHydrationWarning
                    label="Job title"
                    name="jobTitle"
                    required
                    hasFeedback
                    placeholder="e.g. Senior UX Designer"
                  ></sgds-input>

                  <div className="sgds-grid sgds:gap-component-sm">
                    <sgds-select
                      suppressHydrationWarning
                      label="Job type"
                      name="jobType"
                      required
                      hasFeedback
                      className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                    >
                      <sgds-select-option value="" suppressHydrationWarning>Select type</sgds-select-option>
                      {JOB_TYPES.map(t => (
                        <sgds-select-option key={t} value={t} suppressHydrationWarning>{t}</sgds-select-option>
                      ))}
                    </sgds-select>

                    <sgds-select
                      suppressHydrationWarning
                      label="Location / region"
                      name="location"
                      required
                      hasFeedback
                      className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                    >
                      <sgds-select-option value="" suppressHydrationWarning>Select region</sgds-select-option>
                      {LOCATIONS.map(l => (
                        <sgds-select-option key={l} value={l} suppressHydrationWarning>{l}</sgds-select-option>
                      ))}
                    </sgds-select>
                  </div>

                  <div className="sgds-grid sgds:gap-component-sm">
                    <sgds-input
                      suppressHydrationWarning
                      label="Minimum salary (SGD/month)"
                      name="salaryMin"
                      type="number"
                      placeholder="e.g. 5000"
                      hint="Enter the base salary in SGD."
                      className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                    ></sgds-input>
                    <sgds-input
                      suppressHydrationWarning
                      label="Maximum salary (SGD/month)"
                      name="salaryMax"
                      type="number"
                      placeholder="e.g. 8000"
                      className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                    ></sgds-input>
                  </div>

                  <sgds-textarea
                    suppressHydrationWarning
                    label="Job description"
                    name="jobDescription"
                    rows={5}
                    maxlength={1500}
                    characterCount
                    required
                    hasFeedback
                    hint="Describe the role, responsibilities, and what success looks like. Max 1500 characters."
                    placeholder="e.g. You will lead the design of citizen-facing digital services…"
                  ></sgds-textarea>
                </div>
              </div>
            </div>

            {/* Section 3: Requirements */}
            <div className="sgds:border-t sgds:border-muted" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div className="sgds-grid sgds:gap-layout-md">
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                  <h2 className="sgds:text-base sgds:font-semibold sgds:text-color-default">Requirements</h2>
                  <p className="sgds:text-sm sgds:text-color-muted" style={{ marginTop: '0.375rem' }}>
                    List the skills, qualifications, and experience you're looking for.
                  </p>
                </div>
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
                  <sgds-textarea
                    suppressHydrationWarning
                    label="Must-have requirements"
                    name="requirements"
                    rows={4}
                    maxlength={800}
                    characterCount
                    required
                    hasFeedback
                    hint="List each requirement on a new line. Max 800 characters."
                    placeholder={"e.g.\n- 3+ years of UX design experience\n- Proficiency in Figma\n- Experience with design systems"}
                  ></sgds-textarea>

                  <sgds-textarea
                    suppressHydrationWarning
                    label="Nice-to-have requirements"
                    name="niceToHave"
                    rows={3}
                    maxlength={500}
                    characterCount
                    hint="Optional. List preferred but not mandatory skills. Max 500 characters."
                    placeholder={"e.g.\n- Familiarity with Singapore Government design guidelines\n- Experience in agile product teams"}
                  ></sgds-textarea>
                </div>
              </div>
            </div>

            {/* Section 4: Contact Information */}
            <div className="sgds:border-t sgds:border-muted" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
              <div className="sgds-grid sgds:gap-layout-md">
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                  <h2 className="sgds:text-base sgds:font-semibold sgds:text-color-default">Contact Information</h2>
                  <p className="sgds:text-sm sgds:text-color-muted" style={{ marginTop: '0.375rem' }}>
                    How should candidates reach out? This will be shown on the listing.
                  </p>
                </div>
                <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
                  <div className="sgds-grid sgds:gap-component-sm">
                    <sgds-input
                      suppressHydrationWarning
                      label="Contact name"
                      name="contactName"
                      required
                      hasFeedback
                      placeholder="e.g. Jane Tan"
                      className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                    ></sgds-input>
                    <sgds-input
                      suppressHydrationWarning
                      label="Contact email"
                      name="contactEmail"
                      type="email"
                      required
                      hasFeedback
                      placeholder="e.g. careers@company.sg"
                      hint="Candidates will send applications to this address."
                      className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                    ></sgds-input>
                  </div>

                  <sgds-input
                    suppressHydrationWarning
                    label="Application URL"
                    name="applicationUrl"
                    type="url"
                    placeholder="https://careers.company.sg/apply"
                    hint="Optional. Link to your own application form or job portal."
                  ></sgds-input>
                </div>
              </div>
            </div>

            {/* Form footer */}
            <div className="sgds:border-t sgds:border-muted sgds:flex sgds:justify-end sgds:gap-component-sm" style={{ paddingTop: '1.5rem' }}>
              <Link href="/">
                <sgds-button variant="outline" type="button" suppressHydrationWarning>Cancel</sgds-button>
              </Link>
              <sgds-button variant="primary" type="submit" suppressHydrationWarning>
                Submit listing
              </sgds-button>
            </div>

          </form>
        </div>

        <sgds-footer suppressHydrationWarning></sgds-footer>
      </div>
    </>
  );
}
