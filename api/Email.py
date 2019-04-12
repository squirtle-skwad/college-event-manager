from django.core.mail import EmailMessage
from .utility import get_recipients


def create_mail(
    EventName, EventStartDate, teacher_name, event_obj
):  # EventName --> event_name , EventDate --> event_date , name --> organizer
    # put the subject here
    subject = "Event report for {} event. Report by {}".format(EventName, teacher_name)
    body = "Here is the report for the event {} which was held on {}".format(
        EventName, EventStartDate
    )
    to = get_recipients(event_obj)
    email = EmailMessage(subject=subject, body=body, to=to)
    return email


def send_mail(filename, teacher_name, event_obj):
    # split the event name and the date by the separator introduced
    eventDetail_list = filename.split("$")
    EventName = eventDetail_list[0]
    # use the date only and not the extension eg. '.pdf, .txt, etc.'
    EventStartDate = eventDetail_list[1].split(".")[0]
    # EventEndDate = eventDetail_list[2]
    # get the email object
    email = create_mail(EventName, EventStartDate, teacher_name, event_obj)
    # change the file path to media directory
    file_path = "media/pdf/" + filename
    # attach the file to the email
    email.attach_file(file_path)
    email.send()
