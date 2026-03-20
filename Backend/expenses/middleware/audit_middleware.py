import json
from .models import AuditLog


class CurrencyAuditMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        response = self.get_response(request)

        try:
            if request.path.startswith('/api/expenses/') and request.method == 'POST':

                try:
                    body = json.loads(request.body)
                except:
                    body = {}

                from_currency = body.get('currency')

                if hasattr(response, 'data'):
                    rate = response.data.get('exchange_rate')

                    if from_currency and rate:
                        AuditLog.objects.create(
                            from_currency=from_currency,
                            to_currency='USD',
                            rate=rate,
                            endpoint=request.path
                        )

        except Exception:
            pass

        return response