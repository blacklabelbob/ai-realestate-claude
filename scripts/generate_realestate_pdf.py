#!/usr/bin/env python3
"""
AI Real Estate Analyst — Premium Property Report PDF Generator
==============================================================

Builds a branded, title-company / realtor-grade multi-page PDF deliverable
from a single structured JSON file. Designed to be reusable: point it at any
property's `property-data-*.json` and it renders a complete report.

Sections
  1. Branded cover (wordmark, address, composite score gauge, grade, signal,
     headline verdict, key facts, date)
  2. Executive summary (strengths, risks, recommendation, suggested offer)
  3. Score breakdown (5 weighted categories with bars)
  4. Comparable sales (zebra table + summary)
  5. Rental cash-flow model + investment metrics grid + mortgage box
  6. Neighborhood + market evidence with trailing data AND source citations
  7. Methodology note (logic explained, engine kept proprietary)
  8. Risk factors + action items
  9. Footer on every page (page #, brand, "not investment advice")

Requires: reportlab  (pip3 install reportlab)

Usage
  python3 generate_realestate_pdf.py                          # demo data
  python3 generate_realestate_pdf.py data.json               # -> PROPERTY-REPORT.pdf
  python3 generate_realestate_pdf.py data.json out.pdf       # custom output
"""

import sys
import json
from datetime import datetime

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.colors import HexColor, white
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_JUSTIFY
    from reportlab.platypus import (
        BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
        TableStyle, PageBreak, Flowable, NextPageTemplate,
    )
    from reportlab.pdfgen import canvas as canvaslib
    from reportlab.pdfbase.pdfmetrics import stringWidth
except ImportError:
    print("Error: reportlab is required. Install with: pip3 install reportlab")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Brand palette
# ---------------------------------------------------------------------------
NAVY        = HexColor("#1a2332")
NAVY_2      = HexColor("#243347")
NAVY_3      = HexColor("#2f4055")
FOREST      = HexColor("#2d8a4e")
FOREST_LT   = HexColor("#3aaf63")
GOLD        = HexColor("#c9982e")
GOLD_LT     = HexColor("#e0b84a")
CREAM       = HexColor("#f8f6f1")
CREAM_2     = HexColor("#efece3")
DANGER      = HexColor("#c0473f")
INFO        = HexColor("#3d7ab8")
INK         = HexColor("#1e2733")
INK_SOFT    = HexColor("#4a5763")
MUTE        = HexColor("#8a96a3")
BORDER      = HexColor("#d8d2c4")
ROW_ALT     = HexColor("#f5f2ea")
LINE_GOLD   = GOLD

PAGE_W, PAGE_H = letter
MARGIN_X = 54
MARGIN_TOP = 96      # leaves room for the running header band
MARGIN_BOTTOM = 56   # leaves room for the footer
CONTENT_W = PAGE_W - 2 * MARGIN_X

BRAND = "AI Real Estate Analyst"
FOOTER_NOTE = "AI-generated research — not investment advice."

DISCLAIMER_TEXT = (
    "<b>Important disclaimer.</b> This report is produced by an AI research engine for "
    "educational and informational purposes only. It is <b>not</b> financial, legal, tax, "
    "or investment advice and is not a recommendation to buy, sell, or finance any property. "
    "Values, rents, projections, and scores are AI-generated estimates derived from publicly "
    "available data and may differ from actual figures. Mortgage and tax figures are "
    "illustrative and depend on borrower profile and current assessed value. Always verify "
    "every figure with licensed New Jersey real estate, appraisal, inspection, legal, and tax "
    "professionals before transacting. No liability is accepted for decisions made on the basis "
    "of this document."
)


# ---------------------------------------------------------------------------
# Score helpers
# ---------------------------------------------------------------------------
def score_color(s):
    if s >= 70:
        return FOREST
    if s >= 45:
        return GOLD
    return DANGER


def score_grade(s):
    return ("A+" if s >= 85 else "A" if s >= 70 else "B" if s >= 55
            else "C" if s >= 40 else "D" if s >= 25 else "F")


def property_signal(s):
    return ("STRONG BUY" if s >= 85 else "BUY" if s >= 70 else "HOLD / WATCH" if s >= 55
            else "CAUTION" if s >= 40 else "PASS" if s >= 25 else "AVOID")


def signal_color(s):
    if s >= 70:
        return FOREST
    if s >= 55:
        return GOLD
    if s >= 40:
        return GOLD
    return DANGER


# ---------------------------------------------------------------------------
# Custom flowables
# ---------------------------------------------------------------------------
class SectionHeader(Flowable):
    """A navy header band with a gold accent rule and section label/number."""

    def __init__(self, number, title, width=CONTENT_W):
        super().__init__()
        self.number = number
        self.title = title
        self.width = width
        self.height = 30

    def wrap(self, aw, ah):
        return self.width, self.height

    def draw(self):
        c = self.canv
        h = self.height
        # band
        c.setFillColor(NAVY)
        c.roundRect(0, 0, self.width, h, 4, stroke=0, fill=1)
        # gold left accent
        c.setFillColor(GOLD)
        c.rect(0, 0, 5, h, stroke=0, fill=1)
        # number chip
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(18, h / 2 - 5, f"{self.number:02d}")
        # title
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(46, h / 2 - 5, self.title.upper())


class ScoreGauge(Flowable):
    """Circular composite-score gauge with a colored progress arc."""

    def __init__(self, score, size=132):
        super().__init__()
        self.score = score
        self.size = size

    def wrap(self, aw, ah):
        return self.size, self.size

    def draw(self):
        import math
        c = self.canv
        s = self.size
        cx = cy = s / 2
        r = s / 2 - 6
        col = score_color(self.score)
        # track
        c.setLineWidth(11)
        c.setStrokeColor(HexColor("#33425a"))
        c.circle(cx, cy, r, stroke=1, fill=0)
        # progress arc
        c.setStrokeColor(col)
        c.setLineCap(1)
        extent = 360.0 * (self.score / 100.0)
        p = c.beginPath()
        steps = max(2, int(extent / 4))
        for i in range(steps + 1):
            a = math.radians(90 - (extent * i / steps))
            x = cx + r * math.cos(a)
            y = cy + r * math.sin(a)
            if i == 0:
                p.moveTo(x, y)
            else:
                p.lineTo(x, y)
        c.drawPath(p, stroke=1, fill=0)
        # number
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 40)
        c.drawCentredString(cx, cy - 6, str(int(self.score)))
        c.setFillColor(HexColor("#b9c4d1"))
        c.setFont("Helvetica", 10)
        c.drawCentredString(cx, cy - 24, "OUT OF 100")


