from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, landscape, portrait, A4
from reportlab.platypus import Image
from reportlab.lib.units import inch, cm
import csv
import pandas as pd
from api.choices import department

data_file = "data.csv"


def import_data(data_file):
    df = pd.read_csv(data_file)
    event_department = df["department"][0]
    event_department = department[event_department]
    event_description = df["description"][0]
    event_date_end = df["end"][0]
    expert_name = df["expert_name"][0]
    event_name = df["name"][0]
    event_organizer = df["organizer"][0]
    event_date_start = df["start"][0]
    event_venue = df["venue"][0]
    no_of_participants = df["number_of_participants"][0]
    image = df["image"][0]
    image = image.replace("[", "")
    image = image.replace("]", "")
    image = image.replace('"', "")
    image = image.replace('"', "")
    image = image.replace("'", "")
    image = image.replace("'", "")
    image = image.split(",")
    length = len(image)
    x = []
    for i in range(0, length, 2):
        x.append(image[i : i + 2])

    file_date = event_date_start[0:10]
    pdf_file_name = event_name + "$" + file_date + ".pdf"

    generate_pdf(
        event_department,
        event_description,
        event_date_end,
        expert_name,
        event_name,
        event_organizer,
        event_date_start,
        event_venue,
        no_of_participants,
        x,
        file_date,
        pdf_file_name,
    )


def generate_pdf(
    event_department,
    event_description,
    event_date_end,
    expert_name,
    event_name,
    event_organizer,
    event_date_start,
    event_venue,
    no_of_participants,
    x,
    file_date,
    pdf_file_name,
):
    c = canvas.Canvas("media/pdf/{}".format(pdf_file_name), pagesize=portrait(A4))
    # c = canvas.Canvas(pdf_file_name, pagesize=portrait(A4))

    c.setFont("Helvetica-Bold", 25, leading=None)
    c.drawCentredString(10.5 * cm, 25.2 * cm, "A report on {}".format(event_name))

    c.setFont("Helvetica", 13, leading=None)
    c.drawString(2.84 * cm, 23.2 * cm, "Delivered by: {}".format(expert_name))

    c.setFont("Helvetica", 13, leading=None)
    c.drawString(2.84 * cm, 22.2 * cm, "Organized by: {}".format(event_department))

    c.setFont("Helvetica", 13, leading=None)
    c.drawString(2.84 * cm, 21.2 * cm, "Date: {}".format(file_date))

    c.setFont("Helvetica", 13, leading=None)
    c.drawString(2.84 * cm, 20.2 * cm, "Venue: {}".format(event_venue))

    c.setFont("Helvetica", 13, leading=None)
    c.drawString(
        2.84 * cm, 19.2 * cm, "No. of particpants: {}".format(no_of_participants)
    )

    c.setFont("Helvetica", 13, leading=None)
    c.drawString(2.84 * cm, 18.2 * cm, "Description:")

    c.setFont("Helvetica", 10, leading=None)
    c.drawString(2.84 * cm, 17.5 * cm, event_description)

    c.setFont("Helvetica-Bold", 13, leading=None)
    c.drawString(
        13.1 * cm, 4.5 * cm, "HoD " + "({}".format(event_department[:-41]) + ".Dept)"
    )

    # textobject = c.beginText()
    # textobject.setTextOrigin(0.2*inch, 7.69*inch)
    # for line in event_description:
    #     textobject.textLine(line)
    # c.drawText(textobject)

    c.showPage()
    for item in x:
        v_gap = 7.09
        for j in item:
            if v_gap > 0:
                c.drawImage(j, 1.35 * inch, v_gap * inch, width=400, height=200)
                v_gap -= 4
        c.showPage()
    c.save()


if __name__ == "__main__":
    import_data(data_file)

# A4 dimensions:
# 8.27 × 11.69 inches
# 21.0 x 29.7cm
