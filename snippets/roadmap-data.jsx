export const ROADMAP_DATA = {
  tags: [
    "CDN",
    "Cloud",
    "Vidinfra",
    "Managed DNS",
    "Streaming",
    "Customer Portal",
  ],
  columns: {
    planned: [
      {
        id: "p-001",
        title: "Support Brotli for every cached resource",
        date: "Dec 23rd",
        tag: "CDN",
        description:
          "Enable Brotli compression across all cached resources, not just origin responses. Should improve transfer sizes by ~15-20% over gzip for text-based assets.",
      },
      {
        id: "p-002",
        title: "IPv6 as source",
        date: "Dec 23rd",
        tag: "CDN",
        description:
          "Allow customers to configure IPv6 origins for pull zones. Currently only IPv4 origins are supported.",
      },
      {
        id: "p-003",
        title: "Advanced Monitoring Service",
        date: "Dec 23rd",
        tag: "Cloud",
        description:
          "Deeper VM-level metrics, custom alerts, and integrations with Grafana/Prometheus.",
      },
      {
        id: "p-004",
        title: "Site-to-Site VPN",
        date: "Dec 23rd",
        tag: "Cloud",
        description:
          "Connect your on-prem infrastructure to Tenbyte Cloud VPC via IPsec tunnel.",
      },
      {
        id: "p-005",
        title: "URL Redirect DNS record",
        date: "Nov 16th",
        tag: "Managed DNS",
        description:
          "Add a DNS record type that performs HTTP 301/302 redirects without needing an origin server.",
      },
      {
        id: "p-006",
        title: "Custom ingest domains",
        date: "May 16th",
        tag: "Streaming",
        description:
          "Use your own domain (e.g. ingest.yourbrand.com) for RTMP/SRT push instead of the default Tenbyte ingest URL.",
      },
      {
        id: "p-007",
        title: "Bring Your Own IP (BYOIP)",
        date: "Jan 14th",
        tag: "Cloud",
        description:
          "Announce your own IPv4/IPv6 prefixes from Tenbyte edge for reputation continuity.",
      },
      {
        id: "p-008",
        title: "GraphQL caching at the edge",
        date: "Feb 2nd",
        tag: "CDN",
        description:
          "Parse GraphQL POST bodies and cache responses by query hash with per-field TTLs.",
      },
      {
        id: "p-009",
        title: "Live transcoding presets",
        date: "Mar 10th",
        tag: "Vidinfra",
        description:
          "Saved ABR ladders per channel — pick once, reuse across all streams.",
      },
      {
        id: "p-010",
        title: "Two-factor for sub-accounts",
        date: "Apr 1st",
        tag: "Customer Portal",
        description:
          "Enforce TOTP/WebAuthn on reseller sub-accounts from the parent dashboard.",
      },
      {
        id: "p-011",
        title: "Terraform provider v2",
        date: "Apr 18th",
        tag: "Cloud",
        description:
          "Rewrite using Terraform Plugin Framework — proper plan diffs for nested blocks and import support.",
      },
      {
        id: "p-012",
        title: "ANAME flattening",
        date: "May 5th",
        tag: "Managed DNS",
        description:
          "Resolve ALIAS/ANAME records to A/AAAA at query time for apex CNAME-like behavior.",
      },
    ],
    inProgress: [
      {
        id: "ip-001",
        title: "Support for HTTP/3",
        date: "Dec 23rd → Jun 30th",
        tag: "CDN",
        description:
          "HTTP/3 (QUIC) support at all 210+ edge locations. Currently rolling out region by region.",
      },
      {
        id: "ip-002",
        title: "Pay With Crypto",
        date: "Feb 8th",
        tag: "Cloud",
        description:
          "Accept USDT, USDC, and BTC for invoice payments. Launching with Tenbyte Cloud first, then CDN.",
      },
      {
        id: "ip-003",
        title: "Instant config propagation",
        date: "Mar 22nd → Dec 15th",
        tag: "CDN",
        description:
          "Push config changes to all 210+ PoPs in under 5 seconds instead of the current 60s window.",
      },
      {
        id: "ip-004",
        title: "Let's Encrypt wildcard certificate support",
        date: "Dec 23rd",
        tag: "CDN",
        description:
          "Auto-provision wildcard SSL certificates via Let's Encrypt DNS-01 challenge for pull zones.",
      },
      {
        id: "ip-005",
        title: "Customer Portal redesign",
        date: "Sep 4th",
        tag: "Customer Portal",
        description:
          "New dashboard, faster navigation, unified billing across CDN/Cloud/Vidinfra.",
      },
      {
        id: "ip-006",
        title: "Permanent API tokens for resellers",
        date: "Aug 30th",
        tag: "CDN",
        description:
          "Non-expiring API tokens scoped to reseller sub-accounts for white-label automation.",
      },
      {
        id: "ip-007",
        title: "Edge image optimization",
        date: "Jan 20th → Jul 1st",
        tag: "CDN",
        description:
          "On-the-fly resize, format conversion (AVIF/WebP), and quality tuning via URL params.",
      },
      {
        id: "ip-008",
        title: "Object Storage S3 compatibility",
        date: "Feb 14th",
        tag: "Cloud",
        description:
          "Full S3 API surface (multipart, versioning, lifecycle) on Tenbyte Object Storage.",
      },
      {
        id: "ip-009",
        title: "Low-latency HLS (LL-HLS)",
        date: "Mar 5th → Sep 1st",
        tag: "Vidinfra",
        description:
          "Sub-3s glass-to-glass latency with partial segments and preload hints.",
      },
      {
        id: "ip-010",
        title: "GeoBlocking by ASN",
        date: "Apr 12th",
        tag: "CDN",
        description:
          "Block or allow traffic by autonomous system number — finer-grained than country rules.",
      },
      {
        id: "ip-011",
        title: "Webhooks for DNS changes",
        date: "May 22nd",
        tag: "Managed DNS",
        description:
          "POST audit events (record create/update/delete) to your endpoint for SIEM ingestion.",
      },
      {
        id: "ip-012",
        title: "Usage-based billing exports",
        date: "Jun 8th",
        tag: "Customer Portal",
        description:
          "CSV/Parquet exports of per-resource hourly usage for chargeback reporting.",
      },
    ],
    released: [
      {
        id: "r-001",
        title: "CSS and JS minification/compression",
        date: "Dec 23rd",
        tag: "CDN",
        description:
          "Automatic minification of CSS and JS at the edge. Toggle per pull zone in the dashboard.",
      },
      {
        id: "r-002",
        title: "DNSSEC",
        date: "Nov 16th",
        tag: "Managed DNS",
        description:
          "DNSSEC signing for all zones hosted on Tenbyte Managed DNS. One-click enable.",
      },
      {
        id: "r-003",
        title: "Database as a Service",
        date: "Dec 23rd",
        tag: "Cloud",
        description:
          "Managed MySQL and PostgreSQL with automated backups, read replicas, and point-in-time recovery.",
      },
      {
        id: "r-004",
        title: "Host header based on origin",
        date: "Dec 23rd",
        tag: "CDN",
        description:
          "Override the Host header sent to origin per pull zone — useful for shared hosting backends.",
      },
      {
        id: "r-005",
        title: "DNS Failover",
        date: "Nov 16th",
        tag: "Managed DNS",
        description:
          "Health-checked DNS records that automatically remove unhealthy IPs from rotation.",
      },
      {
        id: "r-006",
        title: "New locations in Armenia and Finland",
        date: "Aug 6th",
        tag: "Cloud",
        description:
          "Two new Tenbyte Cloud regions: Yerevan (AM) and Helsinki (FI). Available in the dashboard now.",
      },
      {
        id: "r-007",
        title: "Origin Shield",
        date: "Jul 19th",
        tag: "CDN",
        description:
          "Single super-PoP in front of origin to collapse cache-miss traffic — typical 70% offload boost.",
      },
      {
        id: "r-008",
        title: "Per-zone WAF rules",
        date: "Jun 30th",
        tag: "CDN",
        description:
          "Custom rule sets per pull zone with shared rule templates across the account.",
      },
      {
        id: "r-009",
        title: "Multi-region snapshots",
        date: "May 12th",
        tag: "Cloud",
        description:
          "Replicate VM snapshots across regions for cross-region restore and DR drills.",
      },
      {
        id: "r-010",
        title: "Studio recording → VOD",
        date: "Apr 3rd",
        tag: "Vidinfra",
        description:
          "Auto-package live stream recordings into HLS VOD assets at end of broadcast.",
      },
      {
        id: "r-011",
        title: "Bulk DNS import (BIND zone files)",
        date: "Mar 11th",
        tag: "Managed DNS",
        description:
          "Drop a zone file in the dashboard to import hundreds of records in one shot.",
      },
      {
        id: "r-012",
        title: "Dark mode for portal",
        date: "Feb 20th",
        tag: "Customer Portal",
        description: "System-pref-aware dark theme across all dashboard views.",
      },
    ],
  },
};
