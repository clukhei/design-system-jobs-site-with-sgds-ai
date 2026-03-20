'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { jobs, formatSalary, formatPostedDate, getBadgeVariant, INDUSTRIES, JOB_TYPES, LOCATIONS } from '@/lib/jobs';

const ITEMS_PER_PAGE = 6;

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const searchRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLElement>(null);
  const industryRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLElement>(null);

  // Wire up SGDS custom events via addEventListener (required for Next.js)
  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setSearch((e.target as HTMLInputElement).value);
      setCurrentPage(1);
    };
    el.addEventListener('sgds-input', handler);
    return () => el.removeEventListener('sgds-input', handler);
  }, []);

  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setTypeFilter((e.target as HTMLSelectElement).value);
      setCurrentPage(1);
    };
    el.addEventListener('sgds-change', handler);
    return () => el.removeEventListener('sgds-change', handler);
  }, []);

  useEffect(() => {
    const el = industryRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setIndustryFilter((e.target as HTMLSelectElement).value);
      setCurrentPage(1);
    };
    el.addEventListener('sgds-change', handler);
    return () => el.removeEventListener('sgds-change', handler);
  }, []);

  useEffect(() => {
    const el = locationRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setLocationFilter((e.target as HTMLSelectElement).value);
      setCurrentPage(1);
    };
    el.addEventListener('sgds-change', handler);
    return () => el.removeEventListener('sgds-change', handler);
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());
      const matchesType = !typeFilter || job.type === typeFilter;
      const matchesIndustry = !industryFilter || job.industry === industryFilter;
      const matchesLocation = !locationFilter || job.location === locationFilter;
      return matchesSearch && matchesType && matchesIndustry && matchesLocation;
    });
  }, [search, typeFilter, industryFilter, locationFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('');
    setIndustryFilter('');
    setLocationFilter('');
    setCurrentPage(1);
  };

  const hasFilters = search || typeFilter || industryFilter || locationFilter;

  return (
    <>
      <sgds-masthead fluid suppressHydrationWarning></sgds-masthead>

      <sgds-mainnav fluid brandHref="/" suppressHydrationWarning>
        <strong slot="brand" suppressHydrationWarning>DesignJobs SG</strong>
        <sgds-mainnav-item suppressHydrationWarning>
          <a href="/">Browse Jobs</a>
        </sgds-mainnav-item>
        <div slot="end" suppressHydrationWarning>
          <Link href="/post-job">
            <sgds-button variant="primary" suppressHydrationWarning>Post a Job</sgds-button>
          </Link>
        </div>
      </sgds-mainnav>

      <div className="sgds:flex sgds:flex-col sgds:w-full">

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #1f69b0 0%, #0d4a8b 100%)' }}>
          <div className="sgds-container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '640px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>
                Find Your Next Opportunity
              </h1>
              <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '1.5rem', color: '#fff' }}>
                Browse design system, UX, and digital government jobs across Singapore.
              </p>
              <sgds-input
                ref={searchRef}
                suppressHydrationWarning
                placeholder="Search by job title or company…"
              >
                <sgds-icon slot="prefix" name="search" suppressHydrationWarning></sgds-icon>
              </sgds-input>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Open Roles', value: jobs.length },
                { label: 'Companies', value: new Set(jobs.map(j => j.company)).size },
                { label: 'Industries', value: INDUSTRIES.length },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{value}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8, color: '#e0edff' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="sgds-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>

          {/* Filter bar */}
          <div className="sgds:flex sgds:flex-wrap sgds:gap-component-sm" style={{ marginBottom: '1.5rem' }}>
            <sgds-select ref={typeRef} suppressHydrationWarning placeholder="All job types">
              <sgds-select-option value="" suppressHydrationWarning>All job types</sgds-select-option>
              {JOB_TYPES.map(t => (
                <sgds-select-option key={t} value={t} suppressHydrationWarning>{t}</sgds-select-option>
              ))}
            </sgds-select>

            <sgds-select ref={industryRef} suppressHydrationWarning placeholder="All industries">
              <sgds-select-option value="" suppressHydrationWarning>All industries</sgds-select-option>
              {INDUSTRIES.map(i => (
                <sgds-select-option key={i} value={i} suppressHydrationWarning>{i}</sgds-select-option>
              ))}
            </sgds-select>

            <sgds-select ref={locationRef} suppressHydrationWarning placeholder="All locations">
              <sgds-select-option value="" suppressHydrationWarning>All locations</sgds-select-option>
              {LOCATIONS.map(l => (
                <sgds-select-option key={l} value={l} suppressHydrationWarning>{l}</sgds-select-option>
              ))}
            </sgds-select>

            {hasFilters && (
              <sgds-button variant="ghost" suppressHydrationWarning onClick={clearFilters}>
                Clear filters
              </sgds-button>
            )}
          </div>

          {/* Results count */}
          <p className="sgds:text-sm sgds:text-color-muted" style={{ marginBottom: '1.25rem' }}>
            {filtered.length === 0
              ? 'No jobs found'
              : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} job${filtered.length !== 1 ? 's' : ''}`}
          </p>

          {/* Job cards grid */}
          {paginated.length > 0 ? (
            <>
              <div className="sgds-grid" style={{ marginBottom: '2rem' }}>
                {paginated.map((job) => (
                  <div key={job.id} className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-4" style={{ display: 'flex' }}>
                    <sgds-card suppressHydrationWarning style={{ width: '100%' }}>
                      <sgds-icon slot="icon" name={job.icon} size="2-xl" suppressHydrationWarning></sgds-icon>
                      <span slot="subtitle" suppressHydrationWarning>{job.company}</span>
                      <span slot="title" suppressHydrationWarning>{job.title}</span>
                      <span slot="description" suppressHydrationWarning style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {job.description}
                      </span>
                      <div slot="lower" suppressHydrationWarning>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
                          <sgds-badge variant={getBadgeVariant(job.type)} suppressHydrationWarning>{job.type}</sgds-badge>
                          <sgds-badge variant="neutral" suppressHydrationWarning>{job.industry}</sgds-badge>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span className="sgds:text-sm sgds:text-color-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <sgds-icon name="geo-alt" suppressHydrationWarning></sgds-icon>
                            {job.location}
                          </span>
                          <span className="sgds:text-sm sgds:text-color-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <sgds-icon name="currency-dollar" suppressHydrationWarning></sgds-icon>
                            {formatSalary(job.salaryMin, job.salaryMax)}
                          </span>
                          <span className="sgds:text-sm sgds:text-color-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <sgds-icon name="clock" suppressHydrationWarning></sgds-icon>
                            {formatPostedDate(job.postedDaysAgo)}
                          </span>
                        </div>
                      </div>
                      <sgds-link slot="footer" suppressHydrationWarning>
                        <a href={`/jobs/${job.id}`}>
                          View Job <sgds-icon name="arrow-right" suppressHydrationWarning></sgds-icon>
                        </a>
                      </sgds-link>
                    </sgds-card>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="sgds:flex sgds:items-center sgds:justify-between">
                  <p className="sgds:text-sm sgds:text-color-muted">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="sgds:flex sgds:gap-2">
                    <sgds-button
                      suppressHydrationWarning
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    >
                      Previous
                    </sgds-button>
                    <sgds-button
                      suppressHydrationWarning
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </sgds-button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <sgds-icon name="inbox" size="3-xl" suppressHydrationWarning style={{ marginBottom: '1rem', color: '#6b7280', display: 'block' }}></sgds-icon>
              <h3 className="sgds:text-base sgds:font-semibold sgds:text-color-default">No jobs found</h3>
              <p className="sgds:text-sm sgds:text-color-muted" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Try adjusting your search or clearing filters.
              </p>
              <sgds-button variant="outline" suppressHydrationWarning onClick={clearFilters}>
                Clear filters
              </sgds-button>
            </div>
          )}
        </div>

        <sgds-footer suppressHydrationWarning></sgds-footer>
      </div>
    </>
  );
}
