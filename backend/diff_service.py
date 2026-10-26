from models import LegalDiffResponse, DiffRow

DIFF_DATABASE = {
    "CASE_A_GST_E_INVOICING": LegalDiffResponse(
        case_id="CASE_A_GST_E_INVOICING",
        notification="Notification No. 10/2023 — Central Tax",
        date="10 May 2023 (Effective: 01 Aug 2023)",
        citation="CBIC · CGST Rules, 2017 · Rule 48(4) · Amending Notification 13/2020",
        official_url="https://gstcouncil.gov.in/node/4365",
        previous=[
            DiffRow(no="1", text="In the said notification, in the first paragraph, for the words", mark="normal"),
            DiffRow(no="2", text="₹10 crore [ten crore rupees]", mark="removed"),
            DiffRow(no="3", text="the words shall be substituted with effect from the 1st day of August, 2023.", mark="normal")
        ],
        amended=[
            DiffRow(no="1", text="In the said notification, in the first paragraph, for the words", mark="normal"),
            DiffRow(no="2", text="₹5 crore [five crore rupees]", mark="inserted"),
            DiffRow(no="3", text="the words shall be substituted with effect from the 1st day of August, 2023.", mark="normal")
        ],
        summary_of_change="The mandatory e-invoicing aggregate turnover threshold was reduced from ₹10 Crore to ₹5 Crore for B2B supplies, effective 1 August 2023.",
        why_it_matters="Mid-sized MSMEs between ₹5Cr and ₹10Cr turnover must now generate electronic invoices with an IRN and QR code to ensure their buyers can claim Input Tax Credit (ITC).",
        what_stayed_same="The technical invoice schema, IRP portals (NIC), and statutory exclusions (SEZ units, GTA, banking, passenger transport) under Rule 48(4) remain unchanged."
    ),
    "CASE_B_MAHARASHTRA_WAGES": LegalDiffResponse(
        case_id="CASE_B_MAHARASHTRA_WAGES",
        notification="Notification No. MWA-42010/CR-1301/Lab-7",
        date="20 July 2010",
        citation="Government of Maharashtra · Labour and Employment · Minimum Wages Act, 1948",
        official_url="https://labour.maharashtra.gov.in/en/publication/gr",
        previous=[
            DiffRow(no="1", text="Basic monthly minimum rates of wages in Factory scheduled employment:", mark="normal"),
            DiffRow(no="2", text="Skilled (Zone I): ₹3,200 | Semi-skilled: ₹3,100 | Unskilled: ₹3,000", mark="removed"),
            DiffRow(no="3", text="plus special allowance (VDA) as declared by the Competent Authority.", mark="normal")
        ],
        amended=[
            DiffRow(no="1", text="Basic monthly minimum rates of wages in Factory scheduled employment:", mark="normal"),
            DiffRow(no="2", text="Skilled (Zone I): ₹5,500 | Semi-skilled: ₹5,000 | Unskilled: ₹4,500", mark="inserted"),
            DiffRow(no="3", text="plus special allowance (VDA) as declared by the Competent Authority.", mark="normal")
        ],
        summary_of_change="Revised basic monthly minimum wage rates for factory employment in Maharashtra across Zone I, II, and III.",
        why_it_matters="Employers operating factories in Maharashtra must adjust payroll minimum wage floors to remain compliant with revised statutory basic pay.",
        what_stayed_same="The three-zone geographic demarcation and separate bi-annual Variable Dearness Allowance (VDA) adjustment mechanisms continue."
    ),
    "CASE_C_MCA_DIRECTOR_KYC": LegalDiffResponse(
        case_id="CASE_C_MCA_DIRECTOR_KYC",
        notification="Notification No. G.S.R. 339(E)",
        date="30 April 2019",
        citation="Ministry of Corporate Affairs · Companies (Appointment and Qualification of Directors) Rules, 2014 · Rule 12A",
        official_url="https://www.mca.gov.in/",
        previous=[
            DiffRow(no="1", text="Every individual who holds a Director Identification Number (DIN) as on 31st March shall submit e-form DIR-3-KYC to the Central Government", mark="normal"),
            DiffRow(no="2", text="on or before 30th April of the immediate next financial year.", mark="removed"),
            DiffRow(no="3", text="Failure to file within the specified date results in deactivation of DIN.", mark="normal")
        ],
        amended=[
            DiffRow(no="1", text="Every individual who holds a Director Identification Number (DIN) as on 31st March shall submit e-form DIR-3-KYC to the Central Government", mark="normal"),
            DiffRow(no="2", text="on or before 30th June of the immediate next financial year.", mark="inserted"),
            DiffRow(no="3", text="Failure to file within the specified date results in deactivation of DIN.", mark="normal")
        ],
        summary_of_change="Substituted '30th June' for '30th April' as the statutory annual deadline for filing DIR-3 KYC under Rule 12A.",
        why_it_matters="Extended the compliance window by two months for all company directors holding an active DIN to prevent statutory disqualification.",
        what_stayed_same="The ₹5,000 delayed filing fee under Registration Offices and Fees Rules and DIN deactivation penalty remained intact."
    )
}

def get_legal_diff(case_id: str) -> LegalDiffResponse:
    return DIFF_DATABASE.get(case_id, DIFF_DATABASE["CASE_A_GST_E_INVOICING"])
