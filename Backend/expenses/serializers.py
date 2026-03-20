from rest_framework import serializers
from .models import Expense


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
        #Prevents tampering (user cannot fake exchange rate)
        read_only_fields = ['normalized_usd', 'exchange_rate', 'created_at']

    def create(self, validated_data):
        #Avoid circular imports
        #Load only when needed
        from .services.exchange_service import ExchangeRateService

        amount = validated_data['amount']
        currency = validated_data['currency']

        # Fetch exchange rate
        rate = ExchangeRateService.get_rate(currency, 'USD')

        # Convert
        normalized = amount * rate

        # Inject computed fields
        validated_data['exchange_rate'] = rate
        validated_data['normalized_usd'] = normalized

        return super().create(validated_data)