class BarRow(Flowable):
    """A single labeled horizontal score bar with weight + value."""

    def __init__(self, label, score, weight, width=CONTENT_W,
                 label_w=178, value_w=86):
        super().__init__()
        self.label = label
        self.score = score
        self.weight = weight
        self.width = width
        self.label_w = label_w
        self.value_w = value_w
        self.height = 26

    def wrap(self, aw, ah):
        return self.width, self.height

    def draw(self):
        c = self.canv
        h = self.height
        col = score_color(self.score)
        # label
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 9.5)
        ly = h / 2 - 3 if self.weight else h / 2 - 5
        c.drawString(0, ly, self.label)
        # weight subtitle (only when a weight is supplied)
        if self.weight:
            c.setFillColor(MUTE)
            c.setFont("Helvetica", 7.5)
            c.drawString(0, h / 2 - 13, f"weight {self.weight}")
        # track
        bar_x = self.label_w
        bar_w = self.width - self.label_w - self.value_w
        bar_h = 12
        by = h / 2 - bar_h / 2
        c.setFillColor(CREAM_2)
        c.roundRect(bar_x, by, bar_w, bar_h, 3, stroke=0, fill=1)
        # fill
        fw = max(4, bar_w * (self.score / 100.0))
        c.setFillColor(col)
        c.roundRect(bar_x, by, fw, bar_h, 3, stroke=0, fill=1)
        # value
        c.setFillColor(col)
        c.setFont("Helvetica-Bold", 11)
        c.drawRightString(self.width, h / 2 - 4, f"{int(self.score)}")
        c.setFillColor(MUTE)
        c.setFont("Helvetica", 8)
        c.drawRightString(self.width, h / 2 - 14, "/ 100")


class Rule(Flowable):
    def __init__(self, width=CONTENT_W, color=BORDER, thickness=0.8, pad=0):
        super().__init__()
        self.width = width
        self.color = color
        self.thickness = thickness
        self.pad = pad
        self.height = thickness + pad

    def wrap(self, aw, ah):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.setStrokeColor(self.color)
        c.setLineWidth(self.thickness)
        c.line(0, self.height / 2, self.width, self.height / 2)


# ---------------------------------------------------------------------------
# Paragraph styles
# ---------------------------------------------------------------------------
def get_styles():
    base = getSampleStyleSheet()
    S = {}
    S["body"] = ParagraphStyle("body", parent=base["Normal"], fontName="Helvetica",
                               fontSize=9.5, leading=14, textColor=INK, spaceAfter=6)
    S["body_just"] = ParagraphStyle("bodyj", parent=S["body"], alignment=TA_JUSTIFY)
    S["small"] = ParagraphStyle("small", parent=S["body"], fontSize=8, leading=11,
                                spaceAfter=3)
    S["small_white"] = ParagraphStyle("smallw", parent=S["small"], textColor=white)
    S["sub"] = ParagraphStyle("sub", parent=base["Normal"], fontName="Helvetica-Bold",
                              fontSize=11, textColor=NAVY, spaceBefore=10, spaceAfter=5)
    S["sub_gold"] = ParagraphStyle("subg", parent=S["sub"], textColor=GOLD)
    S["kicker"] = ParagraphStyle("kicker", parent=base["Normal"], fontName="Helvetica-Bold",
                                 fontSize=8, textColor=GOLD, spaceAfter=2, leading=10)
    S["disclaimer"] = ParagraphStyle("disc", parent=base["Normal"], fontName="Helvetica",
                                     fontSize=6.8, leading=9, textColor=INK_SOFT)
    S["cell"] = ParagraphStyle("cell", parent=base["Normal"], fontName="Helvetica",
                               fontSize=8, leading=10.5, textColor=INK)
    S["cell_b"] = ParagraphStyle("cellb", parent=S["cell"], fontName="Helvetica-Bold")
    S["source"] = ParagraphStyle("source", parent=base["Normal"], fontName="Helvetica",
                                 fontSize=7, leading=10, textColor=INFO)
    S["bullet"] = ParagraphStyle("bullet", parent=S["body"], leftIndent=14,
                                 bulletIndent=2, spaceAfter=5)
    return S


