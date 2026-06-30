export const ROADMAP_DATA = {
  tags: [
    "CDN",
    "Cloud",
    "Vidinfra",
    // "Webinar",
    "Live Stream",
    "Dashboard",
  ],
  columns: {
    planned: [
    
    
    {
      id: "p-004",
      title: "Square Video Support & follow uploaded dimension",
      date: "Apr 22nd",
      tag: "Vidinfra",
      description:
        "Preserve 9:16 and other portrait aspect ratios through the transcoding pipeline instead of forcing 16:9 output.",
    },

    {
      id: "p-005",
      title: "Vertical Video Thumbnail Support",
      date: "Apr 22nd",
      tag: "Vidinfra",
      description:
        "Generate and display vertical video thumbnails for portrait aspect ratio content in the Vidinfra library and player.",
    },

    {
      id: "p-007",
      title: "Video Download Support",
      date: "June 24th",
      tag: "Vidinfra",
      description:
        "Allow users to download videos from the Vidinfra platform in best available resolution.",
    },

    {
      id: "p-005",
      title: "Audio Upload Support",
      date: "June 13th",
      tag: "Vidinfra",
      description:
        "Allow users to upload audio files to the Vidinfra platform for processing and playback.",
    },

    {
      id: "p-008",
      title: "Timestamp based Thumbnail Generation",
      date: "June 28th",
      tag: "Vidinfra",
      description:
        "Allow users to specify timestamps for thumbnail generation instead of relying on automatic frame selection.",
    },

    {
      id: "p-009",
      title: "SSL Replacement for CDN",
      date: "June 30th",
      tag: "CDN",
      description:
        "Replace existing SSL instead of Revoking and Reassigning SSL for CDN zones to avoid downtime during certificate replacement.",
    },


    
    {
      id: "p-006",
      title: "Stripe Payment Gateway Integration",
      date: "Mar 5th",
      tag: "Dashboard",
      description:
        "Integrate Stripe's payment gateway to support recurring payments and local payment methods for SEA customers.",
    },
  ],
  inProgress: [

    {
      id: "ip-001",
      title: "AI Chapter",
      date: "Mar 3rd",
      tag: "Vidinfra",
      description:
        "Automatically detect scene changes and topic shifts in VOD content to generate navigable chapter markers.",
    },
    {
      id: "ip-002",
      title: "AI Transcription",
      date: "Mar 17th",
      tag: "Vidinfra",
      description:
        "Speech-to-text transcription for uploaded videos with support for multiple languages and downloadable SRT/VTT files.",
    },
    
    
    {
      id: "ip-004",
      title: "Stream to Vidinfra",
      date: "Dec 23rd",
      tag: "Vidinfra",
      description:
        "Push RTMP/SRT live streams directly into the Vidinfra pipeline for transcoding, recording, and VOD packaging in one flow.",
    },
    {
      id: "ip-005",
      title: "Video Analytics",
      date: "Dec 23rd",
      tag: "Vidinfra",
      description:
        "Per-video play counts, watch-time heatmaps, drop-off rates, and geographic breakdowns available in the customer portal.",
    },
    {
      id: "ip-006",
      title: "LiveStream Recording to Vidinfra Library or S3",
      date: "Jan 9th",
      tag: "Live Stream",
      description:
        "Automatically save live broadcast recordings to the Vidinfra VOD library or a customer-owned S3 bucket at end of stream.",
    },
    {
      id: "ip-007",
      title: "Live Multi Destination",
      date: "Jan 20th",
      tag: "Live Stream",
      description:
        "Simultaneously restream to multiple RTMP endpoints (YouTube, Twitch, custom) from a single ingest point.",
    },
    
    
    // {
    //   id: "ip-009",
    //   title: "Recording Options",
    //   date: "Feb 14th",
    //   tag: "Webinar",
    //   description:
    //     "Two recording modes:\n1. Record Default – Users can choose to record or not; record button visible in live.\n2. Auto Recording – Recording starts automatically when live starts; record button visible.",
    // },
    // {
    //   id: "ip-010",
    //   title: "Host must assign co-host before leaving a live session",
    //   date: "Feb 20th",
    //   tag: "Webinar",
    //   description:
    //     "Prevent hosts from exiting a live session without first promoting another participant to co-host to avoid unmoderated rooms.",
    // },
    {
      id: "ip-011",
      title: "Partner Program (Partner + Reseller)",
      date: "Jan 10th",
      tag: "Dashboard",
      description:
        "Tiered partner portal supporting both referral partners and white-label resellers with separate dashboards, commission tracking, and sub-account management.",
    },
  
    // {
    //   id: "ip-012",
    //   title: "Picture-in-Picture Mode",
    //   date: "Mar 1st",
    //   tag: "Webinar",
    //   description:
    //     "Float the active speaker video in a resizable overlay so attendees can follow along while viewing shared content full-screen.",
    // },
    // {
    //   id: "ip-013",
    //   title: "Fullscreen Mode",
    //   date: "Mar 1st",
    //   tag: "Webinar",
    //   description:
    //     "One-click fullscreen for the main stage video, removing all UI chrome for immersive viewing on large displays.",
    // },
    // {
    //   id: "ip-014",
    //   title: "Logo upload option",
    //   date: "Mar 8th",
    //   tag: "Webinar",
    //   description:
    //     "Allow hosts to upload a brand logo displayed in the waiting room, session header, and recording watermark.",
    // },
    
    // {
    //   id: "ip-015",
    //   title: "Pin Users",
    //   date: "Mar 15th",
    //   tag: "Webinar",
    //   description:
    //     "Hosts and co-hosts can pin a specific participant's video to the main stage regardless of who is currently speaking.",
    // },
    // {
    //   id: "ip-016",
    //   title: "File Sharing in the chat",
    //   date: "Mar 15th",
    //   tag: "Webinar",
    //   description:
    //     "Allow participants to upload and share files (PDF, images, ZIP) directly in the session chat panel with size limits enforced.",
    // },
    
    // {
    //   id: "ip-017",
    //   title: "Max MBPS Restriction (RTMP mode)",
    //   date: "Mar 22nd",
    //   tag: "Webinar",
    //   description:
    //     "Let admins cap the ingest bitrate per RTMP session to prevent a single broadcaster from saturating shared bandwidth.",
    // },
  ],
  released: [
    {
      id: "r-001",
      title: "API key for Access Log",
      date: "May 20th",
      tag: "CDN",
      description:
        "Introduce API keys for secure access to CDN access logs, allowing customers to programmatically retrieve and analyze their traffic data.",
    },
    {
    id: "r-cdn-001",
    title: "BUG: Gcore HTTP3 not working",
    date: "Apr 2nd",
    tag: "CDN",
    description:
      "Resolved an edge case where HTTP/3 connections were silently falling back to HTTP/1.1 on certain PoPs due to a misconfigured QUIC listener.",
  },

  {
      id: "r-cdn-003",
      title: "Unified Log Management",
      date: "Jan 28th",
      tag: "CDN",
      description:
        "Centralized log aggregation across all CDN zones with real-time streaming, filtering, and S3/HTTP export options.",
    },

  {
      id: "r-cdn-003",
      title: "Multi Access Rule Capability",
      date: "Apr 7th",
      tag: "CDN",
      description:
        "Allow multiple access rules (IP, referrer, country) to be applied simultaneously with independent enable/disable toggles for each rule type.",
    },
  {
      id: "r-cdn-001",
      title: "WAAP",
      date: "Jan 15th",
      tag: "CDN",
      description:
        "Apply multiple Web Application and API Protection rule sets per pull zone with independent enable/disable toggles.",
    },
  {
    id: "r-cdn-002",
    title: "HTTP2 & HTTP3 can be enabled together",
    date: "Apr 18th",
    tag: "CDN",
    description:
      "Removed the mutual exclusion between HTTP/2 and HTTP/3 — both protocols can now be enabled simultaneously per pull zone for maximum client compatibility.",
  },
  {
    id: "r-cdn-003",
    title: "RUM Data Sourcing",
    date: "May 10th",
    tag: "CDN",
    description:
      "Real User Monitoring data is now sourced directly from edge telemetry, giving more accurate TTFB, FCP, and LCP metrics per region.",
  },
  {
    id: "ls-001",
    title: "Live Push-Pull Features",
    date: "May 10th",
    tag: "CDN",
    description:
      "Real User Monitoring data is now sourced directly from edge telemetry, giving more accurate TTFB, FCP, and LCP metrics per region.",
  },
  // {
  //   id: "r-web-001",
  //   title: "Network Health Indicator",
  //   date: "Apr 5th",
  //   tag: "Webinar",
  //   description:
  //   "Display a real-time connection quality indicator for each participant so hosts can identify attendees with poor network conditions during a session.",
  // },
  // {
  //   id: "r-web-002",
  //   title: "Rejoin Button",
  //   date: "Apr 12th",
  //   tag: "Webinar",
  //   description:
  //     "Add a one-click rejoin button on the post-session screen so participants can quickly re-enter a room if they accidentally disconnected.",
  // },
  // {
  //   id: "r-web-003",
  //   title: "Active speaker highlight & profile card for webinar",
  //   date: "Apr 20th",
  //   tag: "Webinar",
  //   description:
  //     "Highlight the currently speaking participant's tile with a visual border and show a profile card with their name and role on hover.",
  // },
  // {
  //   id: "r-web-004",
  //   title: "Host Mute All",
  //   date: "Apr 28th",
  //   tag: "Webinar",
  //   description:
  //     "Allow hosts to mute all participants simultaneously with a single action, with an optional setting to prevent attendees from unmuting themselves.",
  // },
  ],

  },
};
