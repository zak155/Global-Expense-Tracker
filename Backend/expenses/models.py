from django.db import models


class Expense(models.Model):
    CURRENCY_CHOICES = [
        ('USD', 'US Dollar'),
        ('ETB', 'Ethiopian Birr'),
        ('EUR', 'Euro'),
    ]

    amount = models.FloatField()
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)

    normalized_usd = models.FloatField()
    exchange_rate = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.amount} {self.currency} -> {self.normalized_usd} USD"


class AuditLog(models.Model):
    from_currency = models.CharField(max_length=3)
    to_currency = models.CharField(max_length=3, default='USD')

    rate = models.FloatField()
    endpoint = models.CharField(max_length=255)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_currency} -> {self.to_currency} @ {self.rate}"