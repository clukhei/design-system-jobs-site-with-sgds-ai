'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { jobs, formatSalary, formatPostedDate, getBadgeVariant, INDUSTRIES, JOB_TYPES, LOCATIONS } from '@/lib/jobs';

const ITEMS_PER_PAGE = 6;

// Uses SGDS grid classes (grid.css, fixed-px media queries — Turbopack-safe).
// Default: 4-col grid | sm ≥512px: 8-col | lg ≥1024px: 12-col
const BENTO_SPANS = [
  'sgds-col-4 sgds-col-sm-8 sgds-col-lg-7',  // 0 – large featured
  'sgds-col-4 sgds-col-sm-8 sgds-col-lg-5',  // 1 – medium
  'sgds-col-4 sgds-col-sm-8 sgds-col-lg-4',  // 2 – small
  'sgds-col-4 sgds-col-sm-8 sgds-col-lg-4',  // 3 – small
  'sgds-col-4 sgds-col-sm-8 sgds-col-lg-4',  // 4 – small
  'sgds-col-4 sgds-col-sm-8 sgds-col-lg-12', // 5 – full-width anchor
];

function getBentoSpan(index: number, total: number): string {
  if (total === ITEMS_PER_PAGE) return BENTO_SPANS[index] ?? 'sgds-col-4 sgds-col-sm-8 sgds-col-lg-4';
  // Partial page: responsive uniform grid (1 col → 2 col → 3 col)
  return 'sgds-col-4 sgds-col-sm-4 sgds-col-lg-4';
}

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
  const paginationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;
    const handler = (e: Event) => { setSearch((e.target as HTMLInputElement).value); setCurrentPage(1); };
    el.addEventListener('sgds-input', handler);
    return () => el.removeEventListener('sgds-input', handler);
  }, []);

  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    const handler = (e: Event) => { setTypeFilter((e.target as HTMLSelectElement).value); setCurrentPage(1); };
    el.addEventListener('sgds-change', handler);
    return () => el.removeEventListener('sgds-change', handler);
  }, []);

  useEffect(() => {
    const el = industryRef.current;
    if (!el) return;
    const handler = (e: Event) => { setIndustryFilter((e.target as HTMLSelectElement).value); setCurrentPage(1); };
    el.addEventListener('sgds-change', handler);
    return () => el.removeEventListener('sgds-change', handler);
  }, []);

  useEffect(() => {
    const el = locationRef.current;
    if (!el) return;
    const handler = (e: Event) => { setLocationFilter((e.target as HTMLSelectElement).value); setCurrentPage(1); };
    el.addEventListener('sgds-change', handler);
    return () => el.removeEventListener('sgds-change', handler);
  }, []);

  useEffect(() => {
    const el = paginationRef.current;
    if (!el) return;
    const handler = (e: Event) => { setCurrentPage((e as CustomEvent).detail.currentPage); };
    el.addEventListener('sgds-page-change', handler);
    return () => el.removeEventListener('sgds-page-change', handler);
  }, []);

  const filtered = useMemo(() => jobs.filter((job) => {
    const matchesSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (!typeFilter || job.type === typeFilter) && (!industryFilter || job.industry === industryFilter) && (!locationFilter || job.location === locationFilter);
  }), [search, typeFilter, industryFilter, locationFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const clearFilters = () => { setSearch(''); setTypeFilter(''); setIndustryFilter(''); setLocationFilter(''); setCurrentPage(1); };
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

        {/* ── Hero Bento ─────────────────────────────────────────────── */}
        <div className="sgds:bg-primary-default sgds:py-layout-md">
          <div className="sgds-container">
            <div className="sgds-grid">

              {/* Main hero cell — full width on mobile/sm, 8/12 on lg */}
              <div
                className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:rounded-2xl sgds:p-8 sgds:flex sgds:flex-col sgds:justify-between"
                style={{ background: 'rgba(255,255,255,0.10)', minHeight: 240 }}
              >
                <div>
                  <p className="sgds:text-body-sm sgds:font-semibold sgds:text-fixed-light sgds:opacity-60 sgds:uppercase sgds:mb-3" style={{ letterSpacing: '0.08em' }}>
                    Singapore · Design &amp; UX Careers
                  </p>
                  <h1 className="sgds:text-heading-xl sgds:font-bold sgds:text-fixed-light sgds:mb-3">
                    Find Your Next<br />Opportunity
                  </h1>
                  <p className="sgds:text-body-lg sgds:text-fixed-light sgds:opacity-80 sgds:mb-6">
                    Browse design, UX &amp; digital government roles across Singapore.
                  </p>
                </div>
                <sgds-input ref={searchRef} suppressHydrationWarning placeholder="Search by job title or company…">
                  <sgds-icon slot="prefix" name="search" suppressHydrationWarning></sgds-icon>
                </sgds-input>
              </div>

              {/* Stats column — full width on mobile/sm, 4/12 on lg */}
              <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:gap-4">
                {[
                  { label: 'Open Roles', value: jobs.length, icon: 'briefcase' },
                  { label: 'Companies', value: new Set(jobs.map(j => j.company)).size, icon: 'building' },
                  { label: 'Industries', value: INDUSTRIES.length, icon: 'grid' },
                ].map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="sgds:flex-1 sgds:rounded-2xl sgds:p-5 sgds:flex sgds:flex-col sgds:justify-between"
                    style={{ background: 'rgba(255,255,255,0.10)' }}
                  >
                    <sgds-icon name={icon} size="xl" suppressHydrationWarning className="sgds:text-fixed-light sgds:opacity-50"></sgds-icon>
                    <div className="sgds:mt-3">
                      <div className="sgds:text-heading-lg sgds:font-bold sgds:text-fixed-light">{value}</div>
                      <div className="sgds:text-body-sm sgds:text-fixed-light sgds:opacity-70">{label}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── Main content ────────────────────────────────────────────── */}
        <div className="sgds-container sgds:pt-layout-sm sgds:pb-layout-md">

          {/* Filter bar */}
          <div className="sgds:flex sgds:flex-wrap sgds:gap-component-sm sgds:mb-5">
            <sgds-select ref={typeRef} suppressHydrationWarning placeholder="All job types">
              <sgds-select-option value="" suppressHydrationWarning>All job types</sgds-select-option>
              {JOB_TYPES.map(t => <sgds-select-option key={t} value={t} suppressHydrationWarning>{t}</sgds-select-option>)}
            </sgds-select>

            <sgds-select ref={industryRef} suppressHydrationWarning placeholder="All industries">
              <sgds-select-option value="" suppressHydrationWarning>All industries</sgds-select-option>
              {INDUSTRIES.map(i => <sgds-select-option key={i} value={i} suppressHydrationWarning>{i}</sgds-select-option>)}
            </sgds-select>

            <sgds-select ref={locationRef} suppressHydrationWarning placeholder="All locations">
              <sgds-select-option value="" suppressHydrationWarning>All locations</sgds-select-option>
              {LOCATIONS.map(l => <sgds-select-option key={l} value={l} suppressHydrationWarning>{l}</sgds-select-option>)}
            </sgds-select>

            {hasFilters && (
              <sgds-button variant="ghost" suppressHydrationWarning onClick={clearFilters}>Clear filters</sgds-button>
            )}
          </div>

          {/* Results count */}
          <p className="sgds:text-sm sgds:text-color-muted sgds:mb-5">
            {filtered.length === 0
              ? 'No jobs found'
              : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} job${filtered.length !== 1 ? 's' : ''}`}
          </p>

          {/* ── Job Bento Grid ─────────────────────────────────────────── */}
          {paginated.length > 0 ? (
            <>
              <div className="sgds-grid sgds:mb-8">
                {paginated.map((job, index) => {
                  const isFeatured = index === 0;
                  const isFullWidth = index === 5 && paginated.length === ITEMS_PER_PAGE;
                  const colClass = getBentoSpan(index, paginated.length);

                  return (
                    <div
                      key={job.id}
                      className={`${colClass} sgds:rounded-2xl sgds:border sgds:border-default sgds:flex sgds:flex-col sgds:overflow-hidden ${
                        isFeatured ? 'sgds:bg-primary-default' : 'sgds:bg-surface-raised'
                      }`}
                    >
                      <div className="sgds:p-6 sgds:flex sgds:flex-col sgds:h-full">

                        {/* Icon + badge */}
                        <div className="sgds:flex sgds:items-start sgds:justify-between sgds:mb-4">
                          <div
                            className="sgds:w-11 sgds:h-11 sgds:rounded-xl sgds:flex sgds:items-center sgds:justify-center"
                            style={{ background: isFeatured ? 'rgba(255,255,255,0.2)' : 'var(--sgds-color-primary-surface)' }}
                          >
                            <sgds-icon
                              name={job.icon}
                              size="lg"
                              suppressHydrationWarning
                              className={isFeatured ? 'sgds:text-fixed-light' : 'sgds:text-primary-default'}
                            ></sgds-icon>
                          </div>
                          <sgds-badge variant={getBadgeVariant(job.type)} suppressHydrationWarning>{job.type}</sgds-badge>
                        </div>

                        {/* Company */}
                        <p className={`sgds:text-body-sm sgds:mb-1 ${isFeatured ? 'sgds:text-fixed-light sgds:opacity-70' : 'sgds:text-color-muted'}`}>
                          {job.company}
                        </p>

                        {/* Title */}
                        <h3 className={`sgds:font-semibold sgds:mb-3 ${
                          isFeatured
                            ? 'sgds:text-heading-md sgds:text-fixed-light'
                            : 'sgds:text-heading-xs sgds:text-color-default'
                        }`}>
                          {job.title}
                        </h3>

                        {/* Description — featured + full-width only */}
                        {(isFeatured || isFullWidth) && (
                          <p className={`sgds:text-body-sm sgds:mb-4 sgds:line-clamp-3 ${
                            isFeatured ? 'sgds:text-fixed-light sgds:opacity-70' : 'sgds:text-color-muted'
                          }`}>
                            {job.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="sgds:mt-auto sgds:flex sgds:flex-col sgds:gap-1">
                          {[
                            { icon: 'geo-alt', text: job.location },
                            { icon: 'currency-dollar', text: formatSalary(job.salaryMin, job.salaryMax) },
                            { icon: 'clock', text: formatPostedDate(job.postedDaysAgo) },
                          ].map(({ icon, text }) => (
                            <span key={icon} className={`sgds:text-sm sgds:flex sgds:items-center sgds:gap-2 ${isFeatured ? 'sgds:text-fixed-light sgds:opacity-70' : 'sgds:text-color-muted'}`}>
                              <sgds-icon name={icon} suppressHydrationWarning></sgds-icon>
                              {text}
                            </span>
                          ))}
                        </div>

                        {/* Footer: industry badge + link */}
                        <div
                          className="sgds:flex sgds:items-center sgds:justify-between sgds:mt-4 sgds:pt-4 sgds:border-t"
                          style={isFeatured ? { borderTopColor: 'rgba(255,255,255,0.2)' } : undefined}
                        >
                          <sgds-badge variant="neutral" suppressHydrationWarning>{job.industry}</sgds-badge>
                          <sgds-link suppressHydrationWarning>
                            <a href={`/jobs/${job.id}`}>
                              View job <sgds-icon name="arrow-right" suppressHydrationWarning></sgds-icon>
                            </a>
                          </sgds-link>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <sgds-pagination
                  ref={paginationRef}
                  suppressHydrationWarning
                  dataLength={filtered.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  variant="number"
                ></sgds-pagination>
              )}
            </>
          ) : (
            <div className="sgds:text-center sgds:py-layout-lg">
              <sgds-icon name="inbox" size="3-xl" className="sgds:mb-4 sgds:text-color-muted sgds:block" suppressHydrationWarning></sgds-icon>
              <h3 className="sgds:text-body-lg sgds:font-semibold sgds:text-color-default">No jobs found</h3>
              <p className="sgds:text-body-sm sgds:text-color-muted sgds:mt-2 sgds:mb-6">
                Try adjusting your search or clearing filters.
              </p>
              <sgds-button variant="outline" suppressHydrationWarning onClick={clearFilters}>Clear filters</sgds-button>
            </div>
          )}

        </div>

        <sgds-footer suppressHydrationWarning></sgds-footer>
      </div>
    </>
  );
}