# ---------------------------------------------------------------------------
# Table style helper
# ---------------------------------------------------------------------------
def table_style(extra=None, header=True, fontsize=8.5, zebra=True):
    cmds = [
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), fontsize),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, BORDER),
        ("LINEBELOW", (0, -1), (-1, -1), 0.8, NAVY),
    ]
    if header:
        cmds += [
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("TEXTCOLOR", (0, 0), (-1, 0), white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 8.5),
            ("TOPPADDING", (0, 0), (-1, 0), 7),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
            ("LINEBELOW", (0, 0), (-1, 0), 1.2, GOLD),
        ]
        if zebra:
            cmds.append(("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, ROW_ALT]))
    if extra:
        cmds.extend(extra)
    return TableStyle(cmds)


# ---------------------------------------------------------------------------
# Page frame (header band + footer) drawn on every content page
# ---------------------------------------------------------------------------
class ReportCanvas(canvaslib.Canvas):
    """Canvas that paints the running header/footer and final page numbers."""

    def __init__(self, *args, meta=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.meta = meta or {}
        self._saved = []

    def showPage(self):
        self._saved.append(dict(self.__dict__))
        self._startPage()  # type: ignore[attr-defined]  # reportlab Canvas internal

    def save(self):
        total = len(self._saved)
        for st in self._saved:
            self.__dict__.update(st)
            self._draw_frame(total)
            super().showPage()
        super().save()

    def _draw_frame(self, total):
        page = self._pageNumber  # type: ignore[attr-defined]  # reportlab Canvas internal
        is_cover = (page == 1)
        if is_cover:
            return  # cover paints its own full-bleed art
        addr = self.meta.get("address_short", "")
        # ---- header band ----
        self.saveState()
        self.setFillColor(NAVY)
        self.rect(0, PAGE_H - 64, PAGE_W, 64, stroke=0, fill=1)
        self.setFillColor(GOLD)
        self.rect(0, PAGE_H - 67, PAGE_W, 3, stroke=0, fill=1)
        # wordmark
        self.setFillColor(white)
        self.setFont("Helvetica-Bold", 12)
        self.drawString(MARGIN_X, PAGE_H - 34, "AI Real Estate")
        self.setFillColor(GOLD)
        self.drawString(MARGIN_X + stringWidth("AI Real Estate", "Helvetica-Bold", 12),
                        PAGE_H - 34, " Analyst")
        self.setFillColor(HexColor("#9fb0c2"))
        self.setFont("Helvetica", 7.5)
        self.drawString(MARGIN_X, PAGE_H - 46, "PROPERTY INVESTMENT RESEARCH REPORT")
        # right side: address
        self.setFillColor(white)
        self.setFont("Helvetica-Bold", 9)
        self.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 32, addr)
        self.setFillColor(HexColor("#9fb0c2"))
        self.setFont("Helvetica", 7.5)
        self.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 44,
                             self.meta.get("date", ""))
        # ---- footer ----
        self.setStrokeColor(BORDER)
        self.setLineWidth(0.6)
        self.line(MARGIN_X, 40, PAGE_W - MARGIN_X, 40)
        self.setFillColor(MUTE)
        self.setFont("Helvetica", 7.2)
        self.drawString(MARGIN_X, 30, f"{BRAND}  ·  {FOOTER_NOTE}")
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(NAVY)
        self.drawRightString(PAGE_W - MARGIN_X, 30, f"Page {page} of {total}")
        self.restoreState()


# ---------------------------------------------------------------------------
# Cover page (drawn directly on canvas via onPage callback)
# ---------------------------------------------------------------------------
def make_cover_drawer(data):
    overall = data.get("overall_score", 0)
    address = data.get("address", "")
    price = data.get("price", "")
    date_str = data.get("date", datetime.now().strftime("%B %d, %Y"))
    pd = data.get("property_details", {})
    verdict = data.get("recommendation", {}).get("headline") or _default_headline(data)

    def draw(canv, doc):
        c = canv
        c.saveState()
        # full navy background
        c.setFillColor(NAVY)
        c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
        # subtle top gradient block
        c.setFillColor(NAVY_2)
        c.rect(0, PAGE_H - 250, PAGE_W, 250, stroke=0, fill=1)
        # gold top hairline + bottom band
        c.setFillColor(GOLD)
        c.rect(0, PAGE_H - 8, PAGE_W, 8, stroke=0, fill=1)

        # ---- wordmark lockup ----
        top = PAGE_H - 86
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 26)
        c.drawString(MARGIN_X, top, "AI Real Estate")
        c.setFillColor(GOLD)
        c.drawString(MARGIN_X + stringWidth("AI Real Estate", "Helvetica-Bold", 26),
                     top, " Analyst")
        c.setStrokeColor(GOLD)
        c.setLineWidth(1.5)
        c.line(MARGIN_X, top - 12, MARGIN_X + 250, top - 12)
        c.setFillColor(HexColor("#9fb0c2"))
        c.setFont("Helvetica", 10.5)
        c.drawString(MARGIN_X, top - 28, "PROPERTY  INVESTMENT  RESEARCH  REPORT")

        # ---- kicker + address ----
        ay = PAGE_H - 270
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(MARGIN_X, ay + 26, "SUBJECT PROPERTY")
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 23)
        # wrap address if long
        addr_lines = _wrap(address, "Helvetica-Bold", 23, CONTENT_W)
        ly = ay
        for line in addr_lines:
            c.drawString(MARGIN_X, ly, line)
            ly -= 27
        c.setFillColor(HexColor("#cfd8e2"))
        c.setFont("Helvetica", 13)
        c.drawString(MARGIN_X, ly - 2, price)

        # ---- score card block ----
        card_y = 278
        card_h = 188
        c.setFillColor(NAVY_3)
        c.roundRect(MARGIN_X, card_y, CONTENT_W, card_h, 10, stroke=0, fill=1)
        c.setStrokeColor(HexColor("#3f5168"))
        c.setLineWidth(1)
        c.roundRect(MARGIN_X, card_y, CONTENT_W, card_h, 10, stroke=1, fill=0)

        # gauge on left of card
        gx = MARGIN_X + 30
        gy = card_y + card_h / 2
        _draw_gauge(c, gx + 66, gy, 64, overall)

        # grade + signal on right of gauge
        tx = MARGIN_X + 190
        c.setFillColor(HexColor("#9fb0c2"))
        c.setFont("Helvetica-Bold", 9)
        c.drawString(tx, card_y + card_h - 30, "COMPOSITE PROPERTY SCORE")
        grade = score_grade(overall)
        gcol = score_color(overall)
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(tx, card_y + card_h - 52, "Grade")
        c.setFillColor(gcol)
        c.setFont("Helvetica-Bold", 30)
        c.drawString(tx + 56, card_y + card_h - 58, grade)

        # signal pill
        sig = property_signal(overall)
        scol = signal_color(overall)
        pill_y = card_y + 44
        pill_w = stringWidth(sig, "Helvetica-Bold", 14) + 34
        c.setFillColor(scol)
        c.roundRect(tx, pill_y, pill_w, 30, 15, stroke=0, fill=1)
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 14)
        c.drawCentredString(tx + pill_w / 2, pill_y + 10, sig)
        c.setFillColor(HexColor("#9fb0c2"))
        c.setFont("Helvetica-Bold", 9)
        c.drawString(tx, pill_y + 38, "INVESTMENT SIGNAL")

        # quick facts column on far right of card
        fx = MARGIN_X + CONTENT_W - 150
        c.setStrokeColor(HexColor("#3f5168"))
        c.setLineWidth(0.8)
        c.line(fx - 18, card_y + 20, fx - 18, card_y + card_h - 20)
        facts = [
            ("BEDS", str(pd.get("beds", "--"))),
            ("BATHS", str(pd.get("baths", "--"))),
            ("SQ FT", str(pd.get("sqft", "--"))),
            ("BUILT", str(pd.get("year_built", "--"))),
        ]
        fy = card_y + card_h - 34
        for lab, val in facts:
            c.setFillColor(HexColor("#9fb0c2"))
            c.setFont("Helvetica", 8)
            c.drawString(fx, fy, lab)
            c.setFillColor(white)
            c.setFont("Helvetica-Bold", 13)
            c.drawRightString(MARGIN_X + CONTENT_W - 4, fy - 1, val)
            fy -= 36

        # ---- headline verdict band ----
        vb_y = 150
        c.setFillColor(GOLD)
        c.roundRect(MARGIN_X, vb_y, CONTENT_W, 76, 8, stroke=0, fill=1)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(MARGIN_X + 18, vb_y + 56, "THE VERDICT")
        c.setFillColor(NAVY)
        vlines = _wrap(verdict, "Helvetica-Bold", 12.5, CONTENT_W - 36)[:3]
        vy = vb_y + 38
        for line in vlines:
            c.setFont("Helvetica-Bold", 12.5)
            c.drawString(MARGIN_X + 18, vy, line)
            vy -= 17

        # ---- date + disclaimer footer ----
        c.setFillColor(HexColor("#9fb0c2"))
        c.setFont("Helvetica", 9)
        c.drawString(MARGIN_X, 118, f"Report generated  {date_str}")
        c.setFont("Helvetica", 6.4)
        c.setFillColor(HexColor("#8493a4"))
        disc = ("Educational and informational use only — not financial, legal, tax, or "
                "investment advice. AI-generated estimates from public data; verify all figures "
                "with licensed professionals before transacting.")
        dl = _wrap(disc, "Helvetica", 6.4, CONTENT_W)
        dy = 96
        for line in dl:
            c.drawString(MARGIN_X, dy, line)
            dy -= 9
        # bottom gold band
        c.setFillColor(GOLD)
        c.rect(0, 0, PAGE_W, 6, stroke=0, fill=1)
        c.restoreState()

    return draw


