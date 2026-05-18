export const RoadmapBoard = ({ data }) => {
  const roadmap = data;

  const [activeTask, setActiveTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [serverCounts, setServerCounts] = useState({});
  const [localCounts, setLocalCounts] = useState({});

  const disqusId = (id) => "rb-v2-" + id;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const apply = () => {
      if (mql.matches) {
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
      } else {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
      }
    };
    apply();
    mql.addEventListener("change", apply);
    return () => {
      mql.removeEventListener("change", apply);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const harvest = () => {
      const next = {};
      let changed = false;
      document
        .querySelectorAll(".rb-dsq-count[data-disqus-identifier]")
        .forEach((el) => {
          const id = el.getAttribute("data-disqus-identifier");
          const m = el.textContent.match(/(\d+)/);
          if (m) {
            next[id] = parseInt(m[1], 10);
            changed = true;
          }
        });
      if (changed) setServerCounts((prev) => ({ ...prev, ...next }));
    };
    const obs = new MutationObserver(harvest);
    document
      .querySelectorAll(".rb-dsq-count[data-disqus-identifier]")
      .forEach((el) =>
        obs.observe(el, { childList: true, characterData: true, subtree: true })
      );
    harvest();
    return () => obs.disconnect();
  }, [filter, activeTask]);

  useEffect(() => {
    if (!activeTask) return;
    const onKey = (e) => { if (e.key === "Escape") setActiveTask(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTask]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.DISQUSWIDGETS) {
      window.DISQUSWIDGETS.getCount({ reset: true });
      return;
    }
    if (document.getElementById("dsq-count-scr")) return;
    const s = document.createElement("script");
    s.src = "https://tenbyte-1.disqus.com/count.js";
    s.id = "dsq-count-scr";
    s.async = true;
    document.body.appendChild(s);
  }, [filter, activeTask]);

  useEffect(() => {
    if (!activeTask || typeof window === "undefined") return;

    const taskId = "rb-v2-" + activeTask.id;
    const taskTitle = activeTask.title;
    const basePath = window.location.pathname.replace(/\/$/, "");
    const taskUrl =
      window.location.origin + basePath + "/task/" + taskId;

    try {
      delete window.DISQUS;
    } catch (e) {
      window.DISQUS = undefined;
    }
    const prev = document.getElementById("dsq-embed-scr");
    if (prev) prev.remove();

    window.disqus_config = function () {
      this.page.url = taskUrl;
      this.page.identifier = taskId;
      this.page.title = taskTitle;
      this.callbacks.onNewComment = [
        function () {
          setLocalCounts((prev) => ({
            ...prev,
            [taskId]: (prev[taskId] || 0) + 1,
          }));
        },
      ];
    };

    const s = document.createElement("script");
    s.id = "dsq-embed-scr";
    s.src = "https://tenbyte-1.disqus.com/embed.js";
    s.setAttribute("data-timestamp", String(+new Date()));
    s.async = true;
    document.head.appendChild(s);
  }, [activeTask]);

  const columns = [
    { key: "planned", label: "Planned", cls: "rb-st-planned" },
    { key: "inProgress", label: "In Progress", cls: "rb-st-progress" },
    { key: "released", label: "Released", cls: "rb-st-released" },
  ];

  const tagOptions = ["All", ...roadmap.tags];
  const filterTasks = (tasks) =>
    filter === "All" ? tasks : tasks.filter((t) => t.tag === filter);

  const renderChip = (tag) => (
    <button
      key={tag}
      onClick={() => setFilter(tag)}
      className={filter === tag ? "rb-chip is-active" : "rb-chip"}
    >
      {tag}
    </button>
  );

  const renderCard = (task, col) => (
    <button
      key={task.id}
      onClick={() =>
        setActiveTask({
          ...task,
          _status: col.key,
          _statusLabel: col.label,
        })
      }
      className="rb-card"
    >
      <div className="rb-card-title">{task.title}</div>
      <div className="rb-card-date">{task.date}</div>
      <div className="rb-card-foot">
        <span className="rb-tag">{task.tag}</span>
        <span className="rb-card-comments">
          {(serverCounts[disqusId(task.id)] || 0) +
            (localCounts[disqusId(task.id)] || 0)}{" "}
          Comments
        </span>
        <span
          className="disqus-comment-count rb-dsq-count"
          data-disqus-identifier={disqusId(task.id)}
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
        >
          0
        </span>
      </div>
    </button>
  );

  const colIcon = (key) => {
    if (key === "planned")
      return (
        <svg className="rb-ico" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2.2" />
        </svg>
      );
    if (key === "inProgress")
      return (
        <svg className="rb-ico rb-ico-spin" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.6" />
          <path d="M8 2 a6 6 0 0 1 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    return (
      <svg className="rb-ico" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="currentColor" />
        <path d="M4.8 8.3 L7 10.5 L11.2 6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const renderColumn = (col) => {
    const tasks = filterTasks(roadmap.columns[col.key] || []);
    return (
      <div key={col.key} className={`rb-col ${col.cls}`}>
        <div className="rb-col-head">
          <div className="rb-col-label">
            {colIcon(col.key)}
            {col.label}
          </div>
          <span className="rb-count">{tasks.length}</span>
        </div>

        <div className="rb-card-list">
          {tasks.map((task) => renderCard(task, col))}
          {tasks.length === 0 && (
            <div className="rb-empty">Nothing here yet.</div>
          )}
        </div>
      </div>
    );
  };

  const renderModal = () => (
    <div
      onClick={() => setActiveTask(null)}
      className="rb-modal-bg"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rb-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rb-modal"
        data-status={activeTask._status}
      >
        <div className="rb-modal-inner">
          <div className="rb-modal-top">
            <div className="rb-modal-status">
              <span className="rb-modal-status-dot" />
              {activeTask._statusLabel}
            </div>
            <button
              onClick={() => setActiveTask(null)}
              className="rb-close"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="rb-modal-head">
            <h2 id="rb-modal-title">{activeTask.title}</h2>
          </div>

          <div className="rb-modal-meta">
            <span className="rb-tag">{activeTask.tag}</span>
            <span className="rb-meta-sep" />
            <span className="rb-meta-date">
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="3.5" width="12" height="11" rx="1.5" />
                <path d="M2 7h12M5.5 2v3M10.5 2v3" strokeLinecap="round" />
              </svg>
              {activeTask.date}
            </span>
          </div>

          <div className="rb-modal-divider" />

          <p className="rb-modal-body">
            {activeTask.description || "No description yet."}
          </p>

          <div className="rb-modal-disqus">
            <div id="disqus_thread" />
          </div>
        </div>

        <div className="rb-modal-foot">
          <span className="rb-modal-id">{activeTask.id}</span>
          <span className="rb-kbd">
            <span>press</span>
            <kbd>Esc</kbd>
            <span>to close</span>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rb-root w-full not-prose">
      <style>{`
        .rb-root {
          color: rgb(var(--gray-900));
          height: calc(100dvh - 8rem);
          padding-bottom: 0.75rem;
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        @media (max-width: 1023px) {
          .rb-root {
            height: auto; padding-bottom: 0;
            overflow: visible;
          }
        }
        .dark .rb-root { color: rgb(var(--gray-100)); }

        .rb-hero {
          margin: 0 0 24px;
          padding: 0;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
        }
        .rb-hero-text { flex: 1; min-width: 0; }
        .rb-eyebrow {
          font-size: 14px; font-weight: 600; margin: 0 0 10px;
          color: rgb(var(--primary));
          letter-spacing: -0.005em;
        }
        .rb-title {
          margin: 0; font-size: 30px; font-weight: 700;
          letter-spacing: -0.025em; line-height: 1.15;
          color: rgb(var(--gray-900));
        }
        .dark .rb-title { color: rgb(var(--gray-100)); }
        .rb-subtitle {
          margin: 8px 0 0; font-size: 15px; line-height: 1.5;
          color: rgb(var(--gray-500));
        }
        .dark .rb-subtitle { color: rgb(var(--gray-400)); }
        .rb-toolbar { margin: 0; justify-content: flex-end; }

        .rb-chip {
          padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
          background: #fff; color: rgb(var(--gray-700));
          border: 1px solid rgb(var(--gray-200));
        }
        .dark .rb-chip {
          background: rgb(var(--gray-900));
          color: rgb(var(--gray-300));
          border-color: rgb(var(--gray-800));
        }
        .rb-chip:hover { border-color: rgb(var(--gray-400)); }
        .dark .rb-chip:hover { border-color: rgb(var(--gray-600)); }
        .rb-chip.is-active {
          background: rgb(var(--primary)); color: #fff; border-color: rgb(var(--primary));
        }

        .rb-board { width: 100%; min-width: 0; flex: 1; min-height: 0; }
        .rb-col {
          min-width: 0;
          border-radius: 12px; padding: 16px;
          height: 100%; min-height: 0;
          display: flex; flex-direction: column;
          background: rgb(var(--gray-50) / 0.7);
          border: 1px solid rgb(var(--gray-200) / 0.7);
        }
        .dark .rb-col {
          background: rgb(var(--gray-900) / 0.4);
          border-color: rgb(var(--gray-800) / 0.7);
        }
        @media (max-width: 1023px) {
          .rb-col { height: auto; min-height: 0; }
        }
        .rb-card-title, .rb-card-date { word-break: break-word; overflow-wrap: anywhere; }

        .rb-col-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .rb-col-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; }
        .rb-ico { flex-shrink: 0; }
        @keyframes rb-spin { to { transform: rotate(360deg); } }
        .rb-ico-spin { animation: rb-spin 2.6s linear infinite; transform-origin: 50% 50%; }
        .rb-count {
          font-size: 11px; padding: 2px 6px; border-radius: 4px; font-variant-numeric: tabular-nums;
          background: rgb(var(--gray-200) / 0.5); color: rgb(var(--gray-600));
        }
        .dark .rb-count {
          background: rgb(var(--gray-800) / 0.6); color: rgb(var(--gray-400));
        }

        .rb-st-planned .rb-col-label { color: rgb(var(--gray-600)); }
        .dark .rb-st-planned .rb-col-label { color: rgb(var(--gray-400)); }

        .rb-st-progress .rb-col-label { color: rgb(var(--primary)); }

        .rb-st-released .rb-col-label { color: #029C69; }
        .dark .rb-st-released .rb-col-label { color: #04C684; }

        .rb-card-list {
          display: flex; flex-direction: column; gap: 10px;
          flex: 1; min-height: 0;
          overflow-y: auto; padding-right: 2px;
          scrollbar-width: none; -ms-overflow-style: none;
        }
        .rb-card-list::-webkit-scrollbar { width: 0; height: 0; display: none; }
        @media (max-width: 1023px) {
          .rb-card-list { max-height: none; overflow: visible; padding-right: 0; flex: none; }
        }
        .rb-card {
          text-align: left; width: 100%;
          height: 116px; flex-shrink: 0;
          display: flex; flex-direction: column; justify-content: space-between;
          border-radius: 8px; padding: 14px; cursor: pointer;
          transition: all 0.15s;
          background: #fff; border: 1px solid rgb(var(--gray-200));
        }
        .dark .rb-card {
          background: rgb(var(--gray-900)); border-color: rgb(var(--gray-800));
        }
        .rb-card:hover {
          border-color: rgb(var(--primary));
          box-shadow:
            0 0 0 3px rgb(var(--primary) / 0.12),
            0 4px 14px -8px rgb(var(--primary) / 0.30);
        }
        .rb-card-title {
          font-weight: 600; font-size: 13px; line-height: 1.4; margin-bottom: 6px;
          color: rgb(var(--gray-900));
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dark .rb-card-title { color: rgb(var(--gray-100)); }
        .rb-card-date { font-size: 12px; margin-bottom: 10px; color: rgb(var(--gray-500)); }
        .dark .rb-card-date { color: rgb(var(--gray-400)); }
        .rb-card-foot { display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
        .rb-card-comments { font-size: 11px; color: rgb(var(--gray-500)); font-variant-numeric: tabular-nums; }
        .dark .rb-card-comments { color: rgb(var(--gray-400)); }
        .rb-tag {
          padding: 2px 8px; border-radius: 4px; font-size: 11px;
          background: rgb(var(--gray-100)); color: rgb(var(--gray-600));
        }
        .dark .rb-tag {
          background: rgb(var(--gray-800)); color: rgb(var(--gray-300));
        }

        .rb-empty {
          text-align: center; padding: 32px 0; font-size: 12px; border-radius: 6px;
          color: rgb(var(--gray-400));
          border: 1px dashed rgb(var(--gray-300) / 0.7);
        }
        .dark .rb-empty {
          color: rgb(var(--gray-500));
          border-color: rgb(var(--gray-700) / 0.7);
        }

        @keyframes rb-modal-in {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes rb-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .rb-modal-bg {
          position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 20px;
          background: rgb(0 0 0 / 0.45); backdrop-filter: blur(3px);
          animation: rb-fade-in 0.18s ease-out;
        }
        .dark .rb-modal-bg { background: rgb(0 0 0 / 0.75); }

        .rb-modal {
          position: relative;
          border-radius: 16px; max-width: 36rem; width: 100%;
          max-height: 85vh; display: flex; flex-direction: column;
          background: #fff; border: 1px solid rgb(var(--gray-200));
          box-shadow: 0 30px 70px -20px rgb(0 0 0 / 0.4), 0 0 0 1px rgb(0 0 0 / 0.04);
          overflow: hidden;
          animation: rb-modal-in 0.24s cubic-bezier(0.16, 1, 0.3, 1);
          --rb-accent: rgb(var(--primary));
          --rb-accent-soft: rgb(var(--primary) / 0.10);
        }
        .dark .rb-modal {
          background: rgb(var(--gray-900)); border-color: rgb(var(--gray-800));
          box-shadow: 0 30px 70px -20px rgb(0 0 0 / 0.8), 0 0 0 1px rgb(255 255 255 / 0.04);
        }
        .rb-modal[data-status="planned"] {
          --rb-accent: rgb(var(--gray-500));
          --rb-accent-soft: rgb(var(--gray-400) / 0.18);
        }
        .rb-modal[data-status="released"] {
          --rb-accent: #029C69;
          --rb-accent-soft: rgb(2 156 105 / 0.12);
        }
        .dark .rb-modal[data-status="released"] {
          --rb-accent: #04C684;
          --rb-accent-soft: rgb(4 198 132 / 0.14);
        }

        .rb-modal::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--rb-accent);
        }
        .rb-modal::after {
          content: ''; position: absolute; top: 0; right: -40px; width: 280px; height: 180px;
          background: radial-gradient(ellipse at top right, var(--rb-accent-soft), transparent 70%);
          pointer-events: none;
        }

        .rb-modal-inner { position: relative; padding: 28px 28px 24px; overflow-y: auto; flex: 1; }

        .rb-modal-disqus {
          margin-top: 24px; padding-top: 20px;
          border-top: 1px solid rgb(var(--gray-200) / 0.7);
        }
        .dark .rb-modal-disqus { border-top-color: rgb(var(--gray-800) / 0.7); }

        .rb-modal-top {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; margin-bottom: 14px;
        }
        .rb-modal-status {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px 4px 8px; border-radius: 999px;
          background: var(--rb-accent-soft);
          color: var(--rb-accent);
          font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
        }
        .rb-modal-status-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--rb-accent);
          box-shadow: 0 0 0 3px var(--rb-accent-soft);
        }

        .rb-modal-head { margin-bottom: 14px; }
        .rb-modal h2 {
          margin: 0; font-size: 22px; font-weight: 700; line-height: 1.25;
          letter-spacing: -0.015em;
          color: rgb(var(--gray-900));
        }
        .dark .rb-modal h2 { color: rgb(var(--gray-100)); }

        .rb-close {
          flex-shrink: 0;
          width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
          border-radius: 8px; cursor: pointer; font-size: 18px; line-height: 1;
          background: rgb(var(--gray-100) / 0.6); border: 1px solid rgb(var(--gray-200) / 0.7);
          color: rgb(var(--gray-500));
          transition: all 0.15s;
        }
        .dark .rb-close {
          background: rgb(var(--gray-800) / 0.5); border-color: rgb(var(--gray-700) / 0.5);
          color: rgb(var(--gray-400));
        }
        .rb-close:hover {
          background: rgb(var(--gray-200));
        }
        .dark .rb-close:hover {
          background: rgb(var(--gray-700));
        }

        .rb-modal-meta {
          display: flex; align-items: center; gap: 8px; margin-bottom: 18px;
          font-size: 12px;
        }
        .rb-meta-date {
          display: inline-flex; align-items: center; gap: 5px;
          color: rgb(var(--gray-500)); font-variant-numeric: tabular-nums;
        }
        .dark .rb-meta-date { color: rgb(var(--gray-400)); }
        .rb-meta-sep {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgb(var(--gray-300));
        }
        .dark .rb-meta-sep { background: rgb(var(--gray-700)); }

        .rb-modal-divider {
          height: 1px; margin: 0 0 18px;
          background: linear-gradient(90deg, rgb(var(--gray-200)) 0%, transparent 100%);
        }
        .dark .rb-modal-divider {
          background: linear-gradient(90deg, rgb(var(--gray-800)) 0%, transparent 100%);
        }

        .rb-modal-body {
          font-size: 14px; line-height: 1.65; margin: 0;
          color: rgb(var(--gray-700));
        }
        .dark .rb-modal-body { color: rgb(var(--gray-300)); }

        .rb-modal-foot {
          margin-top: 22px; padding: 12px 28px;
          background: rgb(var(--gray-50) / 0.7);
          border-top: 1px solid rgb(var(--gray-200) / 0.7);
          display: flex; align-items: center; justify-content: space-between;
          font-size: 11px; font-variant-numeric: tabular-nums;
          color: rgb(var(--gray-500));
        }
        .dark .rb-modal-foot {
          background: rgb(var(--gray-950) / 0.5);
          border-top-color: rgb(var(--gray-800) / 0.7);
          color: rgb(var(--gray-400));
        }
        .rb-modal-id {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .rb-kbd {
          display: inline-flex; align-items: center; gap: 4px;
        }
        .rb-kbd kbd {
          font-family: inherit; font-size: 10px;
          padding: 1px 5px; border-radius: 4px; line-height: 1.4;
          background: rgb(var(--gray-100)); border: 1px solid rgb(var(--gray-200));
          color: rgb(var(--gray-700));
        }
        .dark .rb-kbd kbd {
          background: rgb(var(--gray-800)); border-color: rgb(var(--gray-700));
          color: rgb(var(--gray-300));
        }

        .rb-chip:focus-visible, .rb-card:focus-visible, .rb-close:focus-visible {
          outline: 2px solid rgb(var(--primary)); outline-offset: 2px;
        }
      `}</style>
      <div className="rb-hero">
        <div className="rb-hero-text">
          <div className="rb-eyebrow">Roadmap</div>
          <h1 className="rb-title">Product Roadmap</h1>
          <p className="rb-subtitle">
            What we're building across Tenbyte CDN, Cloud, and Vidinfra.
          </p>
        </div>
        <div className="rb-toolbar flex flex-wrap gap-1.5">
          {tagOptions.map(renderChip)}
        </div>
      </div>

      <div className="rb-board grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {columns.map(renderColumn)}
      </div>

      {activeTask && renderModal()}
    </div>
  );
};
