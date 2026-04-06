# trading-wave-analysis

Elliott Wave intelligence skill for ava-claw. Feeds human wave analysis into the jgt-analysis-intelligence layer via MCP tools.

## MCP Tools Used

All calls route through **jgt-analysis-mcp** (`:8091`):

| Tool                     | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `ingest_analysis`        | Store a wave count artifact                  |
| `check_wave_alignment`   | Multi-TF alignment score for an instrument   |
| `get_wave_positions`     | Current wave positions by instrument         |
| `analyze_wave_structure` | Batch analysis across instruments/timeframes |
| `propose_fdb_entry`      | Propose entry when alignment is strong       |
| `invalidate_wave_count`  | Mark a wave count as invalidated             |

## Data Flow

```
Guillaume observes wave structure
        │
        ▼
   ava-claw (this skill)
   Parses natural language → structured wave count
        │
        ▼
   jgt-analysis-mcp (:8091)
   MCP tool call (e.g. ingest_analysis)
        │
        ▼
   jgt-analysis-intelligence (:8085)
   FastAPI endpoints (POST /api/v1/artifacts)
        │
        ▼
   PostgreSQL
   Persistent wave count storage
        │
        ▼
   Alignment queries aggregate across TFs
   GET /api/v1/artifacts/alignment/{instrument}
```

## Alignment Scoring

The alignment score (0.0–1.0) aggregates wave agreement across stored timeframes:

- **Direction agreement** — are all TFs pointing the same way?
- **Wave phase coherence** — are HTF impulses supported by LTF entries? (e.g., D1 Wave 3 + H4 Wave 1 start = strong)
- **Confidence weighting** — higher-confidence counts contribute more
- **Freshness decay** — older counts are weighted less (stale data → lower score)
- **Conflict penalty** — opposing directions across TFs reduce the score

| Score       | Interpretation                                |
| ----------- | --------------------------------------------- |
| ≥ 0.85      | Strong alignment — high-conviction setup      |
| 0.70 – 0.84 | Moderate — minor conflicts, proceed carefully |
| 0.50 – 0.69 | Weak — significant disagreement, wait         |
| < 0.50      | No alignment — waves conflict, do not enter   |

## Timeframe Ranks

```
M1(MN1)=1  W1=2  D1=3  H4=4  H1=5  m30=6  m15=7  m5=8
```

Higher-rank (lower number) timeframes dominate alignment. A W1 impulse outweighs an H1 correction.

## Related Skills

- **trading-htf-analysis** — Alligator-based structure analysis (complementary to wave counts)
- **trading-gate-assessment** — Full ARIANE Four Faces evaluation (run after strong alignment)
- **trading-order-execution** — Place trades after entry proposal
- **trading-signal-scan** — FDB/fractal signal detection (entry timing)