def _draw_gauge(c, cx, cy, r, score):
    import math
    col = score_color(score)
    c.saveState()
    c.setLineCap(1)
    c.setLineWidth(10)
    c.setStrokeColor(HexColor("#46596f"))
    c.circle(cx, cy, r, stroke=1, fill=0)
    c.setStrokeColor(col)
    extent = 360.0 * (score / 100.0)
    p = c.beginPath()
    steps = max(2, int(extent / 4))
    for i in range(steps + 1):
        a = math.radians(90 - (extent * i / steps))
        x = cx + r * math.cos(a)
        y = cy + r * math.sin(a)
        if i == 0:
            p.moveTo(x, y)
        else:
            p.lineTo(x, y)
    c.drawPath(p, stroke=1, fill=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 34)
    c.drawCentredString(cx, cy - 6, str(int(score)))
    c.setFillColor(HexColor("#b9c4d1"))
    c.setFont("Helvetica", 8)
    c.drawCentredString(cx, cy - 22, "/ 100")
    c.restoreState()


def _wrap(text, font, size, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def _default_headline(data):
    sig = data.get("recommendation", {}).get("signal", "")
    score = data.get("overall_score", 0)
    if score >= 70:
        return "Strong fundamentals and favorable economics support a confident buy."
    if score >= 55:
        return ("Elite location and schools, but the leveraged investment math is "
                "challenging — best for an owner-occupant or all-cash buyer.")
    return "Significant headwinds outweigh the upside at the current entry price."


# ---------------------------------------------------------------------------
# Build the report
# ---------------------------------------------------------------------------
def generate_report(data, output_path):
    S = get_styles()
    overall = data.get("overall_score", 0)
    address = data.get("address", "")
    date_str = data.get("date", datetime.now().strftime("%B %d, %Y"))

    meta = {
        "address_short": address.split(",")[0] if address else "",
        "date": date_str,
    }

    doc = BaseDocTemplate(
        output_path, pagesize=letter,
        leftMargin=MARGIN_X, rightMargin=MARGIN_X,
        topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM,
        title=f"Property Report — {meta['address_short']}",
        author=BRAND,
    )

    content_frame = Frame(MARGIN_X, MARGIN_BOTTOM, CONTENT_W,
                          PAGE_H - MARGIN_TOP - MARGIN_BOTTOM, id="content",
                          leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, id="cover")

    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame],
                     onPage=make_cover_drawer(data)),
        PageTemplate(id="content", frames=[content_frame]),
    ])

    E = []
    # cover page is a single page break (art drawn by onPage)
    E.append(NextPageTemplate("content"))
    E.append(PageBreak())

    _executive_summary(E, S, data)
    _score_breakdown(E, S, data)
    _comps(E, S, data)
    _cashflow(E, S, data)
    _neighborhood_market(E, S, data)
    _methodology(E, S, data)
    _risks_actions(E, S, data)

    def _canvas_maker(*args, **kwargs):
        return ReportCanvas(*args, meta=meta, **kwargs)

    doc.build(E, canvasmaker=_canvas_maker)
    return output_path


# ---- Section 1: Executive Summary -----------------------------------------
def _executive_summary(E, S, data):
    rec = data.get("recommendation", {})
    overall = data.get("overall_score", 0)
    E.append(SectionHeader(1, "Executive Summary"))
    E.append(Spacer(1, 12))

    # verdict strip
    sig = rec.get("signal", property_signal(overall))
    offer = rec.get("suggested_offer", "")
    strip = Table(
        [[Paragraph("INVESTMENT SIGNAL", S["small"]),
          Paragraph("COMPOSITE SCORE", S["small"]),
          Paragraph("SUGGESTED OFFER", S["small"])],
         [Paragraph(f'<b>{sig}</b>', ParagraphStyle("z", parent=S["body"],
                    fontSize=13, textColor=signal_color(overall), fontName="Helvetica-Bold")),
          Paragraph(f'<b>{int(overall)}/100 &nbsp; ({score_grade(overall)})</b>',
                    ParagraphStyle("z2", parent=S["body"], fontSize=13,
                                   textColor=score_color(overall), fontName="Helvetica-Bold")),
          Paragraph(f'<b>{offer}</b>', ParagraphStyle("z3", parent=S["body"],
                    fontSize=9.5, textColor=NAVY, fontName="Helvetica-Bold"))]],
        colWidths=[CONTENT_W * 0.30, CONTENT_W * 0.26, CONTENT_W * 0.44])
    strip.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("BOX", (0, 0), (-1, -1), 0.8, BORDER),
        ("LINEAFTER", (0, 0), (-2, -1), 0.8, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    E.append(strip)
    E.append(Spacer(1, 12))

    # summary narrative
    summ = rec.get("summary", "")
    if summ:
        E.append(Paragraph("Analyst Summary", S["sub"]))
        E.append(Paragraph(summ, S["body_just"]))
        E.append(Spacer(1, 6))

    # strengths + risks two columns
    strengths = _derive_strengths(data)
    risks = _top_risks(data)
    left = [Paragraph('<b>Key Strengths</b>',
                      ParagraphStyle("kh", parent=S["sub"], textColor=FOREST, spaceBefore=0))]
    for s in strengths:
        left.append(Paragraph(f"▸ {s}", S["bullet"]))
    right = [Paragraph('<b>Key Risks</b>',
                       ParagraphStyle("rh", parent=S["sub"], textColor=DANGER, spaceBefore=0))]
    for r in risks:
        right.append(Paragraph(f"▸ {r}", S["bullet"]))

    cols = Table([[left, right]], colWidths=[CONTENT_W / 2 - 8, CONTENT_W / 2 - 8])
    cols.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 12),
        ("LEFTPADDING", (1, 0), (1, 0), 12),
        ("BACKGROUND", (0, 0), (0, 0), HexColor("#f2f8f4")),
        ("BACKGROUND", (1, 0), (1, 0), HexColor("#fbf2f1")),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LINEABOVE", (0, 0), (0, 0), 2, FOREST),
        ("LINEABOVE", (1, 0), (1, 0), 2, DANGER),
        ("LEFTPADDING", (0, 0), (0, 0), 10),
    ]))
    E.append(cols)


