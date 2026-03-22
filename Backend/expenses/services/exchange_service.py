from django.core.cache import cache
import requests
#used to fat look up of repeated API calls

#Keeps external API logic 
# #isolated from views/models.
class ExchangeRateService:
    BASE_URL = "https://api.exchangerate-api.com/v4/latest/"

    @staticmethod
    def get_rate(from_currency: str, to_currency: str = "USD") -> float:
        cache_key = f"rate_{from_currency}_{to_currency}"
        cached_rate = cache.get(cache_key)

        if cached_rate is not None:
            return cached_rate

        if from_currency == to_currency:
            return 1.0

        try:
            response = requests.get(f"{ExchangeRateService.BASE_URL}{from_currency}")
            response.raise_for_status()

            data = response.json()
            rate = data["rates"].get(to_currency)

            if rate is None:
                raise ValueError(f"Rate not found for {to_currency}")

            cache.set(cache_key, rate, timeout=3600)  # 1 hour cache becuase Exchange rates don’t change frequently

            return rate

        except requests.RequestException as e:
            raise Exception(f"API request failed: {str(e)}")