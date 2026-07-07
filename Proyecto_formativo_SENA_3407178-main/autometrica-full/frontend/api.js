.repair-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .repair-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid var(--gris-suave); box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s; }
        .repair-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(2,132,199,0.12); }
        .repair-card img { width: 100%; height: 130px; object-fit: cover; }
        .repair-card-body { padding: 14px; }
        .repair-card-body h4 { font-size: 15px; color: var(--estructura-menus); margin-bottom: 6px; }
        .repair-card-body p { font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 10px; }
        .repair-card-footer { padding: 10px 14px; border-top: 1px solid var(--gris-suave); display: flex; justify-content: space-between; align-items: center; background: #fafafa; }
        .price-tag { font-size: 15px; font-weight: 700; color: #16A34A; font-family: 'Montserrat', sans-serif; }
        .progress-bar-wrap { background: #e2e8f0; border-radius: 20px; height: 8px; margin-top: 8px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 20px; }
        .fill-proceso { background: #EAB308; width: 60%; }
        .fill-inicio { background: #0284C7; width: 20%; }
        .fill-finalizado { background: #16A34A; width: 100%; }
        .technician-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 12px; color: #64748b; }
        .technician-row img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
        .timeline-repair { display: flex; flex-direction: column; gap: 0; }
        .timeline-item { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #f1f5f9; }
        .timeline-item:last-child { border-bottom: none; }
        .timeline-dot-col { display: flex; flex-direction: column; align-items: center; }
        .tl-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .tl-line { width: 2px; flex: 1; background: var(--gris-suave); margin: 4px 0; }
        .tl-dot-proceso { background: #EAB308; }
        .tl-dot-inicio { background: #0284C7; }
        .tl-dot-finalizado { background: #16A34A; }
        .timeline-content h4 { font-size: 14px; color: var(--estructura-menus); margin-bottom: 4px; }
        .timeline-content p { font-size: 12px; color: #64748b; }
        .timeline-content .tl-meta { font-size: 11px; color: #94a3b8; margin-top: 4px; }