def _derive_strengths(data):
    out = []
    n = data.get("neighborhood", {})
    cats = data.get("categories", {})
    details = {d.get("factor"): d for d in n.get("details", [])}
    if "School District" in details:
        out.append(f"Elite schools: {details['School District']['detail']}.")
    if "Crime Rate" in details:
        out.append(f"Very safe: {details['Crime Rate']['detail']}.")
    if cats.get("Value & Comps", {}).get("score", 0) >= 65:
        cs = data.get("comp_summary", {})
        out.append(f"Priced below comp average ({cs.get('avg_price','')} avg) — "
                   "entry discount to fair market value.")
    if "Median Income" in details:
        out.append(f"Affluent, supply-constrained area (median HHI {details['Median Income']['detail']}).")
    demo = n.get("demographics", {})
    if demo.get("major_employers"):
        out.append(f"Durable employer base: {demo['major_employers']}.")
    return out[:5] or ["Strong location fundamentals."]


def _top_risks(data):
    out = []
    for rf in data.get("risk_factors", [])[:5]:
        out.append(f"{rf.get('factor','')}: {rf.get('notes','')}")
    return out


# ---- Section 2: Score breakdown -------------------------------------------
def _score_breakdown(E, S, data):
    E.append(Spacer(1, 16))
    E.append(SectionHeader(2, "Composite Score Breakdown"))
    E.append(Spacer(1, 12))

    E.append(Paragraph(
        "The composite score is the weighted sum of five independently scored "
        "categories (each 0–100). Weights are fixed across every property so "
        "scores are comparable.", S["body"]))
    E.append(Spacer(1, 6))

    cats = data.get("categories", {})
    for name, v in cats.items():
        if isinstance(v, dict):
            sc, wt = v.get("score", 0), v.get("weight", "")
        else:
            sc, wt = v, ""
        E.append(BarRow(name, sc, wt))
        E.append(Spacer(1, 4))

    E.append(Spacer(1, 6))
    E.append(Rule())
    E.append(Spacer(1, 6))

    overall = data.get("overall_score", 0)
    tot = Table([[
        Paragraph("COMPOSITE", ParagraphStyle("ct", parent=S["body"],
                  fontName="Helvetica-Bold", fontSize=10, textColor=NAVY)),
        Paragraph(f'<b>{int(overall)}/100</b>', ParagraphStyle("cv", parent=S["body"],
                  fontName="Helvetica-Bold", fontSize=14, textColor=score_color(overall),
                  alignment=TA_RIGHT)),
        Paragraph(f'<b>Grade {score_grade(overall)} &nbsp;·&nbsp; {property_signal(overall)}</b>',
                  ParagraphStyle("cg", parent=S["body"], fontName="Helvetica-Bold",
                                 fontSize=11, textColor=NAVY, alignment=TA_RIGHT))]],
        colWidths=[CONTENT_W * 0.4, CONTENT_W * 0.22, CONTENT_W * 0.38])
    tot.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("BOX", (0, 0), (-1, -1), 1, GOLD),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
    ]))
    E.append(tot)


# ---- Section 3: Comps -----------------------------------------------------
def _comps(E, S, data):
    E.append(Spacer(1, 16))
    E.append(SectionHeader(3, "Comparable Sales Analysis"))
    E.append(Spacer(1, 12))

    comps = data.get("comps", [])
    head = ["Comparable Address", "Sale Price", "Sq Ft", "$ / Sq Ft", "Sold", "Distance"]
    rows: list = [head]
    for c in comps:
        rows.append([
            Paragraph(c.get("address", ""), S["cell_b"]),
            c.get("price", ""), c.get("sqft", ""), c.get("price_sqft", ""),
            c.get("sold_date", ""), c.get("distance", ""),
        ])
    t = Table(rows, colWidths=[CONTENT_W * 0.30, CONTENT_W * 0.16, CONTENT_W * 0.12,
                               CONTENT_W * 0.14, CONTENT_W * 0.14, CONTENT_W * 0.14])
    t.setStyle(table_style([("ALIGN", (1, 0), (-1, -1), "CENTER"),
                            ("ALIGN", (0, 0), (0, -1), "LEFT")]))
    E.append(t)
    E.append(Spacer(1, 10))

    cs = data.get("comp_summary", {})
    summ = Table([[
        Paragraph("COMP AVERAGE PRICE", S["small"]),
        Paragraph(f"<b>{cs.get('avg_price','')}</b>", S["cell_b"]),
        Paragraph("AVERAGE $ / SQ FT", S["small"]),
        Paragraph(f"<b>{cs.get('avg_price_sqft','')}</b>", S["cell_b"])]],
        colWidths=[CONTENT_W * 0.27, CONTENT_W * 0.23, CONTENT_W * 0.27, CONTENT_W * 0.23])
    summ.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("BOX", (0, 0), (-1, -1), 0.8, BORDER),
        ("LINEAFTER", (1, 0), (1, 0), 0.8, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
    ]))
    E.append(summ)
    E.append(Spacer(1, 6))
    E.append(Paragraph(
        "Comparable sales are drawn from recent transactions of similar homes within "
        "approximately half a mile. Subject value is triangulated from the average "
        "price-per-square-foot applied to the subject's living area, then adjusted for "
        "condition relative to renovated comps.", S["small"]))


