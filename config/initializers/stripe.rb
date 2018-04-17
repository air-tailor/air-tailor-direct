Rails.configuration.stripe = {
  :publishable_key => 'pk_test_SAfpkFB2WVKLbQVukGCTVq5Z',
  :secret_key      => 'sk_test_BRPpISwsTFnO5ih1WlxbvSkz'
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]


# development:
#   stripe_secret_key: 'sk_test_BRPpISwsTFnO5ih1WlxbvSkz'
#   stripe_publishable_key: 'pk_test_SAfpkFB2WVKLbQVukGCTVq5Z'


