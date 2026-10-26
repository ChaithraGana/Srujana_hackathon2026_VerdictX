import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

sample_dir = os.path.join(os.path.dirname(__file__), "sample_certificates")
os.makedirs(sample_dir, exist_ok=True)

def generate_sample_cert(filepath, udyam_num, enterprise_name, enterprise_type, activity, state, date_reg):
    c = canvas.Canvas(filepath, pagesize=letter)
    width, height = letter
    
    # Border & Header
    c.setStrokeColor(colors.HexColor("#7f5f28"))
    c.setLineWidth(3)
    c.rect(30, 30, width - 60, height - 60)
    c.setLineWidth(1)
    c.rect(34, 34, width - 68, height - 68)

    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(width / 2, height - 70, "GOVERNMENT OF INDIA")
    c.setFont("Helvetica", 12)
    c.drawCentredString(width / 2, height - 90, "MINISTRY OF MICRO, SMALL AND MEDIUM ENTERPRISES")
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(colors.HexColor("#10233b"))
    c.drawCentredString(width / 2, height - 115, "UDYAM REGISTRATION CERTIFICATE")
    c.setFillColor(colors.black)

    # Line divider
    c.setStrokeColor(colors.HexColor("#c8a96e"))
    c.setLineWidth(1.5)
    c.line(50, height - 128, width - 50, height - 128)

    # Details Table
    y = height - 165
    row_height = 36
    
    fields = [
        ("UDYAM REGISTRATION NUMBER", udyam_num),
        ("NAME OF ENTERPRISE", enterprise_name),
        ("TYPE OF ENTERPRISE", enterprise_type),
        ("MAJOR ACTIVITY", activity),
        ("SOCIAL CATEGORY OF ENTREPRENEUR", "General"),
        ("NAME OF UNIT(S)", enterprise_name),
        ("OFFICIAL ADDRESS OF ENTERPRISE", f"Plot 44, MIDC Industrial Area, {state}, India"),
        ("DATE OF INCORPORATION", "14/03/2016"),
        ("DATE OF UDYAM REGISTRATION", date_reg),
        ("NATIONAL INDUSTRY CLASSIFICATION (NIC)", "2930 - Manufacture of parts and accessories for motor vehicles"),
        ("DISTRICT INDUSTRIES CENTRE (DIC)", f"DIC {state}")
    ]

    for label, val in fields:
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(colors.HexColor("#4a5568"))
        c.drawString(60, y, label)
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(colors.HexColor("#0d1b2a"))
        c.drawString(290, y, val)
        c.setStrokeColor(colors.HexColor("#e2e8f0"))
        c.setLineWidth(0.5)
        c.line(50, y - 8, width - 50, y - 8)
        y -= row_height

    # QR Code placeholder & Digital Signature Notice
    c.rect(width - 150, 60, 80, 80)
    c.setFont("Helvetica", 7)
    c.drawCentredString(width - 110, 100, "[ OFFICIAL QR ]")
    c.drawCentredString(width - 110, 90, "udyamregistration.gov.in")

    c.setFont("Helvetica-Oblique", 8)
    c.setFillColor(colors.HexColor("#718096"))
    c.drawString(60, 90, "* This is an authentic computer-generated statutory Udyam Certificate issued under MSMED Act, 2006.")
    c.drawString(60, 78, "Verification URL: https://udyamregistration.gov.in/Udyam_Verify.aspx")
    c.drawString(60, 66, "Digitally signed by the Ministry of MSME, Government of India.")

    c.save()
    print(f"Generated sample: {filepath}")

# 1. Valid Authentic Sample for Apex Precision Components
valid_path = os.path.join(sample_dir, "apex_precision_udyam_sample.pdf")
generate_sample_cert(
    valid_path,
    udyam_num="UDYAM-MH-26-0048291",
    enterprise_name="Apex Precision Components Pvt Ltd",
    enterprise_type="Small",
    activity="Manufacturing",
    state="Maharashtra",
    date_reg="15/10/2021"
)

# 2. Tampered / Mismatched Sample
fake_path = os.path.join(sample_dir, "tampered_fake_udyam_sample.pdf")
generate_sample_cert(
    fake_path,
    udyam_num="UDYAM-MH-99-9999999",
    enterprise_name="Fictitious Shell Impex Corp",
    enterprise_type="Micro",
    activity="Services",
    state="Maharashtra",
    date_reg="01/01/2025"
)