# ---- Section 4: Cash flow + metrics + mortgage ----------------------------
def _cashflow(E, S, data):
    E.append(SectionHeader(4, "Rental Cash-Flow Model"))
    E.append(Spacer(1, 12))

    E.append(Paragraph("Monthly &amp; Annual Operating Statement", S["sub"]))
    cf = data.get("cashflow", {}).get("items", [])
    rows: list = [["Line Item", "Monthly", "Annual"]]
    net_idx = None
    for i, it in enumerate(cf, 1):
        rows.append([it.get("item", ""), it.get("monthly", ""), it.get("annual", "")])
        if "net" in it.get("item", "").lower():
            net_idx = i
    t = Table(rows, colWidths=[CONTENT_W * 0.56, CONTENT_W * 0.22, CONTENT_W * 0.22])
    extra = [("ALIGN", (1, 0), (-1, -1), "RIGHT")]
    if net_idx:
        extra += [
            ("BACKGROUND", (0, net_idx), (-1, net_idx), NAVY),
            ("TEXTCOLOR", (0, net_idx), (-1, net_idx), white),
            ("FONTNAME", (0, net_idx), (-1, net_idx), "Helvetica-Bold"),
            ("LINEBELOW", (0, net_idx), (-1, net_idx), 0, white),
        ]
    t.setStyle(table_style(extra))
    E.append(t)
    E.append(Spacer(1, 14))

    # Investment metrics grid (2 cols of cards)
    E.append(Paragraph("Key Investment Metrics", S["sub"]))
    im = data.get("investment_metrics", {})
    metric_defs = [
        ("Cap Rate", im.get("cap_rate"), im.get("cap_rate_status")),
        ("Cash-on-Cash", im.get("cash_on_cash"), im.get("coc_status")),
        ("Gross Rent Multiplier", im.get("grm"), im.get("grm_status")),
        ("DSCR", im.get("dscr"), im.get("dscr_status")),
        ("1% Rule", im.get("one_pct"), im.get("one_pct_status")),
        ("Break-Even Occupancy", im.get("breakeven"), im.get("breakeven_status")),
    ]
    cards = []
    for label, val, note in metric_defs:
        cell = [
            Paragraph(label.upper(), ParagraphStyle("ml", parent=S["small"],
                      fontName="Helvetica-Bold", textColor=NAVY, fontSize=7.5, spaceAfter=2)),
            Paragraph(f"<b>{val or '--'}</b>", ParagraphStyle("mv", parent=S["body"],
                      fontSize=15, textColor=GOLD, fontName="Helvetica-Bold", spaceAfter=2)),
            Paragraph(note or "", ParagraphStyle("mn", parent=S["small"],
                      fontSize=7, leading=9, textColor=INK_SOFT)),
        ]
        cards.append(cell)
    grid_rows = [[cards[i], cards[i + 1]] for i in range(0, len(cards), 2)]
    gw = CONTENT_W / 2 - 5
    g = Table(grid_rows, colWidths=[gw, gw])
    gstyle = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("BOX", (0, 0), (-1, -1), 0.8, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.8, BORDER),
    ]
    g.setStyle(TableStyle(gstyle))
    E.append(g)
    E.append(Spacer(1, 14))

    # Mortgage box
    E.append(Paragraph("Financing Assumptions", S["sub"]))
    m = data.get("mortgage", {})
    mrows = [
        ["Purchase Price", m.get("purchase_price", ""), "Interest Rate", m.get("rate", "")],
        ["Down Payment", m.get("down_payment", ""), "Loan Term", m.get("term", "")],
        ["Loan Amount", m.get("loan_amount", ""), "Monthly P&I", m.get("monthly_pi", "")],
        ["", "", "Total PITI", m.get("monthly_piti", "")],
    ]
    mt = Table(mrows, colWidths=[CONTENT_W * 0.22, CONTENT_W * 0.28,
                                 CONTENT_W * 0.22, CONTENT_W * 0.28])
    mt.setStyle(TableStyle([
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTNAME", (2, 0), (2, -1), "Helvetica-Bold"),
        ("TEXTCOLOR", (0, 0), (0, -1), NAVY),
        ("TEXTCOLOR", (2, 0), (2, -1), NAVY),
        ("TEXTCOLOR", (1, 0), (1, -1), INK),
        ("TEXTCOLOR", (3, 0), (3, -1), INK),
        ("BACKGROUND", (0, 0), (0, -1), CREAM),
        ("BACKGROUND", (2, 0), (2, -1), CREAM),
        ("FONTNAME", (3, 3), (3, 3), "Helvetica-Bold"),
        ("TEXTCOLOR", (3, 3), (3, 3), GOLD),
        ("GRID", (0, 0), (-1, -1), 0.6, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    E.append(mt)


# ---- Section 5: Neighborhood + Market + sources ---------------------------
def _neighborhood_market(E, S, data):
    E.append(SectionHeader(5, "Neighborhood & Market Evidence"))
    E.append(Spacer(1, 12))

    n = data.get("neighborhood", {})
    scores = n.get("scores", {})
    if scores:
        E.append(Paragraph("Neighborhood Scorecard", S["sub"]))
        for name, sc in scores.items():
            E.append(BarRow(name, sc, "", label_w=150))
            E.append(Spacer(1, 3))
        E.append(Spacer(1, 8))

    # neighborhood facts table
    details = n.get("details", [])
    if details:
        rows: list = [["Factor", "Reading", "Notes"]]
        for d in details:
            rows.append([
                Paragraph(d.get("factor", ""), S["cell_b"]),
                Paragraph(d.get("detail", ""), S["cell"]),
                Paragraph(d.get("notes", ""), S["cell"]),
            ])
        t = Table(rows, colWidths=[CONTENT_W * 0.24, CONTENT_W * 0.34, CONTENT_W * 0.42])
        t.setStyle(table_style([("VALIGN", (0, 0), (-1, -1), "TOP")]))
        E.append(t)
        E.append(Spacer(1, 14))

    # Market evidence with trailing data
    mev = data.get("market_evidence", {})
    metrics = mev.get("metrics", _default_market_metrics())
    E.append(Paragraph("Local Market Snapshot (trailing data)", S["sub"]))
    rows: list = [["Metric", "Value", "Source"]]
    for met in metrics:
        rows.append([
            Paragraph(met.get("metric", ""), S["cell_b"]),
            Paragraph(met.get("value", ""), S["cell"]),
            Paragraph(met.get("source", ""), S["cell"]),
        ])
    t = Table(rows, colWidths=[CONTENT_W * 0.40, CONTENT_W * 0.26, CONTENT_W * 0.34])
    t.setStyle(table_style([("VALIGN", (0, 0), (-1, -1), "TOP")]))
    E.append(t)
    E.append(Spacer(1, 12))

    # Source citations
    sources = mev.get("sources", _default_sources())
    E.append(Paragraph("Sources &amp; Citations", S["sub_gold"]))
    E.append(Paragraph(
        "Every market and neighborhood claim above is traceable to a named public source. "
        "Figures may differ across providers due to methodology and refresh cadence.",
        S["small"]))
    E.append(Spacer(1, 4))
    src_cells = []
    for s in sources:
        src_cells.append(Paragraph(f"• {s}", S["source"]))
    # two-column source layout
    half = (len(src_cells) + 1) // 2
    col1 = src_cells[:half]
    col2 = src_cells[half:]
    while len(col2) < len(col1):
        col2.append(Paragraph("", S["source"]))
    src_table = Table([[col1, col2]], colWidths=[CONTENT_W / 2 - 6, CONTENT_W / 2 - 6])
    src_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 12),
    ]))
    E.append(src_table)


