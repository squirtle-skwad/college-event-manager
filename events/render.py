from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa
import os
from urllib.request import urlopen
from django.conf import settings


def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    resources
    """
    # use short variable names
    sUrl = settings.STATIC_URL
    sRoot = settings.STATIC_ROOT
    mUrl = settings.MEDIA_URL  # media/name.jpg
    mRoot = settings.MEDIA_ROOT

    # convert URIs to absolute system paths
    if uri.startswith(mUrl):
        path = os.path.join(mRoot, uri.replace(mUrl, ""))
    elif uri.startswith(sUrl):
        path = os.path.join(sRoot, uri.replace(sUrl, ""))
    else:
        return uri  # handle absolute uri (ie: http://some.tld/foo.png)

    # make sure that file exists
    if not os.path.isfile(path):
        raise Exception("media URI must start with %s or %s" % (sUrl, mUrl))
    return path


def render_to_file(path: str, params: dict, file):
    template = get_template(path)
    html = template.render(params)
    file_name = "{}.pdf".format(file)
    file_path = os.path.join("media/pdf", file_name)
    file_pdf = open(file_path, "wb")
    pisaStatus = pisa.CreatePDF(html, dest=file_pdf, link_callback=link_callback)
    file_pdf.close()


# class Render:
#
#     @staticmethod
#     def download(path: str, params: dict):
#         template = get_template(path)
#         html = template.render(params)
#         response = BytesIO()
#         pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
#         if not pdf.err:
#             response =  HttpResponse(response.getvalue(), content_type='application/pdf')
#             response["Content-Disposition"] = 'attachment; filename = "abc.pdf"'
#             return response
#         else:
#             return HttpResponse("Error Rendering PDF", status=400)
#
#     @staticmethod
#     def preview(path: str, params: dict):
#         template = get_template(path)
#         html = template.render(params)
#         x = render_to_file(path, params)
#
#         response = BytesIO()
#         pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
#         if not pdf.err:
#             pdf_file =  HttpResponse(response.getvalue(), content_type='application/pdf')
#             return pdf_file
#         else:
#             return HttpResponse("Error Rendering PDF", status=400)
