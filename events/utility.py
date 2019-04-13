from .models import Dates, Department
from authapp.models import User


def get_recipients(event_obj):
    departments = Department.objects.filter(event=event_obj)
    recipients = list()
    for d in departments:
        users = User.objects.filter(department=d.department)
        recipients.extend([u.email for u in users])    
    recipients.extend(RECIPIENTS)
    return recipients


def get_date(event_obj):
    dates = list(Dates.objects.filter(event=event_obj))
    start_date = str(min(map(lambda e: e.start, dates)))
    return start_date[0:10]

# --> Utility Variables <--

# add vice principal and any other email id's you wish to append
RECIPIENTS = [
    "rashmilp833@gmail.com",
    "damonsalvatore833@gmail.com",
    "vikrantgajria@gmail.com",
]