def _default_market_metrics():
    return [
        {"metric": "Median sale price (08057, Jan 2026)", "value": "$650,000", "source": "Redfin — 08057 ZIP"},
        {"metric": "Typical home value (Zillow ZHVI)", "value": "$687,748", "source": "Zillow — Moorestown Twp"},
        {"metric": "Trailing 12-mo median sale price", "value": "$741,250", "source": "Homes.com"},
        {"metric": "YoY price change (08057)", "value": "+4.0%", "source": "Redfin (Jan 2026 YoY)"},
        {"metric": "YoY price change (ZHVI)", "value": "+6.5%", "source": "Zillow"},
        {"metric": "Months of supply (NJ)", "value": "~3.2 (seller-leaning)", "source": "DeFalco Realty"},
        {"metric": "Days on market (Burlington Co.)", "value": "~38 days", "source": "Mike Sells NJ (Mar 2026)"},
        {"metric": "30-yr fixed rate (NJ, May 2026)", "value": "6.39% – 6.63%", "source": "Bankrate / NerdWallet"},
        {"metric": "School district rank", "value": "Niche A+, #16 in NJ", "source": "Niche 2026"},
        {"metric": "Anchor employer", "value": "Lockheed Martin ~4,500–5,200 jobs", "source": "Lockheed Martin / Choose NJ"},
    ]


def _default_sources():
    return [
        "Redfin — 08057 Housing Market",
        "Zillow — Moorestown Township ZHVI",
        "Homes.com — Moorestown Recently Sold",
        "Movoto — Moorestown Market Trends",
        "Redfin — Burlington County Housing Market",
        "DeFalco Realty — NJ Housing Market Spring 2026",
        "Bankrate / NerdWallet — NJ Mortgage Rates May 2026",
        "FRED — Median Days on Market / Rental Vacancy NJ",
        "Niche / US News — Moorestown Schools 2026",
        "Lockheed Martin / Choose NJ — Moorestown campus",
        "US Census / ACS — income & demographics",
        "Tax Foundation / Sunlight Policy Center — NJ migration",
    ]


# ---- Section 6: Methodology -----------------------------------------------
def _methodology(E, S, data):
    E.append(SectionHeader(6, "Methodology"))
    E.append(Spacer(1, 12))

    method = data.get("methodology")
    if not method:
        method = (
            "Five specialist analytical passes — comparable sales, rental cash flow, "
            "neighborhood, investment strategy, and local market — each score the property "
            "0–100 from public records and recent sales. Scores are combined on a fixed "
            "weighting (comparables 25%; income, neighborhood, and upside 20% each; market "
            "conditions 15%) to produce the composite Property Score. Conservative assumptions "
            "are applied throughout, and every input is traceable to a named public source."
        )
    E.append(Paragraph(method, S["body_just"]))
    E.append(Spacer(1, 8))

    steps = [
        ("Comparable Sales", "Recent nearby transactions establish a price-per-square-foot band; the subject is valued and condition-adjusted against it."),
        ("Rental Cash Flow", "Market rents minus vacancy, debt service, taxes, insurance, maintenance, management, and reserves yield net cash flow and yield metrics."),
        ("Neighborhood", "Schools, safety, income, walkability, and growth are scored from public ratings and census data."),
        ("Investment Strategy", "Buy-and-hold, BRRRR, and fix-and-flip feasibility are stress-tested against the deal math."),
        ("Local Market", "Price momentum, inventory, days-on-market, rates, and economic anchors classify the market and set the appreciation outlook."),
    ]
    rows: list = [["Analytical Pass", "What it does"]]
    for name, desc in steps:
        rows.append([Paragraph(name, S["cell_b"]), Paragraph(desc, S["cell"])])
    t = Table(rows, colWidths=[CONTENT_W * 0.26, CONTENT_W * 0.74])
    t.setStyle(table_style([("VALIGN", (0, 0), (-1, -1), "TOP")]))
    E.append(t)
    E.append(Spacer(1, 8))
    E.append(Paragraph(
        "<i>The scoring weights and rubric shown here are intentionally summarized; the "
        "underlying engine, prompts, and calibration are proprietary.</i>",
        ParagraphStyle("propr", parent=S["small"], textColor=INK_SOFT)))


