.report-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .report-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid var(--gris-suave); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .report-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(2,132,199,0.14); }
        .report-card img { width: 100%; height: 100px; object-fit: cover; }
        .report-card-body { padding: 14px; }
        .report-card-body h4 { font-size: 14px; color: var(--estructura-menus); margin-bottom: 4px; }
        .report-card-body p { font-size: 12px; color: #64748b; }
        .report-card-footer { padding: 10px 14px; border-top: 1px solid var(--gris-suave); display: flex; justify-content: flex-end; }
        /* Chart bars */
        .chart-wrap { margin-top: 16px; }
        .chart-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .chart-label { font-size: 12px; color: #64748b; width: 100px; flex-shrink: 0; }
        .chart-bar-bg { flex: 1; background: #f1f5f9; border-radius: 20px; height: 22px; overflow: hidden; }
        .chart-bar-fill { height: 100%; border-radius: 20px; display: flex; align-items: center; padding-left: 10px; font-size: 11px; font-weight: 700; color: white; }
        .bar-azul { background: linear-gradient(to right, #0284C7, #38bdf8); }
        .bar-verde { background: linear-gradient(to right, #16A34A, #4ade80); }
        .bar-amarillo { background: linear-gradient(to right, #EAB308, #facc15); }
        .bar-rojo { background: linear-gradient(to right, #DC2626, #f87171); }
        /* Donut-like rings visual */
        .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .kpi-box { background: #f8fafc; border-radius: 10px; padding: 18px; text-align: center; border: 1px solid var(--gris-suave); }
        .kpi-value { font-size: 28px; font-weight: 800; font-family: 'Montserrat', sans-serif; margin-bottom: 4px; }
        .kpi-label { font-size: 12px; color: #64748b; }
        .kpi-change { font-size: 11px; font-weight: 600; margin-top: 6px; }
        .kpi-up { color: #16A34A; }
        .kpi-down { color: #DC2626; }
        .top-services { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
        .top-svc-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border-radius: 8px; font-size: 13px; }
        .top-svc-item span:first-child { color: var(--estructura-menus); font-weight: 500; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