# ---- Section 7: Risks + actions -------------------------------------------
def _risks_actions(E, S, data):
    E.append(SectionHeader(7, "Risk Factors & Action Items"))
    E.append(Spacer(1, 12))

    E.append(Paragraph("Risk Register", S["sub"]))
    rows: list = [["Risk Factor", "Likelihood", "Impact", "Notes"]]
    rf_rows_meta = []
    for rf in data.get("risk_factors", []):
        rows.append([
            Paragraph(rf.get("factor", ""), S["cell_b"]),
            rf.get("probability", ""), rf.get("impact", ""),
            Paragraph(rf.get("notes", ""), S["cell"]),
        ])
    t = Table(rows, colWidths=[CONTENT_W * 0.20, CONTENT_W * 0.15,
                               CONTENT_W * 0.13, CONTENT_W * 0.52])
    extra = [("ALIGN", (1, 0), (2, -1), "CENTER"), ("VALIGN", (0, 0), (-1, -1), "TOP")]
    t.setStyle(table_style(extra))
    E.append(t)
    E.append(Spacer(1, 14))

    rec = data.get("recommendation", {})
    actions = rec.get("action_items", [])
    if actions:
        E.append(Paragraph("Recommended Due-Diligence Actions", S["sub"]))
        a_rows = []
        for i, a in enumerate(actions, 1):
            a_rows.append([
                Paragraph(f"<b>{i}</b>", ParagraphStyle("an", parent=S["body"],
                          fontName="Helvetica-Bold", textColor=white, alignment=TA_CENTER)),
                Paragraph(a, S["cell"]),
            ])
        at = Table(a_rows, colWidths=[26, CONTENT_W - 26])
        at.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), FOREST),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ("LEFTPADDING", (1, 0), (1, -1), 10),
            ("ROWBACKGROUNDS", (1, 0), (1, -1), [white, ROW_ALT]),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, BORDER),
            ("BOX", (0, 0), (-1, -1), 0.8, BORDER),
        ]))
        E.append(at)

    E.append(Spacer(1, 16))
    E.append(Rule(color=GOLD, thickness=1.2))
    E.append(Spacer(1, 8))
    E.append(Paragraph(DISCLAIMER_TEXT, S["disclaimer"]))


# ---------------------------------------------------------------------------
# Demo data
# ---------------------------------------------------------------------------
def get_demo_data():
    return {
        "address": "4821 Ridgeview Drive, Austin, TX 78735",
        "price": "$425,000 (list)",
        "date": datetime.now().strftime("%B %d, %Y"),
        "overall_score": 72,
        "property_details": {"beds": "3", "baths": "2", "sqft": "1,850",
                             "year_built": "1998", "lot_size": "0.18 acres",
                             "property_type": "Single Family Residence"},
        "categories": {
            "Value & Comps": {"score": 74, "weight": "25%"},
            "Income Potential": {"score": 62, "weight": "20%"},
            "Neighborhood Quality": {"score": 78, "weight": "20%"},
            "Investment Upside": {"score": 72, "weight": "20%"},
            "Market Conditions": {"score": 68, "weight": "15%"},
        },
        "comps": [
            {"address": "135 Oak Ave", "price": "$412,000", "sqft": "1,780", "price_sqft": "$231", "sold_date": "Mar 2026", "distance": "0.3 mi"},
            {"address": "204 Elm St", "price": "$438,500", "sqft": "1,920", "price_sqft": "$228", "sold_date": "Feb 2026", "distance": "0.5 mi"},
            {"address": "89 Pine Dr", "price": "$405,000", "sqft": "1,750", "price_sqft": "$231", "sold_date": "Jan 2026", "distance": "0.7 mi"},
            {"address": "312 Cedar Ln", "price": "$445,000", "sqft": "2,010", "price_sqft": "$221", "sold_date": "Mar 2026", "distance": "0.4 mi"},
        ],
        "comp_summary": {"avg_price": "$425,125", "avg_price_sqft": "$228/sq ft"},
        "cashflow": {"items": [
            {"item": "Gross Rental Income", "monthly": "$2,200", "annual": "$26,400"},
            {"item": "Vacancy Loss (8%)", "monthly": "-$176", "annual": "-$2,112"},
            {"item": "Effective Gross Income", "monthly": "$2,024", "annual": "$24,288"},
            {"item": "Mortgage (P&I)", "monthly": "-$1,285", "annual": "-$15,420"},
            {"item": "Property Taxes", "monthly": "-$354", "annual": "-$4,250"},
            {"item": "Insurance", "monthly": "-$125", "annual": "-$1,500"},
            {"item": "Maintenance (5%)", "monthly": "-$110", "annual": "-$1,320"},
            {"item": "Property Mgmt (10%)", "monthly": "-$202", "annual": "-$2,429"},
            {"item": "Net Cash Flow", "monthly": "-$52", "annual": "-$631"},
        ]},
        "investment_metrics": {
            "cap_rate": "5.2%", "cap_rate_status": "Fair — above 5% threshold",
            "cash_on_cash": "3.8%", "coc_status": "Below average — aim for 8%+",
            "grm": "16.1x", "grm_status": "Average for metro",
            "dscr": "1.05", "dscr_status": "Tight — lenders prefer 1.25+",
            "one_pct": "0.52%", "one_pct_status": "Below 1% — appreciation market",
            "breakeven": "92%", "breakeven_status": "Low vacancy tolerance",
        },
        "mortgage": {"purchase_price": "$425,000", "down_payment": "$85,000 (20%)",
                     "loan_amount": "$340,000", "rate": "6.75%", "term": "30-yr fixed",
                     "monthly_pi": "$2,205", "monthly_piti": "$2,684"},
        "neighborhood": {
            "scores": {"School Rating": 78, "Safety / Crime": 72, "Walkability": 65,
                       "Transit Access": 55, "Dining & Shopping": 82, "Growth Trajectory": 88},
            "details": [
                {"factor": "School District", "detail": "Austin ISD — 7/10", "notes": "Strong elementary"},
                {"factor": "Crime Rate", "detail": "22% below city avg", "notes": "Trending down 3 years"},
                {"factor": "Median Income", "detail": "$78,500", "notes": "12% above metro"},
            ],
            "demographics": {"major_employers": "Tech, University, Healthcare"},
        },
        "recommendation": {
            "signal": "BUY",
            "headline": "Strong appreciation play in a high-growth submarket; negotiate on price.",
            "summary": "Solid buy-and-hold opportunity in a high-growth neighborhood.",
            "suggested_offer": "$405,000 - $415,000",
            "action_items": ["Get a professional inspection.", "Verify rents with 3 managers."],
        },
        "risk_factors": [
            {"factor": "Market Risk", "probability": "Medium", "impact": "High", "notes": "Cyclical correction risk."},
        ],
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    if len(sys.argv) < 2 or sys.argv[1] == "--demo":
        data = get_demo_data()
        out = sys.argv[2] if len(sys.argv) > 2 else "PROPERTY-REPORT-sample.pdf"
        generate_report(data, out)
        print(f"Sample report generated: {out}")
        return

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "PROPERTY-REPORT.pdf"
    with open(input_file, "r") as f:
        data = json.load(f)
    generate_report(data, output_file)
    print(f"Report generated: {output_file}")


if __name__ == "__main__":
    main()
